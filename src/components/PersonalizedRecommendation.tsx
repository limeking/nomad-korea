'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  MapPin, 
  DollarSign, 
  Users, 
  Wifi, 
  Heart,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import type { PersonalizationFeature } from '@/types';

const personalizationFeatures: PersonalizationFeature[] = [
  {
    icon: 'Target',
    title: '직업별 맞춤 추천',
    description: '개발자, 디자이너, 마케터 등 직업 특성에 맞는 도시 추천'
  },
  {
    icon: 'MapPin',
    title: '라이프스타일 분석',
    description: '도시형, 자연형, 해변형 등 선호하는 환경 기반 추천'
  },
  {
    icon: 'DollarSign',
    title: '예산 최적화',
    description: '설정한 예산 내에서 최고의 가성비 도시 발견'
  },
  {
    icon: 'Users',
    title: '커뮤니티 매칭',
    description: '나와 비슷한 관심사를 가진 노마드들이 있는 도시'
  },
  {
    icon: 'Wifi',
    title: '업무 환경 분석',
    description: '인터넷 속도, 카페, 코워킹 스페이스 등 업무 인프라 고려'
  },
  {
    icon: 'Heart',
    title: '만족도 예측',
    description: '개인 성향 분석을 통한 도시별 만족도 예측'
  }
];

function getIcon(iconName: string) {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Target,
    MapPin,
    DollarSign,
    Users,
    Wifi,
    Heart
  };
  
  const IconComponent = iconMap[iconName] || Target;
  return <IconComponent className="h-8 w-8 text-blue-500" />;
}

function FeatureCard({ feature }: { feature: PersonalizationFeature }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {getIcon(feature.icon)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

function OnboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occupation: '',
    budget: '',
    lifestyle: '',
    priorities: [] as string[]
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // 완료 로직
      alert('맞춤 추천을 위한 정보가 저장되었습니다! (실제로는 API 호출)');
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">맞춤 추천 설정</h3>
              <p className="text-sm text-gray-600">단계 {step}/4</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">직업을 선택해주세요</h4>
              <div className="grid grid-cols-2 gap-3">
                {['개발자', '디자이너', '마케터', '프리랜서', '기타'].map((job) => (
                  <Button
                    key={job}
                    variant={formData.occupation === job ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, occupation: job })}
                    className="h-12"
                  >
                    {job}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">월 예산을 선택해주세요</h4>
              <div className="space-y-3">
                {['150만원 이하', '150-250만원', '250만원 이상'].map((budget) => (
                  <Button
                    key={budget}
                    variant={formData.budget === budget ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, budget })}
                    className="w-full h-12 justify-start"
                  >
                    {budget}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">선호하는 라이프스타일은?</h4>
              <div className="space-y-3">
                {['도시형 (편의시설, 교통)', '자연형 (산, 공원, 조용함)', '해변형 (바다, 휴양)'].map((lifestyle) => (
                  <Button
                    key={lifestyle}
                    variant={formData.lifestyle === lifestyle ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, lifestyle })}
                    className="w-full h-12 justify-start text-left"
                  >
                    {lifestyle}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h4 className="text-lg font-semibold mb-2">설정이 완료되었습니다!</h4>
              <p className="text-gray-600 mb-4">
                입력해주신 정보를 바탕으로 맞춤 도시를 추천해드리겠습니다.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left text-sm">
                <div className="font-medium text-blue-900 mb-2">설정 요약:</div>
                <div className="text-blue-800">
                  • 직업: {formData.occupation}<br/>
                  • 예산: {formData.budget}<br/>
                  • 스타일: {formData.lifestyle}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 mt-6 border-t">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                이전
              </Button>
            )}
            <div className={step === 1 ? 'ml-auto' : ''}>
              <Button onClick={handleNext}>
                {step === 4 ? '완료' : '다음'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PersonalizedRecommendation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">맞춤 추천 받기</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            당신의 라이프스타일과 업무 스타일에 완벽하게 맞는 도시를 찾아드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {personalizationFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              🎯 3분만에 내게 맞는 도시 찾기
            </h3>
            <p className="text-lg text-gray-600">
              간단한 질문에 답하고 개인화된 도시 추천을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">1</span>
                <span className="font-semibold">직업 & 업무 스타일</span>
              </div>
              <p className="text-gray-600 pl-9">원격근무 환경, 업무 시간대 등</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">2</span>
                <span className="font-semibold">라이프스타일 선호</span>
              </div>
              <p className="text-gray-600 pl-9">도시 vs 자연, 활동적 vs 조용함</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">3</span>
                <span className="font-semibold">예산 & 기간</span>
              </div>
              <p className="text-gray-600 pl-9">월 예산, 거주 계획 기간</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">4</span>
                <span className="font-semibold">우선순위 설정</span>
              </div>
              <p className="text-gray-600 pl-9">교통, 날씨, 문화생활 등 중요도</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              지금 시작하기
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              더 알아보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              💯 이미 <strong>2,847명</strong>이 맞춤 추천으로 완벽한 도시를 찾았어요!
            </p>
          </div>
        </div>
      </div>
      
      <OnboardingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}