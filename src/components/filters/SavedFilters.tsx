'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  Bookmark, 
  X, 
  Play, 
  Trash2, 
  Edit3,
  Star
} from 'lucide-react';
import { AdvancedFiltersState } from './AdvancedFilters';

export interface SavedFilter {
  id: string;
  name: string;
  filters: AdvancedFiltersState;
  createdAt: string;
  isDefault?: boolean;
}

interface SavedFiltersProps {
  onApplyFilter: (filters: AdvancedFiltersState) => void;
  onShowAdvancedFilters: () => void;
}

const SAVED_FILTERS_KEY = 'nomad-korea-saved-filters';

// Mock default saved filters
const defaultSavedFilters: SavedFilter[] = [
  {
    id: 'default-1',
    name: '서울 개발자 300만원 이하',
    filters: {
      region: '수도권',
      minBudget: 0,
      maxBudget: 3000000,
      lifestyle: '',
      transportation: '대중교통',
      occupation: '개발자',
      minRating: 4.0,
      priorities: ['카페', '인터넷', '교통편의'],
      sortBy: 'rating',
      sortOrder: 'desc'
    },
    createdAt: '2024-01-01T00:00:00Z',
    isDefault: true
  },
  {
    id: 'default-2',
    name: '제주도 자연형 라이프스타일',
    filters: {
      region: '제주도',
      minBudget: 0,
      maxBudget: 2500000,
      lifestyle: '조용한',
      transportation: '',
      occupation: '',
      minRating: 4.2,
      priorities: ['자연', '깨끗한공기', '바다뷰'],
      sortBy: 'rating',
      sortOrder: 'desc'
    },
    createdAt: '2024-01-01T00:00:00Z',
    isDefault: true
  },
  {
    id: 'default-3',
    name: '부산 서핑 라이프',
    filters: {
      region: '영남권',
      minBudget: 0,
      maxBudget: 2000000,
      lifestyle: '활발한',
      transportation: '',
      occupation: '',
      minRating: 4.0,
      priorities: ['서핑', '해안도시', '맛집'],
      sortBy: 'budget',
      sortOrder: 'asc'
    },
    createdAt: '2024-01-01T00:00:00Z',
    isDefault: true
  }
];

export default function SavedFilters({ 
  onApplyFilter, 
  onShowAdvancedFilters 
}: SavedFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  // Load saved filters from localStorage
  useEffect(() => {
    const loadSavedFilters = () => {
      try {
        const stored = localStorage.getItem(SAVED_FILTERS_KEY);
        const userFilters = stored ? JSON.parse(stored) : [];
        setSavedFilters([...defaultSavedFilters, ...userFilters]);
      } catch (error) {
        console.error('Error loading saved filters:', error);
        setSavedFilters(defaultSavedFilters);
      }
    };

    loadSavedFilters();
  }, []);

  const handleApplyFilter = (filter: SavedFilter) => {
    onApplyFilter(filter.filters);
    setSelectedFilter(filter.id);
  };

  const handleDeleteFilter = (filterId: string) => {
    const filterToDelete = savedFilters.find(f => f.id === filterId);
    if (filterToDelete?.isDefault) {
      alert('기본 필터는 삭제할 수 없습니다.');
      return;
    }

    const updatedFilters = savedFilters.filter(f => f.id !== filterId);
    const userFilters = updatedFilters.filter(f => !f.isDefault);
    
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(userFilters));
    setSavedFilters(updatedFilters);
    
    if (selectedFilter === filterId) {
      setSelectedFilter('');
    }
  };

  const formatFilterSummary = (filters: AdvancedFiltersState): string => {
    const parts = [];
    
    if (filters.region) parts.push(filters.region);
    if (filters.occupation) parts.push(filters.occupation);
    if (filters.maxBudget < 5000000) parts.push(`${filters.maxBudget / 10000}만원 이하`);
    if (filters.minRating > 0) parts.push(`${filters.minRating}점 이상`);
    if (filters.priorities.length > 0) parts.push(`#${filters.priorities[0]} 등`);
    
    return parts.length > 0 ? parts.join(' · ') : '모든 조건';
  };

  // Add new saved filter (called from parent)
  const addSavedFilter = (filter: SavedFilter) => {
    const userFilters = savedFilters.filter(f => !f.isDefault);
    const updatedUserFilters = [...userFilters, filter];
    
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updatedUserFilters));
    setSavedFilters([...defaultSavedFilters, ...updatedUserFilters]);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Bookmark className="h-5 w-5 mr-2 text-blue-600" />
          저장된 필터
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Quick Select Dropdown */}
        <div className="mb-4">
          <Select value={selectedFilter} onValueChange={(value) => {
            const filter = savedFilters.find(f => f.id === value);
            if (filter) handleApplyFilter(filter);
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="저장된 필터를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {savedFilters.map(filter => (
                <SelectItem key={filter.id} value={filter.id}>
                  <div className="flex items-center w-full">
                    {filter.isDefault && <Star className="h-3 w-3 mr-2 text-yellow-500" />}
                    <span className="flex-1">{filter.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Cards */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {savedFilters.map((filter) => (
            <div
              key={filter.id}
              className={`border rounded-lg p-3 transition-colors ${
                selectedFilter === filter.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {filter.name}
                    </h4>
                    {filter.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        추천
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {formatFilterSummary(filter.filters)}
                  </p>
                  
                  {filter.filters.priorities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {filter.filters.priorities.slice(0, 3).map((priority) => (
                        <Badge key={priority} variant="outline" className="text-xs">
                          #{priority}
                        </Badge>
                      ))}
                      {filter.filters.priorities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{filter.filters.priorities.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 ml-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleApplyFilter(filter)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                  
                  {!filter.isDefault && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteFilter(filter.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
          <Button
            onClick={onShowAdvancedFilters}
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            새 필터 만들기
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Export function to be used by parent components
  // This would typically be handled through context or props
}