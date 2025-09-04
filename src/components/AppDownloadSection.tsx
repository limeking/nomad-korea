import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Download, 
  Bell, 
  MapPin, 
  Users, 
  Star,
  ArrowRight
} from 'lucide-react';

const appFeatures = [
  {
    icon: Bell,
    title: '실시간 알림',
    description: '새로운 도시 정보, 커뮤니티 소식, 맞춤 추천을 즉시 받아보세요'
  },
  {
    icon: MapPin,
    title: 'GPS 기반 정보',
    description: '현재 위치 기반으로 주변 카페, 코워킹 스페이스, 노마드 모임 정보 제공'
  },
  {
    icon: Users,
    title: '오프라인 모드',
    description: '인터넷이 없어도 저장된 도시 정보와 지도를 확인할 수 있어요'
  },
  {
    icon: Star,
    title: '간편한 리뷰 작성',
    description: '사진과 함께 빠르게 리뷰를 작성하고 다른 노마드들과 공유하세요'
  }
];

function FeatureCard({ feature }: { feature: typeof appFeatures[0] }) {
  const IconComponent = feature.icon;
  
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
        <IconComponent className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
        <p className="text-sm text-gray-600">{feature.description}</p>
      </div>
    </div>
  );
}

export default function AppDownloadSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Smartphone className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  모바일 앱으로
                  <br />
                  <span className="text-blue-600">더 편리하게</span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                언제 어디서나 손쉽게 도시 정보를 확인하고, 노마드 커뮤니티에 참여하세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">🍎</div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Button>

              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">🤖</div>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="mt-4">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Smartphone className="mr-2 h-4 w-4" />
                모바일 웹으로 이용하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
                      🇰🇷
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">한국노마드</h3>
                    <p className="text-gray-600 mb-6">
                      디지털 노마드를 위한<br />올인원 플랫폼
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium">내 주변 카페</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">노마드 모임</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">5개</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-600" />
                          </div>
                          <span className="text-sm font-medium">추천 도시</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">3개</Badge>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Download className="mr-2 h-4 w-4" />
                      지금 다운로드
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📱 이미 <strong className="text-blue-600">15,000+</strong> 노마드들이 사용 중!
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">4.8⭐</div>
                  <div className="text-sm text-gray-600">앱스토어 평점</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">15K+</div>
                  <div className="text-sm text-gray-600">다운로드</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">2.5K</div>
                  <div className="text-sm text-gray-600">리뷰 수</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <div className="text-sm text-gray-600">만족도</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}