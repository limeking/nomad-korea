'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useSearch } from '@/utils/SearchContext';
import { Spinner } from '@/components/ui/spinner';
import type { City } from '@/types';


const CityCard = React.memo(function CityCard({ city }: { city: City }) {
  const formatBudget = (amount: number) => {
    return `₩${Math.floor(amount / 10000)}만`;
  };

  const formatGrowth = (rate: number) => {
    return `+${rate}%`;
  };

  const getCityEmoji = (name: string) => {
    switch (name) {
      case '서울': return '🏙️';
      case '부산': return '🌊';
      case '제주': return '🏝️';
      case '강릉': return '🏔️';
      default: return '🏘️';
    }
  };

  return (
    <Link href={`/cities/${city.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getCityEmoji(city.name)}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
              <p className="text-sm text-gray-500">{city.region}</p>
            </div>
          </div>
          <Badge 
            variant={city.growthRate > 20 ? 'default' : city.growthRate > 0 ? 'secondary' : 'outline'}
            className="flex items-center space-x-1"
          >
            <TrendingUp className="h-3 w-3" />
            <span>{formatGrowth(city.growthRate)} ↗️</span>
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-semibold">{city.rating}/5.0</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">월 생활비</span>
            <span className="font-semibold text-green-600">{formatBudget(city.monthlyBudget)}/월</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">노마드</span>
            </div>
            <span className="font-semibold text-blue-600">{city.nomadCount.toLocaleString()}명</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {city.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

          <Button 
            variant="outline" 
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
          >
            자세히 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

export default function PopularCitiesSection() {
  const { filteredCities, searchQuery, filters, isLoading } = useSearch();
  
  // 검색이나 필터가 활성화된 경우 필터된 결과를 보여주고,
  // 그렇지 않으면 성장률 순으로 정렬된 인기 도시들을 보여줌
  const hasSearchOrFilters = searchQuery || Object.values(filters).some(value => value && value !== '');
  const displayCities = hasSearchOrFilters 
    ? filteredCities.slice(0, 4)
    : filteredCities.sort((a, b) => b.growthRate - a.growthRate).slice(0, 4);
  
  const sectionTitle = hasSearchOrFilters ? '검색 결과' : '인기 급상승 도시';
  const sectionDescription = hasSearchOrFilters 
    ? `${filteredCities.length}개의 도시가 검색되었습니다`
    : '디지털 노마드들이 주목하는 트렌딩 도시들을 만나보세요';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-2xl">{hasSearchOrFilters ? '🔍' : '🔥'}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{sectionTitle}</h2>
          </div>
          <p className="text-lg text-gray-600">
            {sectionDescription}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Spinner size="lg" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">도시 정보를 불러오고 있습니다...</h3>
            <p className="text-gray-600">잠시만 기다려주세요</p>
          </div>
        ) : displayCities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">다른 검색어나 필터를 시도해보세요</p>
            <Button variant="outline">
              필터 초기화
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayCities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="px-8 py-3 text-lg">
                더 많은 도시 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}