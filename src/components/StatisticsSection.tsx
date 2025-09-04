import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  MapPin, 
  Users, 
  Star, 
  DollarSign, 
  TrendingUp,
  Hash,
  Target
} from 'lucide-react';
import type { Statistic } from '@/types';

const statisticsData: Statistic[] = [
  {
    label: '전체 도시 수',
    value: '87개',
    change: '+5개',
    trend: 'up'
  },
  {
    label: '활성 노마드',
    value: '12,847명',
    change: '+2.1K',
    trend: 'up'
  },
  {
    label: '평균 만족도',
    value: '4.2점',
    change: '+0.3점',
    trend: 'up'
  },
  {
    label: '평균 생활비',
    value: '233만원',
    change: '-15만원',
    trend: 'down'
  },
  {
    label: '월 성장률',
    value: '18.5%',
    change: '+3.2%',
    trend: 'up'
  }
];

const trendingKeywords = [
  '제주도 카페',
  '강릉 코워킹',
  '부산 해변',
  '서울 교통',
  '대전 주거비',
  '광주 날씨',
  '울산 안전',
  '전주 문화',
  '속초 자연',
  '여수 야경',
  '경주 역사',
  '포항 바다'
];

function StatCard({ stat }: { stat: Statistic }) {
  const getIcon = (label: string) => {
    if (label.includes('도시')) return <MapPin className="h-6 w-6 text-blue-500" />;
    if (label.includes('노마드')) return <Users className="h-6 w-6 text-green-500" />;
    if (label.includes('만족도')) return <Star className="h-6 w-6 text-yellow-500" />;
    if (label.includes('생활비')) return <DollarSign className="h-6 w-6 text-purple-500" />;
    if (label.includes('성장률')) return <TrendingUp className="h-6 w-6 text-red-500" />;
    return <Target className="h-6 w-6 text-gray-500" />;
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      case 'stable': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendSymbol = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↙️';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getIcon(stat.label)}
            <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>

        {stat.change && (
          <Badge 
            variant="secondary"
            className={`text-xs ${getTrendColor(stat.trend)}`}
          >
            <span className="mr-1">{getTrendSymbol(stat.trend)}</span>
            {stat.change}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <BarChart3 className="h-8 w-8 text-indigo-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">플랫폼 현황</h2>
          </div>
          <p className="text-lg text-gray-600">
            실시간으로 업데이트되는 한국 노마드 생태계 데이터
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {statisticsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Hash className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">트렌딩 키워드</h3>
              </div>
              <p className="text-gray-600 mb-6">
                지금 가장 많이 검색되는 키워드들을 확인해보세요
              </p>
              
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">이달의 하이라이트</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">강릉 급부상</p>
                    <p className="text-sm text-gray-600">새로운 노마드들이 45% 증가</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">생활비 하락</p>
                    <p className="text-sm text-gray-600">전국 평균 15만원 절약</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">만족도 상승</p>
                    <p className="text-sm text-gray-600">평균 4.2점으로 0.3점 향상</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">새 도시 추가</p>
                    <p className="text-sm text-gray-600">5개 신규 도시 정보 업데이트</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-2">
                📊 데이터는 매일 자정에 업데이트됩니다
              </p>
              <p className="text-xs text-gray-500">
                마지막 업데이트: 2024년 9월 4일 00:00 KST
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}