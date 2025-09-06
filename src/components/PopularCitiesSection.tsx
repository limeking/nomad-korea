'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useSearch } from '@/utils/SearchContext';
import { Spinner } from '@/components/ui/spinner';
import { RealtimeCityCard } from './RealtimeCityCard';
import type { City } from '@/types';

// 인기 도시 섹션 컴포넌트 (실시간 데이터 통합)
export default function PopularCitiesSection() {
  const { filteredCities, loading } = useSearch();

  // 상위 4개 도시만 표시 (평점 기준)
  const popularCities = React.useMemo(() => {
    return [...filteredCities]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [filteredCities]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              실시간 인기 도시 🔥
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            지금 가장 핫한 디지털 노마드 도시들의 실시간 날씨와 대기질을 확인해보세요
          </p>
          
          {/* 실시간 업데이트 표시 */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">실시간 업데이트</span>
          </div>
        </div>

        {/* 로딩 상태 */}
        {loading ? (
          <div className="text-center py-12">
            <Spinner />
            <p className="text-gray-500 mt-4">도시 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 도시 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {popularCities.map((city) => (
                <RealtimeCityCard key={city.id} city={city} />
              ))}
            </div>

            {/* 빈 상태 */}
            {popularCities.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏙️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-4">
                  다른 검색 조건을 시도해보세요
                </p>
              </div>
            )}

            {/* 더 많은 도시 보기 버튼 */}
            {popularCities.length > 0 && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 text-lg hover:bg-blue-50 hover:border-blue-300"
                >
                  더 많은 도시 보기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* 실시간 데이터 설명 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🌟 실시간 환경 정보로 더 스마트한 선택을!
            </h3>
            <p className="text-gray-600 mb-6">
              각 도시의 현재 날씨와 대기질을 실시간으로 확인하여 
              최적의 노마드 생활 환경을 찾아보세요. 
              모든 데이터는 5-10분마다 자동 업데이트됩니다.
            </p>
            
            {/* 데이터 소스 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">🌤️</div>
                <h4 className="font-semibold mb-1">실시간 날씨</h4>
                <p className="text-sm text-gray-600">
                  온도, 습도, 풍속 등<br/>
                  현재 기상 정보
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">🌬️</div>
                <h4 className="font-semibold mb-1">대기질 지수</h4>
                <p className="text-sm text-gray-600">
                  PM2.5, PM10, AQI<br/>
                  실시간 대기질 정보
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold mb-1">스마트 추천</h4>
                <p className="text-sm text-gray-600">
                  환경 데이터 기반<br/>
                  최적 도시 제안
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}