'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Filter, 
  X, 
  MapPin, 
  DollarSign, 
  Heart, 
  Car, 
  Briefcase,
  RotateCcw,
  Save,
  Sliders
} from 'lucide-react';

export interface AdvancedFiltersState {
  region: string;
  minBudget: number;
  maxBudget: number;
  lifestyle: string;
  transportation: string;
  occupation: string;
  minRating: number;
  priorities: string[];
  sortBy: 'rating' | 'budget' | 'nomadCount' | 'growthRate' | 'name';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdvancedFiltersState;
  onFiltersChange: (filters: AdvancedFiltersState) => void;
  onReset: () => void;
  onSave?: (name: string) => void;
}

const regions = [
  { value: 'all', label: '전체 지역' },
  { value: '수도권', label: '수도권' },
  { value: '강원권', label: '강원권' },
  { value: '충청권', label: '충청권' },
  { value: '영남권', label: '영남권' },
  { value: '호남권', label: '호남권' },
  { value: '제주도', label: '제주도' }
];

const lifestyles = [
  { value: 'all', label: '상관없음' },
  { value: '활발한', label: '활발한' },
  { value: '조용한', label: '조용한' },
  { value: '사교적', label: '사교적' },
  { value: '독립적', label: '독립적' }
];

const transportations = [
  { value: 'all', label: '상관없음' },
  { value: '대중교통', label: '대중교통' },
  { value: '자가용', label: '자가용' },
  { value: '도보', label: '도보' },
  { value: '자전거', label: '자전거' }
];

const occupations = [
  { value: 'all', label: '상관없음' },
  { value: '개발자', label: '개발자' },
  { value: '디자이너', label: '디자이너' },
  { value: '마케터', label: '마케터' },
  { value: '기획자', label: '기획자' },
  { value: '프리랜서', label: '프리랜서' },
  { value: '기타', label: '기타' }
];

const availablePriorities = [
  '카페', '인터넷', '교통편의', '안전', '문화생활', '네트워킹', 
  '자연', '바다뷰', '맛집', '서핑', '깨끗한공기', '여유로움'
];

const sortOptions = [
  { value: 'rating', label: '평점순' },
  { value: 'budget', label: '생활비순' },
  { value: 'nomadCount', label: '노마드 수순' },
  { value: 'growthRate', label: '성장률순' },
  { value: 'name', label: '이름순' }
];

export default function AdvancedFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onReset,
  onSave
}: AdvancedFiltersProps) {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState('');

  if (!isOpen) return null;

  const handlePriorityToggle = (priority: string) => {
    const updatedPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    
    onFiltersChange({ ...filters, priorities: updatedPriorities });
  };

  const handleSaveFilter = () => {
    if (savedFilterName.trim() && onSave) {
      onSave(savedFilterName.trim());
      setSavedFilterName('');
      setSaveModalOpen(false);
    }
  };

  const hasActiveFilters = () => {
    return (filters.region && filters.region !== 'all') || 
           filters.minBudget > 0 || 
           filters.maxBudget < 5000000 ||
           (filters.lifestyle && filters.lifestyle !== 'all') ||
           (filters.transportation && filters.transportation !== 'all') ||
           (filters.occupation && filters.occupation !== 'all') ||
           filters.minRating > 0 ||
           filters.priorities.length > 0;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Sliders className="h-5 w-5 mr-2" />
            고급 필터
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Region & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                지역
              </label>
              <Select 
                value={filters.region} 
                onValueChange={(value) => onFiltersChange({ ...filters, region: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                최소 예산 (만원)
              </label>
              <Input
                type="number"
                min="0"
                max="500"
                step="10"
                value={filters.minBudget / 10000}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minBudget: parseInt(e.target.value) * 10000 || 0 
                })}
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                최대 예산 (만원)
              </label>
              <Input
                type="number"
                min="0"
                max="500"
                step="10"
                value={filters.maxBudget / 10000}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  maxBudget: parseInt(e.target.value) * 10000 || 5000000 
                })}
                placeholder="500"
              />
            </div>
          </div>

          {/* Lifestyle & Transportation & Occupation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 inline mr-1" />
                라이프스타일
              </label>
              <Select 
                value={filters.lifestyle} 
                onValueChange={(value) => onFiltersChange({ ...filters, lifestyle: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="라이프스타일 선택" />
                </SelectTrigger>
                <SelectContent>
                  {lifestyles.map(lifestyle => (
                    <SelectItem key={lifestyle.value} value={lifestyle.value}>
                      {lifestyle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Car className="h-4 w-4 inline mr-1" />
                교통 수단
              </label>
              <Select 
                value={filters.transportation} 
                onValueChange={(value) => onFiltersChange({ ...filters, transportation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="교통 수단 선택" />
                </SelectTrigger>
                <SelectContent>
                  {transportations.map(transport => (
                    <SelectItem key={transport.value} value={transport.value}>
                      {transport.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="h-4 w-4 inline mr-1" />
                직업
              </label>
              <Select 
                value={filters.occupation} 
                onValueChange={(value) => onFiltersChange({ ...filters, occupation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="직업 선택" />
                </SelectTrigger>
                <SelectContent>
                  {occupations.map(occupation => (
                    <SelectItem key={occupation.value} value={occupation.value}>
                      {occupation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rating & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최소 평점
              </label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minRating: parseFloat(e.target.value) || 0 
                })}
                placeholder="0.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                정렬 기준
              </label>
              <Select 
                value={filters.sortBy} 
                onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                정렬 순서
              </label>
              <Select 
                value={filters.sortOrder} 
                onValueChange={(value: any) => onFiltersChange({ ...filters, sortOrder: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">내림차순</SelectItem>
                  <SelectItem value="asc">오름차순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Priorities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              우선순위 태그
            </label>
            <div className="flex flex-wrap gap-2">
              {availablePriorities.map(priority => (
                <Badge
                  key={priority}
                  variant={filters.priorities.includes(priority) ? 'default' : 'outline'}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handlePriorityToggle(priority)}
                >
                  #{priority}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              초기화
            </Button>
            
            {onSave && hasActiveFilters() && (
              <Button onClick={() => setSaveModalOpen(true)} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                필터 저장
              </Button>
            )}
            
            <div className="flex-1"></div>
            
            <Button onClick={onClose} variant="outline">
              취소
            </Button>
            
            <Button onClick={onClose}>
              <Filter className="h-4 w-4 mr-2" />
              필터 적용
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>필터 저장</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  저장할 이름
                </label>
                <Input
                  value={savedFilterName}
                  onChange={(e) => setSavedFilterName(e.target.value)}
                  placeholder="예: 서울 개발자 200만원 이하"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSaveFilter();
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setSaveModalOpen(false)} variant="outline" className="flex-1">
                  취소
                </Button>
                <Button onClick={handleSaveFilter} className="flex-1">
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}