import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowLeft, Search } from 'lucide-react';

export default function CityNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🗺️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            도시를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 도시 정보가 존재하지 않거나 현재 서비스되지 않고 있습니다.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            
            <Link href="/#cities" className="block">
              <Button className="w-full" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                다른 도시 둘러보기
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              원하는 도시가 없나요?
            </p>
            <Link href="/request-city" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              도시 추가 요청하기 →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}