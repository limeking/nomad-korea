import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Users, Star, Filter } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <span className="text-6xl lg:text-8xl">🏙️</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            한국에서 디지털 노마드로
            <br />
            <span className="text-blue-600">살기 좋은 도시</span>를 찾아보세요
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm lg:text-base">
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <MapPin className="h-4 w-4" />
              <span><strong>87개</strong> 도시</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <Users className="h-4 w-4" />
              <span><strong>12,847명</strong> 노마드</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2">
              <Star className="h-4 w-4" />
              <span><strong>15,692개</strong> 리뷰</span>
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border p-6 lg:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                🔍 어떤 도시를 찾고 계신가요?
              </h2>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="검색어를 입력하세요... 예: 서울, 제주, 카페가 많은 곳"
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg">
                  🔍 검색
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span className="font-medium">빠른 필터</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 지역</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seoul">서울</SelectItem>
                      <SelectItem value="busan">부산</SelectItem>
                      <SelectItem value="jeju">제주</SelectItem>
                      <SelectItem value="gangneung">강릉</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 예산</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">~150만원</SelectItem>
                      <SelectItem value="mid">150-250만원</SelectItem>
                      <SelectItem value="high">250만원+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 라이프스타일</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">도시형</SelectItem>
                      <SelectItem value="nature">자연형</SelectItem>
                      <SelectItem value="beach">해변형</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 교통</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">매우 좋음</SelectItem>
                      <SelectItem value="good">좋음</SelectItem>
                      <SelectItem value="average">보통</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">🏷️ 직업</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">개발자</SelectItem>
                      <SelectItem value="designer">디자이너</SelectItem>
                      <SelectItem value="marketer">마케터</SelectItem>
                      <SelectItem value="freelancer">프리랜서</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}