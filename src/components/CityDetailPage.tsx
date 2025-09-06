'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock,
  DollarSign,
  Wifi,
  Shield,
  Sun,
  Car,
  Building,
  Heart,
  Share2,
  Calendar,
  Thermometer
} from 'lucide-react';
import type { City } from '@/types';

interface CityDetailPageProps {
  city: City;
}

export default function CityDetailPage({ city }: CityDetailPageProps) {
  const router = useRouter();

  const formatBudget = (amount: number) => {
    return `₩${Math.floor(amount / 10000)}만`;
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

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-green-500';
    if (score >= 3.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-800';
    if (score >= 4.0) return 'bg-green-50 text-green-700';
    if (score >= 3.5) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              뒤로가기
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-6xl">{getCityEmoji(city.name)}</span>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{city.name}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{city.rating}/5.0</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{city.nomadCount.toLocaleString()}명</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white border-white/30"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{city.growthRate}% 성장
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">{formatBudget(city.monthlyBudget)}</div>
              <div className="text-blue-100">월 생활비</div>
            </div>
          </div>

          {city.description && (
            <p className="text-lg text-blue-100 max-w-3xl">{city.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  주요 생활비 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatBudget(city.livingCost)}
                    </div>
                    <div className="text-sm text-gray-600">총 생활비</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatBudget(city.housingCost)}
                    </div>
                    <div className="text-sm text-gray-600">주거비</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      ₩{Math.floor((city.livingCost - city.housingCost) / 10000)}만
                    </div>
                    <div className="text-sm text-gray-600">기타 비용</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {city.coworkingSpaces?.[0] ? `₩${Math.floor(city.coworkingSpaces[0].pricePerDay / 1000)}K` : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">코워킹/일</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  생활 품질 점수
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">인터넷</span>
                    </div>
                    <Badge className={getScoreBadge(city.internet)}>
                      {city.internet}/5.0
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">안전도</span>
                    </div>
                    <Badge className={getScoreBadge(city.safety)}>
                      {city.safety}/5.0
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">교통</span>
                    </div>
                    <Badge className={getScoreBadge(city.transportation)}>
                      {city.transportation}/5.0
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">날씨</span>
                    </div>
                    <Badge className={getScoreBadge(city.weather)}>
                      {city.weather}/5.0
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">코워킹</span>
                    </div>
                    <Badge className={getScoreBadge(city.coworking)}>
                      {city.coworking}/5.0
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            {city.highlights && (
              <Card>
                <CardHeader>
                  <CardTitle>🌟 주요 특징</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {city.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-800">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Popular Districts */}
            {city.popularDistricts && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    인기 지역
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {city.popularDistricts.map((district, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {city.timeZone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">시간대</span>
                    <span className="font-medium">{city.timeZone}</span>
                  </div>
                )}
                {city.currency && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">통화</span>
                    <span className="font-medium">{city.currency}</span>
                  </div>
                )}
                {city.language && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">언어</span>
                    <span className="font-medium">{city.language}</span>
                  </div>
                )}
                {city.visaRequirement && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">비자</span>
                    <span className="font-medium text-sm">{city.visaRequirement}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weather */}
            {city.averageTemperature && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="mr-2 h-5 w-5" />
                    평균 기온
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {city.averageTemperature.summer}°C
                      </div>
                      <div className="text-sm text-gray-600">여름</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {city.averageTemperature.winter}°C
                      </div>
                      <div className="text-sm text-gray-600">겨울</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Best Months */}
            {city.bestMonths && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    방문 추천 시기
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {city.bestMonths.map((month, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Coworking Spaces */}
            {city.coworkingSpaces && city.coworkingSpaces.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    코워킹 스페이스
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {city.coworkingSpaces.slice(0, 3).map((space, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{space.name}</h4>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs ml-1">{space.rating}</span>
                          </div>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          ₩{space.pricePerDay.toLocaleString()}/일
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>🏷️ 태그</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {city.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">
                  {city.name}에서 노마드 라이프 시작하기
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  실제 경험자들의 후기와 더 많은 정보를 확인하세요
                </p>
                <Button className="w-full mb-2">
                  커뮤니티 둘러보기
                </Button>
                <Button variant="outline" className="w-full">
                  비슷한 도시 찾기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}