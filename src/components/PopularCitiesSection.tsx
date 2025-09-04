import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import type { City } from '@/types';

const popularCities: City[] = [
  {
    id: '1',
    name: '서울',
    region: '서울특별시',
    rating: 4.2,
    monthlyBudget: 2850000,
    nomadCount: 2847,
    growthRate: 15,
    livingCost: 2850000,
    housingCost: 1500000,
    transportation: 5,
    internet: 5,
    safety: 4,
    weather: 3,
    coworking: 5,
    tags: ['대도시', '교통편리', '다양한문화'],
  },
  {
    id: '2',
    name: '부산',
    region: '부산광역시',
    rating: 4.0,
    monthlyBudget: 1950000,
    nomadCount: 891,
    growthRate: 28,
    livingCost: 1950000,
    housingCost: 900000,
    transportation: 4,
    internet: 4,
    safety: 4,
    weather: 4,
    coworking: 3,
    tags: ['해변도시', '온화한기후', '저렴한비용'],
  },
  {
    id: '3',
    name: '제주',
    region: '제주특별자치도',
    rating: 4.3,
    monthlyBudget: 2200000,
    nomadCount: 456,
    growthRate: 5,
    livingCost: 2200000,
    housingCost: 1100000,
    transportation: 2,
    internet: 4,
    safety: 5,
    weather: 5,
    coworking: 3,
    tags: ['자연친화', '아름다운경관', '힐링'],
  },
  {
    id: '4',
    name: '강릉',
    region: '강원도',
    rating: 3.9,
    monthlyBudget: 1650000,
    nomadCount: 234,
    growthRate: 45,
    livingCost: 1650000,
    housingCost: 800000,
    transportation: 2,
    internet: 3,
    safety: 5,
    weather: 4,
    coworking: 2,
    tags: ['해변', '조용함', '저렴함'],
  },
];

function CityCard({ city }: { city: City }) {
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
              {tag}
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
  );
}

export default function PopularCitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-2xl">🔥</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">인기 급상승 도시</h2>
          </div>
          <p className="text-lg text-gray-600">
            디지털 노마드들이 주목하는 트렌딩 도시들을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {popularCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8 py-3 text-lg">
            더 많은 도시 보기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}