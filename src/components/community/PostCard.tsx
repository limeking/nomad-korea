'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Edit3,
  Trash2,
  MapPin,
  Clock,
  User
} from 'lucide-react';
import { CommunityPost } from '@/types';

interface PostCardProps {
  post: CommunityPost;
  currentUserId?: string;
  onLike: (postId: string) => Promise<void>;
  onBookmark: (postId: string) => Promise<void>;
  onComment: (post: CommunityPost) => void;
  onEdit?: (post: CommunityPost) => void;
  onDelete?: (postId: string) => Promise<void>;
  onFollow?: (authorId: string) => Promise<void>;
  isFollowing?: boolean;
  className?: string;
}

export default function PostCard({
  post,
  currentUserId,
  onLike,
  onBookmark,
  onComment,
  onEdit,
  onDelete,
  onFollow,
  isFollowing = false,
  className
}: PostCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const isOwnPost = currentUserId === post.authorId;

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await onLike(post.id);
    } finally {
      setIsLiking(false);
    }
  };

  const handleBookmark = async () => {
    if (isBookmarking) return;
    setIsBookmarking(true);
    try {
      await onBookmark(post.id);
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting || !onDelete) return;
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    
    setIsDeleting(true);
    try {
      await onDelete(post.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFollow = async () => {
    if (isFollowingUser || !onFollow || isOwnPost) return;
    setIsFollowingUser(true);
    try {
      await onFollow(post.authorId);
    } finally {
      setIsFollowingUser(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.author}님의 노마드 이야기`,
          text: post.content.slice(0, 100) + '...',
          url: `${window.location.origin}/community/post/${post.id}`,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/community/post/${post.id}`);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900 truncate">
                  {post.author}
                </h4>
                {post.category && (
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                {post.location && (
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {post.location}
                  </span>
                )}
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.timeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {!isOwnPost && onFollow && (
              <Button
                size="sm"
                variant={isFollowing ? "secondary" : "outline"}
                onClick={handleFollow}
                disabled={isFollowingUser}
                className="text-xs px-3 py-1"
              >
                <User className="h-3 w-3 mr-1" />
                {isFollowing ? '팔로잉' : '팔로우'}
              </Button>
            )}

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  공유하기
                </DropdownMenuItem>
                {isOwnPost && onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(post)}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    수정하기
                  </DropdownMenuItem>
                )}
                {isOwnPost && onDelete && (
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600"
                    disabled={isDeleting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제하기
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Post Content */}
          <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-1 ${
                  post.isLiked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart 
                  className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} 
                />
                <span className="text-sm">{post.likes}</span>
              </Button>

              {/* Comment Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment(post)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments}</span>
              </Button>
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              disabled={isBookmarking}
              className={`flex items-center space-x-1 ${
                post.isBookmarked 
                  ? 'text-blue-500 hover:text-blue-600' 
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Bookmark 
                className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} 
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}