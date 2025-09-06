import { CommunityPost, Comment, CreatePostData, UpdatePostData, UserFollow } from '@/types';

const POSTS_STORAGE_KEY = 'nomad-korea-posts';
const COMMENTS_STORAGE_KEY = 'nomad-korea-comments';
const LIKES_STORAGE_KEY = 'nomad-korea-likes';
const BOOKMARKS_STORAGE_KEY = 'nomad-korea-bookmarks';
const FOLLOWS_STORAGE_KEY = 'nomad-korea-follows';

// Mock initial posts data
const initialPosts: CommunityPost[] = [
  {
    id: '1',
    authorId: 'user-1',
    author: '김개발자',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    location: '제주시',
    timeAgo: '2시간 전',
    content: '제주에서 3개월째 살고 있는데 정말 만족해요! 특히 애월 카페거리에서 작업하기 좋고, 생각보다 인터넷도 빠르고... 다만 겨울에는 바람이 좀 세네요 😅 내년에도 제주에 있을 계획입니다!',
    likes: 24,
    comments: 12,
    createdAt: '2024-01-01T00:00:00Z',
    category: '생활후기',
    tags: ['제주도', '카페', '인터넷'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '2',
    authorId: 'user-2',
    author: '서울러',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
    location: '서울 강남',
    timeAgo: '5시간 전',
    content: '강남 코워킹 스페이스 추천받고 싶어요! 현재 선릉역 근처에서 작업 중인데, 좀 더 조용하고 집중할 수 있는 곳이 있을까요? 월 20만원 정도 예산이에요.',
    likes: 18,
    comments: 31,
    createdAt: '2024-01-01T05:00:00Z',
    category: '질문',
    tags: ['서울', '코워킹스페이스', '추천'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '3',
    authorId: 'user-3',
    author: '부산갈매기',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    location: '부산 해운대',
    timeAgo: '1일 전',
    content: '해운대에서 서핑하고 일하는 삶 너무 좋아요 🏄‍♀️ 아침에 서핑하고 오후에 카페에서 작업! 생활비도 서울보다 훨씬 저렴하고... 부산 노마드 모임도 있어요!',
    likes: 45,
    comments: 8,
    createdAt: '2024-01-02T00:00:00Z',
    category: '생활후기',
    tags: ['부산', '서핑', '노마드모임'],
    isLiked: false,
    isBookmarked: false
  }
];

// Initialize storage if empty
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(POSTS_STORAGE_KEY)) {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts));
  }
  if (!localStorage.getItem(COMMENTS_STORAGE_KEY)) {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(LIKES_STORAGE_KEY)) {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(BOOKMARKS_STORAGE_KEY)) {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(FOLLOWS_STORAGE_KEY)) {
    localStorage.setItem(FOLLOWS_STORAGE_KEY, JSON.stringify([]));
  }
};

// Storage helpers
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

const setToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const communityService = {
  // Posts CRUD
  async getPosts(userId?: string): Promise<CommunityPost[]> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const likes = getFromStorage<{postId: string, userId: string}>(LIKES_STORAGE_KEY);
    const bookmarks = getFromStorage<{postId: string, userId: string}>(BOOKMARKS_STORAGE_KEY);
    
    // Add user-specific like/bookmark status
    return posts.map(post => ({
      ...post,
      isLiked: userId ? likes.some(like => like.postId === post.id && like.userId === userId) : false,
      isBookmarked: userId ? bookmarks.some(bookmark => bookmark.postId === post.id && bookmark.userId === userId) : false
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createPost(userId: string, data: CreatePostData): Promise<CommunityPost> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      authorId: userId,
      author: '현재 사용자', // In real app, get from user data
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      location: data.location || '위치 미설정',
      timeAgo: '방금 전',
      content: data.content,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      category: data.category || '자유',
      tags: data.tags || [],
      isLiked: false,
      isBookmarked: false
    };
    
    posts.unshift(newPost);
    setToStorage(POSTS_STORAGE_KEY, posts);
    
    return newPost;
  },

  async updatePost(postId: string, userId: string, data: UpdatePostData): Promise<CommunityPost> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const postIndex = posts.findIndex(p => p.id === postId && p.authorId === userId);
    
    if (postIndex === -1) {
      throw new Error('게시글을 찾을 수 없거나 수정 권한이 없습니다.');
    }
    
    posts[postIndex] = {
      ...posts[postIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    setToStorage(POSTS_STORAGE_KEY, posts);
    return posts[postIndex];
  },

  async deletePost(postId: string, userId: string): Promise<void> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const filteredPosts = posts.filter(p => !(p.id === postId && p.authorId === userId));
    
    if (filteredPosts.length === posts.length) {
      throw new Error('게시글을 찾을 수 없거나 삭제 권한이 없습니다.');
    }
    
    setToStorage(POSTS_STORAGE_KEY, filteredPosts);
    
    // Also delete related comments
    const comments = getFromStorage<Comment>(COMMENTS_STORAGE_KEY);
    const filteredComments = comments.filter(c => c.postId !== postId);
    setToStorage(COMMENTS_STORAGE_KEY, filteredComments);
  },

  // Like/Unlike posts
  async toggleLike(postId: string, userId: string): Promise<boolean> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const likes = getFromStorage<{postId: string, userId: string}>(LIKES_STORAGE_KEY);
    
    const existingLike = likes.find(like => like.postId === postId && like.userId === userId);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }
    
    if (existingLike) {
      // Unlike
      const filteredLikes = likes.filter(like => !(like.postId === postId && like.userId === userId));
      setToStorage(LIKES_STORAGE_KEY, filteredLikes);
      posts[postIndex].likes -= 1;
      setToStorage(POSTS_STORAGE_KEY, posts);
      return false;
    } else {
      // Like
      likes.push({ postId, userId });
      setToStorage(LIKES_STORAGE_KEY, likes);
      posts[postIndex].likes += 1;
      setToStorage(POSTS_STORAGE_KEY, posts);
      return true;
    }
  },

  // Bookmark/Unbookmark posts
  async toggleBookmark(postId: string, userId: string): Promise<boolean> {
    initializeStorage();
    
    const bookmarks = getFromStorage<{postId: string, userId: string}>(BOOKMARKS_STORAGE_KEY);
    const existingBookmark = bookmarks.find(bookmark => bookmark.postId === postId && bookmark.userId === userId);
    
    if (existingBookmark) {
      // Remove bookmark
      const filteredBookmarks = bookmarks.filter(bookmark => !(bookmark.postId === postId && bookmark.userId === userId));
      setToStorage(BOOKMARKS_STORAGE_KEY, filteredBookmarks);
      return false;
    } else {
      // Add bookmark
      bookmarks.push({ postId, userId });
      setToStorage(BOOKMARKS_STORAGE_KEY, bookmarks);
      return true;
    }
  },

  // Comments
  async getComments(postId: string, userId?: string): Promise<Comment[]> {
    initializeStorage();
    
    const comments = getFromStorage<Comment>(COMMENTS_STORAGE_KEY);
    const likes = getFromStorage<{commentId: string, userId: string}>(`${LIKES_STORAGE_KEY}-comments`);
    
    return comments
      .filter(comment => comment.postId === postId)
      .map(comment => ({
        ...comment,
        isLiked: userId ? likes.some(like => like.commentId === comment.id && like.userId === userId) : false
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createComment(postId: string, userId: string, content: string): Promise<Comment> {
    initializeStorage();
    
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    const comments = getFromStorage<Comment>(COMMENTS_STORAGE_KEY);
    
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }
    
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      authorId: userId,
      author: '현재 사용자', // In real app, get from user data
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    comments.push(newComment);
    setToStorage(COMMENTS_STORAGE_KEY, comments);
    
    // Update comment count
    posts[postIndex].comments += 1;
    setToStorage(POSTS_STORAGE_KEY, posts);
    
    return newComment;
  },

  async deleteComment(commentId: string, userId: string): Promise<void> {
    initializeStorage();
    
    const comments = getFromStorage<Comment>(COMMENTS_STORAGE_KEY);
    const posts = getFromStorage<CommunityPost>(POSTS_STORAGE_KEY);
    
    const comment = comments.find(c => c.id === commentId && c.authorId === userId);
    if (!comment) {
      throw new Error('댓글을 찾을 수 없거나 삭제 권한이 없습니다.');
    }
    
    const filteredComments = comments.filter(c => c.id !== commentId);
    setToStorage(COMMENTS_STORAGE_KEY, filteredComments);
    
    // Update comment count
    const postIndex = posts.findIndex(p => p.id === comment.postId);
    if (postIndex !== -1) {
      posts[postIndex].comments -= 1;
      setToStorage(POSTS_STORAGE_KEY, posts);
    }
  },

  // Follow/Unfollow users
  async toggleFollow(followerId: string, followingId: string): Promise<boolean> {
    initializeStorage();
    
    const follows = getFromStorage<UserFollow>(FOLLOWS_STORAGE_KEY);
    const existingFollow = follows.find(follow => 
      follow.followerId === followerId && follow.followingId === followingId
    );
    
    if (existingFollow) {
      // Unfollow
      const filteredFollows = follows.filter(follow => 
        !(follow.followerId === followerId && follow.followingId === followingId)
      );
      setToStorage(FOLLOWS_STORAGE_KEY, filteredFollows);
      return false;
    } else {
      // Follow
      const newFollow: UserFollow = {
        id: Date.now().toString(),
        followerId,
        followingId,
        createdAt: new Date().toISOString()
      };
      follows.push(newFollow);
      setToStorage(FOLLOWS_STORAGE_KEY, follows);
      return true;
    }
  },

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    initializeStorage();
    
    const follows = getFromStorage<UserFollow>(FOLLOWS_STORAGE_KEY);
    return follows.some(follow => 
      follow.followerId === followerId && follow.followingId === followingId
    );
  }
};