'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Trash2,
  Clock,
  Send
} from 'lucide-react';
import { Comment, CommunityPost } from '@/types';

interface CommentSectionProps {
  post: CommunityPost;
  comments: Comment[];
  currentUserId?: string;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string) => Promise<void>;
  onLoadComments: (postId: string) => Promise<Comment[]>;
}

export default function CommentSection({
  post,
  comments: initialComments,
  currentUserId,
  onAddComment,
  onDeleteComment,
  onLikeComment,
  onLoadComments
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Load comments when section is opened
  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const loadedComments = await onLoadComments(post.id);
      setComments(loadedComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const content = newComment.trim();
    if (!content) return;

    setIsSubmitting(true);
    try {
      await onAddComment(post.id, content);
      setNewComment('');
      // Reload comments to get the new one
      await loadComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await onLikeComment(commentId);
      // Update local state immediately for better UX
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;
    
    try {
      await onDeleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  };

  return (
    <div className="space-y-4">
      {/* Comments Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
        >
          <MessageCircle className="h-4 w-4" />
          <span>댓글 {post.comments}개</span>
        </Button>
      </div>

      {showComments && (
        <div className="space-y-4 border-t pt-4">
          {/* Comment Form */}
          {currentUserId && (
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <Textarea
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {newComment.length}/500자
                </span>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !newComment.trim()}
                  className="flex items-center space-x-1"
                >
                  <Send className="h-3 w-3" />
                  <span>{isSubmitting ? '작성 중...' : '댓글 작성'}</span>
                </Button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">
                댓글을 불러오는 중...
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                첫 번째 댓글을 작성해보세요!
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserId={currentUserId}
                  onLike={() => handleLikeComment(comment.id)}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onLike: () => void;
  onDelete: () => void;
}

function CommentItem({ comment, currentUserId, onLike, onDelete }: CommentItemProps) {
  const [isLiking, setIsLiking] = useState(false);
  const isOwnComment = currentUserId === comment.authorId;

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await onLike();
    } finally {
      setIsLiking(false);
    }
  };

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  };

  return (
    <div className="flex space-x-3 p-3 rounded-lg bg-gray-50">
      <img
        src={comment.avatar}
        alt={comment.author}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900 text-sm">
              {comment.author}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>

          {isOwnComment && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  삭제하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Comment Content */}
        <div className="text-gray-900 text-sm mb-2 whitespace-pre-wrap">
          {comment.content}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-1 h-6 px-2 text-xs ${
              comment.isLiked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart 
              className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} 
            />
            {comment.likes > 0 && <span>{comment.likes}</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}