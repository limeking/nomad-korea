import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* 간단한 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4 text-gray-600" />
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xl font-bold text-gray-900">한국노마드</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4">
        <div className="w-full max-w-md">
          {/* 메인 카드 */}
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">로그인</CardTitle>
              <CardDescription className="text-center">
                이메일과 비밀번호로 로그인하거나 새 계정을 만드세요
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    이메일
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com"
                    autoComplete="email"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    비밀번호 (최소 6자 이상)
                  </label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••"
                    autoComplete="new-password"
                    minLength={6}
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button type="submit" formAction={login} className="w-full">
                    로그인
                  </Button>
                  <Button type="submit" formAction={signup} variant="outline" className="w-full">
                    회원가입
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 통계 정보 */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>📍</span>
                <span>87개 도시</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>👥</span>
                <span>12,847명 노마드</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>⭐</span>
                <span>15,692개 리뷰</span>
              </Badge>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}