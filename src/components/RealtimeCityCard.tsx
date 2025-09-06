'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, TrendingUp, Thermometer, Wind, Eye, Droplets } from 'lucide-react';
import { RealtimeData, AQI_LEVELS, WeatherIconType } from '@/types/realtime';
import type { City } from '@/types';

// 날씨 아이콘 컴포넌트
const WeatherIcon = ({ type, size = 24 }: { type: WeatherIconType; size?: number }) => {
  const icons = {
    sunny: '☀️',
    partly_cloudy: '⛅',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    stormy: '⛈️',
    foggy: '🌫️'
  };

  return <span style={{ fontSize: `${size}px` }}>{icons[type]}</span>;
};

// 대기질 배지 컴포넌트
const AirQualityBadge = ({ aqi, level }: { aqi: number; level: string }) => {
  const levelInfo = AQI_LEVELS[level as keyof typeof AQI_LEVELS];
  
  return (
    <Badge 
      variant="secondary" 
      style={{ 
        backgroundColor: levelInfo.color + '20', 
        color: levelInfo.color,
        border: `1px solid ${levelInfo.color}40`
      }}
      className="text-xs font-medium"
    >
      {levelInfo.label} {aqi}
    </Badge>
  );
};

// 실시간 도시 카드 컴포넌트
interface RealtimeCityCardProps {
  city: City;
}

export const RealtimeCityCard = React.memo(function RealtimeCityCard({ city }: RealtimeCityCardProps) {
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatBudget = (amount: number) => {
    if (!amount || isNaN(amount)) return "정보없음";
    return `₩${Math.floor(amount / 10000)}만`;
  };

  const formatGrowth = (rate: number) => {
    return `+${rate}%`;
  };

  // 실시간 데이터 로드
  useEffect(() => {
    const loadRealtimeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/realtime/${city.id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setRealtimeData(result.data);
        } else {
          throw new Error(result.error || 'Failed to load realtime data');
        }
      } catch (err) {
        console.error(`Failed to load realtime data for ${city.name}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadRealtimeData();
  }, [city.id]);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardContent className="p-0">
        <Link href={`/cities/${city.id}`}>
          <div className="relative">
            {/* 도시 이미지 */}
            <div className="h-48 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center overflow-hidden">
              {city.image ? (
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{city.emoji}</div>
                  <div className="text-lg font-semibold">{city.name}</div>
                </div>
              )}
              
              {/* 실시간 데이터 오버레이 */}
              <div className="absolute top-3 left-3 flex gap-2">
                {realtimeData && !loading && (
                  <>
                    {/* 날씨 정보 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 text-sm">
                      <WeatherIcon type={realtimeData.weather.icon} size={16} />
                      <span className="font-medium text-gray-800">
                        {realtimeData.weather.temperature}°C
                      </span>
                    </div>
                  </>
                )}
                
                {loading && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* 대기질 배지 */}
              <div className="absolute top-3 right-3">
                {realtimeData && !loading && (
                  <AirQualityBadge 
                    aqi={realtimeData.airQuality.aqi} 
                    level={realtimeData.airQuality.aqiLevel} 
                  />
                )}
              </div>
            </div>

            {/* 도시 정보 */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {city.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{city.rating}</span>
                    <span className="text-sm text-gray-500">({city.nomadCount}명)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {formatBudget(city.monthlyCost)}
                  </div>
                  <div className="text-sm text-gray-500">월 평균</div>
                </div>
              </div>

              {/* 실시간 상세 정보 */}
              {realtimeData && !loading && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* 날씨 세부 정보 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Droplets className="h-3 w-3" />
                        <span>습도 {realtimeData.weather.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Wind className="h-3 w-3" />
                        <span>{realtimeData.weather.windSpeed.toFixed(1)}m/s</span>
                      </div>
                    </div>
                    
                    {/* 대기질 세부 정보 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>PM2.5: {realtimeData.airQuality.pm25}μg/m³</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>PM10: {realtimeData.airQuality.pm10}μg/m³</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    업데이트: {new Date(realtimeData.lastUpdated).toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              )}

              {/* 에러 상태 */}
              {error && !loading && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">실시간 데이터 로드 실패</p>
                </div>
              )}

              {/* 기본 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{city.nomadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{formatGrowth(city.growthRate)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {city.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
});