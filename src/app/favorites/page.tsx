'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, DollarSign, Users, HeartOff } from 'lucide-react';
import Header from '@/components/Header';
import type { City } from '@/types';

// Mock favorite cities data
const mockFavoriteCities: City[] = [
  {
    id: 'seoul-1',
    name: '서울',
    region: '수도권',
    rating: 4.5,
    monthlyBudget: 2500000,
    nomadCount: 3247,
    growthRate: 12,
    livingCost: 85,
    housingCost: 90,
    transportation: 95,
    internet: 98,
    safety: 88,
    weather: 70,
    coworking: 92,
    tags: ['카페', '교통편의', '문화생활', '네트워킹']
  },
  {
    id: 'jeju-1',
    name: '제주시',
    region: '제주도',
    rating: 4.8,
    monthlyBudget: 1800000,
    nomadCount: 892,
    growthRate: 25,
    livingCost: 75,
    housingCost: 70,
    transportation: 60,
    internet: 85,
    safety: 95,
    weather: 85,
    coworking: 78,
    tags: ['자연', '여유로움', '깨끗한공기', '바다뷰']
  },
  {
    id: 'busan-1',
    name: '부산',
    region: '영남권',
    rating: 4.3,
    monthlyBudget: 1900000,
    nomadCount: 1456,
    growthRate: 18,
    livingCost: 70,
    housingCost: 65,
    transportation: 85,
    internet: 92,
    safety: 90,
    weather: 80,
    coworking: 88,
    tags: ['해안도시', '온화한날씨', '맛집', '서핑']
  }
];

function CityCard({ city, onRemove }: { city: City; onRemove: (cityId: string) => void }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
              <p className="text-gray-600">{city.region}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(city.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <HeartOff className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{city.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">{(city.monthlyBudget / 10000).toFixed(0)}만원/월</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">노마드 {city.nomadCount.toLocaleString()}명</span>
            <Badge variant="outline" className="ml-2 text-xs">
              +{city.growthRate}% ↗️
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {city.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {city.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{city.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-600">인터넷</p>
              <p className="font-medium text-sm">{city.internet}/100</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">안전</p>
              <p className="font-medium text-sm">{city.safety}/100</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">교통</p>
              <p className="font-medium text-sm">{city.transportation}/100</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FavoritesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [favoriteCities, setFavoriteCities] = useState<City[]>(mockFavoriteCities);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleRemoveFromFavorites = (cityId: string) => {
    setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    // In real app, this would make an API call to remove from favorites
  };

  const handleGoToSearch = () => {
    router.push('/');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-4xl mb-4">💖</div>
            <p className="text-gray-600">관심 도시를 로딩 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                관심 도시
              </h1>
              <p className="text-gray-600 mt-2">
                나중에 다시 보고 싶은 도시들을 저장해두세요
              </p>
            </div>
            <Button onClick={handleGoToSearch}>
              <MapPin className="h-4 w-4 mr-2" />
              더 많은 도시 찾기
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{favoriteCities.length}</p>
              <p className="text-gray-600">관심 도시</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {favoriteCities.length > 0 
                  ? (favoriteCities.reduce((sum, city) => sum + city.rating, 0) / favoriteCities.length).toFixed(1)
                  : '0.0'
                }
              </p>
              <p className="text-gray-600">평균 평점</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {favoriteCities.length > 0 
                  ? Math.round(favoriteCities.reduce((sum, city) => sum + city.monthlyBudget, 0) / favoriteCities.length / 10000)
                  : 0
                }만원
              </p>
              <p className="text-gray-600">평균 생활비</p>
            </CardContent>
          </Card>
        </div>

        {/* Cities Grid */}
        {favoriteCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onRemove={handleRemoveFromFavorites}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              아직 관심 도시가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              마음에 드는 도시를 찾아 관심 목록에 추가해보세요!
            </p>
            <Button onClick={handleGoToSearch}>
              <MapPin className="h-4 w-4 mr-2" />
              도시 둘러보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}