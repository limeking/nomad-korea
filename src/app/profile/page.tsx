'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, MapPin, Briefcase, Settings, Save } from 'lucide-react';
import Header from '@/components/Header';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    budget: user?.preferences?.budget || 2000000,
    preferredRegions: user?.preferences?.preferredRegions || [],
    lifestyle: user?.preferences?.lifestyle || '',
    occupation: user?.preferences?.occupation || '',
    transportation: user?.preferences?.transportation || '',
    priorities: user?.preferences?.priorities || []
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        preferences: {
          budget: formData.budget,
          preferredRegions: formData.preferredRegions,
          lifestyle: formData.lifestyle,
          occupation: formData.occupation,
          transportation: formData.transportation,
          priorities: formData.priorities
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      budget: user?.preferences?.budget || 2000000,
      preferredRegions: user?.preferences?.preferredRegions || [],
      lifestyle: user?.preferences?.lifestyle || '',
      occupation: user?.preferences?.occupation || '',
      transportation: user?.preferences?.transportation || '',
      priorities: user?.preferences?.priorities || []
    });
    setIsEditing(false);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-4xl mb-4">👤</div>
            <p className="text-gray-600">프로필을 로딩 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">프로필 설정</h1>
              <p className="text-gray-600 mt-2">개인정보와 선호도를 관리하세요</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Settings className="h-4 w-4 mr-2" />
                편집하기
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  취소
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? '저장 중...' : '저장'}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    {isEditing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="이름을 입력하세요"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="이메일을 입력하세요"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">월 예산</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                        placeholder="월 예산 (원)"
                      />
                      <span className="text-gray-500">원</span>
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {user.preferences?.budget?.toLocaleString() || '미설정'}원
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  선호 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">직업</label>
                    {isEditing ? (
                      <select
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">선택하세요</option>
                        <option value="개발자">개발자</option>
                        <option value="디자이너">디자이너</option>
                        <option value="마케터">마케터</option>
                        <option value="기획자">기획자</option>
                        <option value="프리랜서">프리랜서</option>
                        <option value="기타">기타</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium">{user.preferences?.occupation || '미설정'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">라이프스타일</label>
                    {isEditing ? (
                      <select
                        value={formData.lifestyle}
                        onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">선택하세요</option>
                        <option value="활발한">활발한</option>
                        <option value="조용한">조용한</option>
                        <option value="사교적">사교적</option>
                        <option value="독립적">독립적</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium">{user.preferences?.lifestyle || '미설정'}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">교통 수단</label>
                  {isEditing ? (
                    <select
                      value={formData.transportation}
                      onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">선택하세요</option>
                      <option value="대중교통">대중교통</option>
                      <option value="자가용">자가용</option>
                      <option value="도보">도보</option>
                      <option value="자전거">자전거</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.preferences?.transportation || '미설정'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  계정 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">가입일</p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">최근 로그인</p>
                    <p className="font-medium">
                      {new Date(user.lastLoginAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Preferences Summary */}
            <Card>
              <CardHeader>
                <CardTitle>선호도 요약</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">선호 지역</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.preferences?.preferredRegions?.length ? 
                        user.preferences.preferredRegions.map((region, idx) => (
                          <Badge key={idx} variant="secondary">{region}</Badge>
                        )) : 
                        <p className="text-gray-500 text-sm">미설정</p>
                      }
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">우선순위</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.preferences?.priorities?.length ? 
                        user.preferences.priorities.map((priority, idx) => (
                          <Badge key={idx} variant="outline">{priority}</Badge>
                        )) : 
                        <p className="text-gray-500 text-sm">미설정</p>
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}