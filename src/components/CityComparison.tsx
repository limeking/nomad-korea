import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, ArrowRight, BarChart3 } from 'lucide-react';

interface ComparisonData {
  city: string;
  emoji: string;
  livingCost: number;
  housingCost: number;
  transportation: number;
  internet: number;
  safety: number;
  weather: number;
  coworking: number;
}

const comparisonCities: ComparisonData[] = [
  {
    city: '서울',
    emoji: '🏙️',
    livingCost: 285,
    housingCost: 150,
    transportation: 5,
    internet: 5,
    safety: 4,
    weather: 3,
    coworking: 5
  },
  {
    city: '부산',
    emoji: '🌊',
    livingCost: 195,
    housingCost: 90,
    transportation: 4,
    internet: 4,
    safety: 4,
    weather: 4,
    coworking: 3
  },
  {
    city: '제주',
    emoji: '🏝️',
    livingCost: 220,
    housingCost: 110,
    transportation: 2,
    internet: 4,
    safety: 5,
    weather: 5,
    coworking: 3
  }
];

const averageData = {
  livingCost: 233,
  housingCost: 117,
  transportation: 3.7,
  internet: 4.3,
  safety: 4.3,
  weather: 4.0,
  coworking: 3.7
};

function formatCurrency(amount: number) {
  return `₩${amount}만`;
}

function getProgressValue(value: number, max: number) {
  return (value / max) * 100;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function CityComparison() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">도시 비교하기</h2>
          </div>
          <p className="text-lg text-gray-600">
            주요 도시들의 핵심 지표를 한눈에 비교해보세요
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-xl">📊 주요 도시 비교표</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">항목</th>
                    {comparisonCities.map((city) => (
                      <th key={city.city} className="text-center py-4 px-4 font-semibold text-gray-700">
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-2xl">{city.emoji}</span>
                          <span>{city.city}</span>
                        </div>
                      </th>
                    ))}
                    <th className="text-center py-4 px-4 font-semibold text-gray-700">평균</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">💰 생활비</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-living`} className="py-4 px-4 text-center">
                        <div className="space-y-2">
                          <div className="font-semibold text-green-600">
                            {formatCurrency(city.livingCost)}
                          </div>
                          <Progress 
                            value={getProgressValue(city.livingCost, 300)} 
                            className="h-2"
                          />
                        </div>
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {formatCurrency(averageData.livingCost)}
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">🏠 주거비</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-housing`} className="py-4 px-4 text-center">
                        <div className="space-y-2">
                          <div className="font-semibold text-blue-600">
                            {formatCurrency(city.housingCost)}
                          </div>
                          <Progress 
                            value={getProgressValue(city.housingCost, 200)} 
                            className="h-2"
                          />
                        </div>
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {formatCurrency(averageData.housingCost)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">🚇 교통</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-transport`} className="py-4 px-4 text-center">
                        <StarRating rating={city.transportation} />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {averageData.transportation}점
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">📶 인터넷</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-internet`} className="py-4 px-4 text-center">
                        <StarRating rating={city.internet} />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {averageData.internet}점
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">🛡️ 안전</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-safety`} className="py-4 px-4 text-center">
                        <StarRating rating={city.safety} />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {averageData.safety}점
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">🌤️ 날씨</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-weather`} className="py-4 px-4 text-center">
                        <StarRating rating={city.weather} />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {averageData.weather}점
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">🏢 코워킹</td>
                    {comparisonCities.map((city) => (
                      <td key={`${city.city}-coworking`} className="py-4 px-4 text-center">
                        <StarRating rating={city.coworking} />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                      {averageData.coworking}점
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" className="px-8 py-3 text-lg">
            상세 비교하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            💡 최대 5개 도시까지 동시 비교 가능합니다
          </p>
        </div>
      </div>
    </section>
  );
}