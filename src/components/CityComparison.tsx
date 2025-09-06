'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, ArrowRight, BarChart3, X, Plus } from 'lucide-react';
import { useSearch } from '@/utils/SearchContext';

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

function getCityEmoji(name: string) {
  const emojiMap: { [key: string]: string } = {
    '서울': '🏙️',
    '부산': '🌊',
    '제주': '🏝️',
    '강릉': '🏔️',
    '대구': '🌆',
    '광주': '🎨',
    '인천': '✈️',
    '대전': '🔬'
  };
  return emojiMap[name] || '🏘️';
}

function transformCityToComparison(city: import('@/types').City): ComparisonData {
  return {
    city: city.name,
    emoji: getCityEmoji(city.name),
    livingCost: Math.floor(city.livingCost / 10000),
    housingCost: Math.floor(city.housingCost / 10000),
    transportation: city.transportation,
    internet: city.internet,
    safety: city.safety,
    weather: city.weather,
    coworking: city.coworking
  };
}

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

function CitySelectionModal({ isOpen, onClose, onSelect, availableCities, selectedCities }: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: import('@/types').City) => void;
  availableCities: import('@/types').City[];
  selectedCities: import('@/types').City[];
}) {
  if (!isOpen) return null;

  const selectedCityIds = selectedCities.map(city => city.id);
  const availableForSelection = availableCities.filter(city => !selectedCityIds.includes(city.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">도시 선택</h3>
              <p className="text-sm text-gray-600">비교할 도시를 선택해주세요 (최대 3개)</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableForSelection.map((city) => (
              <div
                key={city.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => onSelect(city)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{getCityEmoji(city.name)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{city.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{city.rating}/5.0</span>
                      <span>•</span>
                      <span>₩{Math.floor(city.monthlyBudget / 10000)}만/월</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {city.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span key={index} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {availableForSelection.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🏙️</div>
              <p className="text-gray-600">모든 도시가 이미 선택되었습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CityComparison() {
  const { filteredCities } = useSearch();
  const [selectedCities, setSelectedCities] = useState<import('@/types').City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 기본적으로 처음 3개 도시를 표시
  const defaultCities = filteredCities.slice(0, 3);
  const comparisonCities = selectedCities.length > 0 ? selectedCities : defaultCities;
  const comparisonData = comparisonCities.map(transformCityToComparison);

  const handleCitySelect = (city: import('@/types').City) => {
    if (selectedCities.length < 3) {
      setSelectedCities([...selectedCities, city]);
    }
    setIsModalOpen(false);
  };

  const handleCityRemove = (cityToRemove: import('@/types').City) => {
    setSelectedCities(selectedCities.filter(city => city.id !== cityToRemove.id));
  };

  const canAddMore = comparisonCities.length < 3;
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
          
          {/* 선택된 도시 표시 및 관리 */}
          {selectedCities.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {comparisonCities.map((city) => (
                <div key={city.id} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span className="mr-2">{getCityEmoji(city.name)} {city.name}</span>
                  <button
                    onClick={() => handleCityRemove(city)}
                    className="hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {canAddMore && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  도시 추가
                </button>
              )}
            </div>
          )}
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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
                    {comparisonData.map((city) => (
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

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              도시 선택하기
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
            >
              상세 비교하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            💡 최대 3개 도시까지 동시 비교 가능합니다
          </p>
        </div>
      </div>
      
      <CitySelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCitySelect}
        availableCities={filteredCities}
        selectedCities={comparisonCities}
      />
    </section>
  );
}