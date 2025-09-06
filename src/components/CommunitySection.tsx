'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MessageCircle, Plus, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { communityService } from '@/lib/community';
import PostCard from '@/components/community/PostCard';
import PostEditor from '@/components/community/PostEditor';
import CommentSection from '@/components/community/CommentSection';
import type { CommunityPost, Comment, CreatePostData, UpdatePostData } from '@/types';


export default function CommunitySection() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<CommunityPost | undefined>();
  const [selectedPost, setSelectedPost] = useState<CommunityPost | undefined>();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());
  
  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, [user?.id]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const loadedPosts = await communityService.getPosts(user?.id);
      setPosts(loadedPosts);
      
      // Load follow status for each user
      if (user?.id) {
        const followStatus = new Set<string>();
        for (const post of loadedPosts) {
          if (post.authorId !== user.id) {
            const isFollowing = await communityService.isFollowing(user.id, post.authorId);
            if (isFollowing) {
              followStatus.add(post.authorId);
            }
          }
        }
        setFollowingUsers(followStatus);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (data: CreatePostData) => {
    if (!user?.id) return;
    
    try {
      await communityService.createPost(user.id, data);
      await loadPosts(); // Reload posts
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };

  const handleUpdatePost = async (data: UpdatePostData) => {
    if (!user?.id || !editingPost) return;
    
    try {
      await communityService.updatePost(editingPost.id, user.id, data);
      await loadPosts(); // Reload posts
    } catch (error) {
      console.error('Failed to update post:', error);
      throw error;
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user?.id) return;
    
    try {
      await communityService.deletePost(postId, user.id);
      await loadPosts(); // Reload posts
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  
  const handleLike = async (postId: string) => {
    if (!user?.id) return;
    
    try {
      const isLiked = await communityService.toggleLike(postId, user.id);
      // Update local state immediately for better UX
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: isLiked ? post.likes + 1 : post.likes - 1,
              isLiked 
            }
          : post
      ));
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleBookmark = async (postId: string) => {
    if (!user?.id) return;
    
    try {
      const isBookmarked = await communityService.toggleBookmark(postId, user.id);
      // Update local state immediately for better UX
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isBookmarked }
          : post
      ));
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };
  
  const handleComment = (post: CommunityPost) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleFollow = async (authorId: string) => {
    if (!user?.id) return;
    
    try {
      const isFollowing = await communityService.toggleFollow(user.id, authorId);
      setFollowingUsers(prev => {
        const newSet = new Set(prev);
        if (isFollowing) {
          newSet.add(authorId);
        } else {
          newSet.delete(authorId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  const handleAddComment = async (postId: string, content: string) => {
    if (!user?.id) return;
    
    await communityService.createComment(postId, user.id, content);
    // Reload posts to update comment count
    await loadPosts();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user?.id) return;
    
    await communityService.deleteComment(commentId, user.id);
    // Reload posts to update comment count
    await loadPosts();
  };

  const handleLikeComment = async (commentId: string) => {
    // Comment likes are not implemented in the service yet
    console.log('Comment like not implemented:', commentId);
  };

  const loadComments = async (postId: string): Promise<Comment[]> => {
    return await communityService.getComments(postId, user?.id);
  };
  
  const showMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Users className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">실시간 커뮤니티</h2>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              전국의 디지털 노마드들이 나누는 생생한 경험과 정보
            </p>
            
            {/* Create Post Button */}
            {isAuthenticated && (
              <div className="mb-8">
                <Button 
                  size="lg" 
                  onClick={() => setShowPostEditor(true)}
                  className="px-8 py-3"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  새 글 쓰기
                </Button>
              </div>
            )}
            
            {/* Community Stats */}
            <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>전체 게시글: {posts.length}개</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>활성 멤버: {new Set(posts.map(p => p.authorId)).size}명</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">커뮤니티 게시글을 불러오는 중...</div>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {posts.slice(0, visiblePosts).map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    currentUserId={user?.id}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onComment={handleComment}
                    onEdit={(post) => {
                      setEditingPost(post);
                      setShowPostEditor(true);
                    }}
                    onDelete={handleDeletePost}
                    onFollow={handleFollow}
                    isFollowing={followingUsers.has(post.authorId)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">아직 게시글이 없습니다.</div>
                  {isAuthenticated && (
                    <Button onClick={() => setShowPostEditor(true)}>
                      첫 게시글을 작성해보세요!
                    </Button>
                  )}
                </div>
              )}

              {/* Load More Button */}
              {visiblePosts < posts.length && (
                <div className="text-center mb-8">
                  <Button 
                    variant="outline" 
                    onClick={showMorePosts}
                    className="px-6 py-2"
                  >
                    더 많은 게시글 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Call to Action */}
          <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💬 지금 바로 커뮤니티에 참여해보세요!
              </h3>
              <p className="text-gray-600 mb-6">
                궁금한 것들을 질문하고, 경험을 공유하며, 새로운 노마드 친구들을 만나보세요
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">🙋‍♀️</div>
                  <h4 className="font-semibold mb-1">질문하기</h4>
                  <p className="text-gray-600">궁금한 도시나 지역에 대해 물어보세요</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">📝</div>
                  <h4 className="font-semibold mb-1">경험 공유</h4>
                  <p className="text-gray-600">나만의 노마드 경험을 공유해보세요</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">👥</div>
                  <h4 className="font-semibold mb-1">모임 참여</h4>
                  <p className="text-gray-600">지역별 노마드 모임에 참여하세요</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    className="px-8 py-3 text-lg"
                    onClick={() => setShowPostEditor(true)}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    새 글 작성하기
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="px-8 py-3 text-lg"
                    onClick={() => alert('로그인이 필요합니다!')}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    커뮤니티 참여하기
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3 text-lg"
                  onClick={showMorePosts}
                >
                  더 많은 포스트 보기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Editor Modal */}
      <PostEditor
        isOpen={showPostEditor}
        onClose={() => {
          setShowPostEditor(false);
          setEditingPost(undefined);
        }}
        onSubmit={async (data) => {
          if (editingPost) {
            await handleUpdatePost(data as UpdatePostData);
          } else {
            await handleCreatePost(data as CreatePostData);
          }
        }}
        post={editingPost}
      />

      {/* Comments Modal */}
      {selectedPost && (
        <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 ${showComments ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">댓글</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              
              <CommentSection
                post={selectedPost}
                comments={comments}
                currentUserId={user?.id}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onLikeComment={handleLikeComment}
                onLoadComments={loadComments}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}