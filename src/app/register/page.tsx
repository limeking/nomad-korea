'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 구현 예정
    console.log('Register attempt:', { formData, agreements });
  };

  const isFormValid = 
    formData.name && 
    formData.email && 
    formData.password && 
    formData.confirmPassword && 
    formData.password === formData.confirmPassword &&
    agreements.terms && 
    agreements.privacy;

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
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                노마드 여정을 시작하세요
              </CardTitle>
              <p className="text-gray-600 mt-2">
                한국 최고의 디지털 노마드 커뮤니티에 가입하세요
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 이름 입력 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* 이메일 입력 */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* 전화번호 입력 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 (선택)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="전화번호를 입력하세요"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    8자 이상, 영문, 숫자, 특수문자 포함
                  </p>
                </div>

                {/* 비밀번호 확인 */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호 확인
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                </div>

                {/* 약관 동의 */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={(checked) => 
                        handleAgreementChange('terms', checked as boolean)
                      }
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 leading-5">
                      <span className="text-red-500">*</span> 
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        이용약관
                      </Link>에 동의합니다
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => 
                        handleAgreementChange('privacy', checked as boolean)
                      }
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700 leading-5">
                      <span className="text-red-500">*</span> 
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        개인정보처리방침
                      </Link>에 동의합니다
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={(checked) => 
                        handleAgreementChange('marketing', checked as boolean)
                      }
                    />
                    <label htmlFor="marketing" className="text-sm text-gray-700 leading-5">
                      마케팅 정보 수신에 동의합니다 (선택)
                    </label>
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!isFormValid}
                >
                  회원가입
                </Button>
              </form>

              {/* 구분선 */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">또는</span>
                  </div>
                </div>
              </div>

              {/* 소셜 회원가입 버튼들 */}
              <div className="mt-6 space-y-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google로 회원가입
                </Button>

                <Button variant="outline" className="w-full">
                  <svg className="w-4 h-4 mr-2" fill="#03C75A" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 5.728-.896 5.728-.394 1.209-.81 1.396-1.396 1.396-.59 0-1.03-.394-1.03-1.012 0-.564.394-1.209.563-1.604.225-.506.338-.731.338-1.125 0-.45-.281-.844-.675-1.012-.281-.112-.619-.168-.956-.168-.901 0-1.649.506-2.026 1.209-.338.619-.394 1.209-.394 1.828 0 1.266.619 2.363 1.64 2.999.844.506 1.858.675 2.815.675 2.194 0 3.891-1.209 4.566-3.215.394-1.209.619-2.531.619-3.797 0-.956-.225-1.828-.675-2.531-.563-.844-1.396-1.34-2.363-1.34-1.209 0-2.25.675-2.815 1.64-.394.675-.563 1.453-.563 2.25 0 .731.169 1.396.506 1.977.394.675.956 1.125 1.64 1.125.563 0 1.069-.281 1.34-.731.225-.394.338-.844.338-1.34 0-.394-.112-.731-.281-1.012-.225-.394-.619-.619-1.012-.619-.281 0-.506.112-.675.281-.169.225-.225.506-.225.844 0 .281.056.563.169.787.112.281.281.506.506.619.169.112.394.169.619.169.506 0 .956-.281 1.209-.731.281-.506.394-1.125.394-1.743 0-.844-.281-1.64-.787-2.25-.563-.675-1.34-1.069-2.194-1.069-1.125 0-2.194.619-2.815 1.64-.563.956-.731 2.081-.731 3.215 0 1.453.394 2.815 1.125 3.891.844 1.209 2.081 1.914 3.497 1.914 1.858 0 3.553-.956 4.51-2.531.731-1.209 1.069-2.643 1.069-4.077 0-1.64-.506-3.215-1.453-4.454C17.22 1.125 14.782.338 12.338.338c-3.328 0-6.374 1.858-7.89 4.847C3.553 7.295 3.159 9.322 3.159 11.378c0 2.531.731 4.959 2.081 6.937 1.453 2.138 3.553 3.666 5.953 4.228 1.209.281 2.475.394 3.741.394 2.869 0 5.671-.956 7.752-2.7 1.914-1.64 3.328-3.891 3.891-6.374.394-1.64.506-3.328.506-4.959 0-2.025-.394-4.021-1.209-5.84C24.338 1.521 22.31.394 20.06.394c-1.858 0-3.666.731-4.959 2.025C13.69 3.553 13.128 5.298 13.128 7.07c0 1.34.394 2.643 1.125 3.722.675.956 1.64 1.64 2.7 1.858.563.112 1.125.169 1.687.169 1.209 0 2.363-.281 3.384-.844.956-.506 1.743-1.209 2.25-2.081.394-.675.619-1.453.619-2.25 0-.731-.169-1.453-.506-2.081-.394-.731-.956-1.34-1.64-1.743-.563-.338-1.209-.506-1.858-.506-.844 0-1.64.281-2.25.844-.563.506-.956 1.209-1.125 1.977-.112.563-.169 1.125-.169 1.687 0 .675.112 1.34.394 1.914.281.563.675 1.012 1.209 1.34.394.225.844.338 1.34.338.394 0 .787-.056 1.125-.225.394-.169.731-.394.956-.675.281-.338.506-.731.619-1.125.112-.506.169-1.012.169-1.519 0-.675-.112-1.34-.394-1.914-.338-.675-.844-1.209-1.453-1.519-.563-.281-1.209-.394-1.858-.394z"/>
                  </svg>
                  네이버로 회원가입
                </Button>
              </div>

              {/* 로그인 링크 */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  이미 계정이 있으신가요?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    로그인
                  </Link>
                </p>
              </div>
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