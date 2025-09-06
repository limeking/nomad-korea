'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Users, Star, Filter, X, Sliders } from 'lucide-react';
import { useSearch } from '@/utils/SearchContext';
import AdvancedFilters, { AdvancedFiltersState } from '@/components/filters/AdvancedFilters';
import SavedFilters from '@/components/filters/SavedFilters';

export default function HeroSection() {
  const { searchQuery, filters, setSearchQuery, setFilters, resetFilters } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    region: 'all',
    minBudget: 0,
    maxBudget: 5000000,
    lifestyle: 'all',
    transportation: 'all',
    occupation: 'all',
    minRating: 0,
    priorities: [],
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  // Debounce 검색 - 사용자가 타이핑을 멈춘 후 500ms 후 검색 실행
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [localSearchQuery, setSearchQuery]);

  const handleSearch = useCallback(() => {
    setSearchQuery(localSearchQuery);
  }, [localSearchQuery, setSearchQuery]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleFilterChange = useCallback((filterType: keyof typeof filters, value: string) => {
    setFilters({ [filterType]: value });
  }, [setFilters]);

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '' && value !== 'all') ||
    localSearchQuery.trim() !== '' ||
    (advancedFilters.region && advancedFilters.region !== 'all') ||
    advancedFilters.minBudget > 0 ||
    advancedFilters.maxBudget < 5000000 ||
    (advancedFilters.lifestyle && advancedFilters.lifestyle !== 'all') ||
    (advancedFilters.transportation && advancedFilters.transportation !== 'all') ||
    (advancedFilters.occupation && advancedFilters.occupation !== 'all') ||
    advancedFilters.minRating > 0 ||
    advancedFilters.priorities.length > 0;
  
  const handleAdvancedFiltersChange = useCallback((newFilters: AdvancedFiltersState) => {
    console.log('Advanced filters changed:', newFilters);
    setAdvancedFilters(newFilters);
    
    // 고급 필터를 기본 필터에 반영
    const mappedFilters = {
      region: newFilters.region,
      budget: newFilters.minBudget === 0 && newFilters.maxBudget === 5000000 ? 'all' :
              newFilters.maxBudget <= 1500000 ? 'low' :
              newFilters.maxBudget <= 2500000 ? 'mid' : 'high',
      lifestyle: newFilters.lifestyle,
      transportation: newFilters.transportation,
      occupation: newFilters.occupation
    };
    
    console.log('Mapped to basic filters:', mappedFilters);
    setFilters(mappedFilters);
  }, [setFilters]);

  const handleAdvancedFiltersReset = useCallback(() => {
    setAdvancedFilters({
      region: 'all',
      minBudget: 0,
      maxBudget: 5000000,
      lifestyle: 'all',
      transportation: 'all',
      occupation: 'all',
      minRating: 0,
      priorities: [],
      sortBy: 'rating',
      sortOrder: 'desc'
    });
    setLocalSearchQuery('');
    resetFilters();
  }, [resetFilters]);

  const handleSaveFilter = useCallback((name: string) => {
    // In a real app, this would save to user's account or localStorage
    const newFilter = {
      id: Date.now().toString(),
      name,
      filters: advancedFilters,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const stored = localStorage.getItem('nomad-korea-saved-filters');
    const userFilters = stored ? JSON.parse(stored) : [];
    userFilters.push(newFilter);
    localStorage.setItem('nomad-korea-saved-filters', JSON.stringify(userFilters));
    
    console.log(`Saving filter: ${name}`, advancedFilters);
    alert(`필터 "${name}"이(가) 저장되었습니다!`);
  }, [advancedFilters]);

  const handleApplySavedFilter = useCallback((filters: AdvancedFiltersState) => {
    setAdvancedFilters(filters);
    // Also sync with basic filters
    setFilters({
      region: filters.region,
      budget: filters.maxBudget < 5000000 ? (filters.maxBudget / 10000).toString() : '',
      lifestyle: filters.lifestyle,
      transportation: filters.transportation,
      occupation: filters.occupation
    });
  }, [setFilters]);
  
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <span className="text-6xl lg:text-8xl">🏙️</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            한국에서 디지털 노마드로
            <br />
            <span className="text-blue-600">살기 좋은 도시</span>를 찾아보세요
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm lg:text-base">
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <MapPin className="h-4 w-4" />
              <span><strong>87개</strong> 도시</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <Users className="h-4 w-4" />
              <span><strong>12,847명</strong> 노마드</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <Star className="h-4 w-4" />
              <span><strong>15,692개</strong> 리뷰</span>
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border p-6 lg:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                🔍 어떤 도시를 찾고 계신가요?
              </h2>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="검색어를 입력하세요... 예: 서울, 제주, 카페가 많은 곳"
                  className="pl-12 pr-20 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg"
                  onClick={handleSearch}
                >
                  🔍 검색
                </Button>
              </div>
              
              {/* 활성 필터 표시 */}
              {hasActiveFilters && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">활성 필터:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdvancedFiltersReset}
                    className="text-xs px-2 py-1"
                  >
                    <X className="h-3 w-3 mr-1" />
                    모든 필터 초기화
                  </Button>
                </div>
              )}
            </div>

            {/* Saved Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <SavedFilters
                onApplyFilter={handleApplySavedFilter}
                onShowAdvancedFilters={() => setShowAdvancedFilters(true)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span className="font-medium">빠른 필터</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 지역</label>
                  <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="seoul">서울</SelectItem>
                      <SelectItem value="busan">부산</SelectItem>
                      <SelectItem value="jeju">제주</SelectItem>
                      <SelectItem value="gangwon">강원</SelectItem>
                      <SelectItem value="daegu">대구</SelectItem>
                      <SelectItem value="gwangju">광주</SelectItem>
                      <SelectItem value="incheon">인천</SelectItem>
                      <SelectItem value="daejeon">대전</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 예산</label>
                  <Select value={filters.budget} onValueChange={(value) => handleFilterChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="low">~150만원</SelectItem>
                      <SelectItem value="mid">150-250만원</SelectItem>
                      <SelectItem value="high">250만원+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 라이프스타일</label>
                  <Select value={filters.lifestyle} onValueChange={(value) => handleFilterChange('lifestyle', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="city">도시형</SelectItem>
                      <SelectItem value="nature">자연형</SelectItem>
                      <SelectItem value="beach">해변형</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 교통</label>
                  <Select value={filters.transportation} onValueChange={(value) => handleFilterChange('transportation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="excellent">매우 좋음</SelectItem>
                      <SelectItem value="good">좋음</SelectItem>
                      <SelectItem value="average">보통</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 직업</label>
                  <Select value={filters.occupation} onValueChange={(value) => handleFilterChange('occupation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="developer">개발자</SelectItem>
                      <SelectItem value="designer">디자이너</SelectItem>
                      <SelectItem value="marketer">마케터</SelectItem>
                      <SelectItem value="freelancer">프리랜서</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Filters Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={() => setShowAdvancedFilters(true)}
                  variant="outline"
                  className="px-6 py-3 text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  <Sliders className="h-4 w-4 mr-2" />
                  고급 필터
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={advancedFilters}
        onFiltersChange={handleAdvancedFiltersChange}
        onReset={handleAdvancedFiltersReset}
        onSave={handleSaveFilter}
      />
    </section>
  );
}