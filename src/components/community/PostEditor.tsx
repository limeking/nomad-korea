'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, MapPin } from 'lucide-react';
import { CreatePostData, UpdatePostData, CommunityPost } from '@/types';

interface PostEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostData | UpdatePostData) => Promise<void>;
  post?: CommunityPost; // For editing existing post
  trigger?: React.ReactNode;
}

const CATEGORIES = [
  '자유',
  '질문',
  '생활후기',
  '추천',
  '정보공유',
  '모임',
  '구인구직',
  '거래'
];

const POPULAR_TAGS = [
  '서울', '부산', '제주도', '대구', '광주', '인천', '대전',
  '카페', '코워킹스페이스', '인터넷', '교통편의', '맛집',
  '숙소', '생활비', '날씨', '문화', '안전',
  '개발자', '디자이너', '마케터', '프리랜서', '창업',
  '서핑', '등산', '요가', '러닝', '사진촬영'
];

export default function PostEditor({ 
  isOpen, 
  onClose, 
  onSubmit, 
  post, 
  trigger 
}: PostEditorProps) {
  const [formData, setFormData] = useState<CreatePostData>({
    content: '',
    category: '자유',
    tags: [],
    location: ''
  });
  const [customTag, setCustomTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!post;

  // Initialize form data when editing
  useEffect(() => {
    if (isEditing && post) {
      setFormData({
        content: post.content,
        category: post.category || '자유',
        tags: post.tags || [],
        location: post.location
      });
    } else {
      setFormData({
        content: '',
        category: '자유',
        tags: [],
        location: ''
      });
    }
    setErrors({});
  }, [isEditing, post, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    } else if (formData.content.length > 2000) {
      newErrors.content = '내용은 2000자 이하로 작성해주세요.';
    }
    
    if ((formData.tags || []).length > 10) {
      newErrors.tags = '태그는 최대 10개까지 추가할 수 있습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit post:', error);
      setErrors({ submit: '게시글 저장에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagAdd = (tag: string) => {
    const currentTags = formData.tags || [];
    if (tag && !currentTags.includes(tag) && currentTags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
      setCustomTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCustomTagSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd(customTag.trim());
    }
  };

  const content = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">카테고리</label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          위치 (선택사항)
        </label>
        <Input
          type="text"
          placeholder="예: 서울 강남구, 제주시 등"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          내용 <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="노마드 생활에 대한 경험이나 질문을 자유롭게 공유해주세요!"
          className="min-h-[120px] resize-none"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content}</p>
        )}
        <p className="text-xs text-gray-500">
          {formData.content.length}/2000자
        </p>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">태그</label>
        
        {/* Selected Tags */}
        {(formData.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(formData.tags || []).map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <span>#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Popular Tags */}
        <div>
          <p className="text-xs text-gray-600 mb-2">인기 태그</p>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {POPULAR_TAGS.filter(tag => !(formData.tags || []).includes(tag)).slice(0, 15).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                onClick={() => handleTagAdd(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="커스텀 태그 입력"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={handleCustomTagSubmit}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleTagAdd(customTag.trim())}
            disabled={!customTag.trim() || (formData.tags || []).includes(customTag.trim()) || (formData.tags || []).length >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {errors.tags && (
          <p className="text-sm text-red-600">{errors.tags}</p>
        )}
        <p className="text-xs text-gray-500">
          {(formData.tags || []).length}/10개 태그
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <p className="text-sm text-red-600">{errors.submit}</p>
      )}

      {/* Submit Buttons */}
      <DialogFooter className="flex space-x-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : (isEditing ? '수정하기' : '게시하기')}
        </Button>
      </DialogFooter>
    </form>
  );

  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? '게시글 수정' : '새 게시글 작성'}
            </DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? '게시글 수정' : '새 게시글 작성'}
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}