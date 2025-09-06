# 🤖 CLAUDE.md - 노마드 코리아 프로젝트 개발 가이드

## 📋 프로젝트 개요

**프로젝트명**: Nomad Korea - 한국 노마드 도시 평가 플랫폼  
**현재 URL**: http://localhost:3002  
**기술 스택**: Next.js 15.5.2, React, TypeScript, Tailwind CSS 4, Turbopack  
**목적**: 디지털 노마드들이 한국 도시별 생활 조건을 비교하고 선택할 수 있는 플랫폼

## 🗂️ 프로젝트 구조

```
nomad-korea/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind 글로벌 스타일
│   │   ├── layout.tsx           # Geist 폰트가 적용된 루트 레이아웃
│   │   └── page.tsx             # 메인 홈페이지
│   ├── components/
│   │   ├── ui/                  # Shadcn UI 컴포넌트들
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   └── select.tsx
│   │   ├── Header.tsx           # 네비게이션 헤더
│   │   ├── HeroSection.tsx      # 검색 기능이 있는 히어로 섹션
│   │   ├── PopularCitiesSection.tsx    # 인기 도시 카드들
│   │   ├── PersonalizedRecommendation.tsx  # 개인화 추천
│   │   ├── CityComparison.tsx   # 도시 비교 테이블
│   │   ├── CommunitySection.tsx # 커뮤니티 게시글
│   │   ├── AppDownloadSection.tsx  # 모바일 앱 홍보
│   │   └── StatisticsSection.tsx   # 플랫폼 통계
│   ├── types/
│   │   └── index.ts             # TypeScript 타입 정의
│   └── lib/
│       └── utils.ts             # 유틸리티 함수들
├── PRD.md                       # 제품 요구사항 문서
├── CLAUDE.md                    # 이 개발 가이드
└── README.md                    # 기본 프로젝트 정보
```

## 🎯 현재 구현 상태 (PRD 대비)

### ✅ **완료된 섹션들** (Phase 1 MVP)

1. **히어로 섹션** ✅
   - 위치: `src/components/HeroSection.tsx`
   - 기능: 메인 헤드라인, 통계 배지, 검색 인터페이스, 필터
   - 상태: **100% 완료** - PRD 명세와 정확히 일치

2. **인기 도시 섹션** ✅  
   - 위치: `src/components/PopularCitiesSection.tsx`
   - 기능: 평점, 비용, 노마드 수가 포함된 4개 도시 카드
   - 상태: **95% 완료** - 성장률 지표 누락

3. **헤더 네비게이션** ✅
   - 위치: `src/components/Header.tsx` 
   - 기능: 브랜드 로고, 검색, 네비게이션 링크
   - 상태: **90% 완료** - 기본 기능 구현됨

4. **모바일 반응형** ✅
   - 모든 컴포넌트에 Tailwind 반응형 클래스 사용
   - 상태: **90% 완료** - 반응형 디자인 구현됨

5. **커뮤니티 섹션** ✅
   - 위치: `src/components/CommunitySection.tsx`
   - 기능: 최근 게시글, 사용자 프로필, 상호작용
   - 상태: **85% 완료** - 정적 콘텐츠, 동적 데이터 필요

6. **도시 비교** ✅
   - 위치: `src/components/CityComparison.tsx`
   - 기능: 나란히 비교하는 테이블
   - 상태: **80% 완료** - 테이블 구조 존재

7. **앱 다운로드 섹션** ✅
   - 위치: `src/components/AppDownloadSection.tsx`
   - 기능: 모바일 앱 홍보
   - 상태: **80% 완료** - 기본 구조 존재

8. **통계 대시보드** ✅
   - 위치: `src/components/StatisticsSection.tsx`
   - 기능: 플랫폼 메트릭 표시
   - 상태: **80% 완료** - 기본 메트릭 표시됨

### 🚧 **누락/미완성 기능들**

1. **동적 데이터 연동** 
   - 현재: 컴포넌트에 정적 목 데이터
   - 필요: API 연동, 데이터베이스 연결

2. **검색 기능**
   - 현재: UI만 있고 검색 로직 없음
   - 필요: 검색 알고리즘 구현

3. **고급 필터링**
   - 현재: 기본 선택 드롭다운만
   - 필요: 다차원 필터링 로직

4. **사용자 인증**
   - 현재: UI 플레이스홀더만
   - 필요: 로그인/회원가입 기능

5. **실시간 데이터**
   - 현재: 정적 숫자들
   - 필요: 실시간 날씨, 인터넷 속도 등

## 🛠️ 개발 명령어

```bash
# 개발
npm run dev              # 개발 서버 시작 (포트 3000/3002)
npm run build           # 프로덕션 빌드
npm run start           # 프로덕션 서버 시작
npm run lint           # ESLint 실행

# 테마 개발 (필요시)
git worktree add theme-name -b theme-name master
cd theme-name
npm run dev -- --port 4001
```

## 🎨 디자인 시스템

### 색상 (Tailwind 클래스)
- **주색상**: `blue-600`, `blue-50` (신뢰, 안정성)
- **보조색상**: `green-600`, `green-50` (성장, 자연)
- **강조색**: `orange-500` (에너지, 액션)
- **중성색**: `gray-900`, `gray-600`, `gray-100`

### 타이포그래피
- **폰트**: Geist Sans (--font-geist-sans)
- **제목**: `font-bold`, `text-lg`부터 `text-6xl`까지
- **본문**: `font-normal`, `text-sm`부터 `text-base`까지

### 컴포넌트
- **카드**: `shadow-lg`, `rounded-lg`, `border`와 호버 효과
- **버튼**: Shadcn UI 변형들 (default, secondary, outline)
- **배지**: 상태와 카테고리를 위한 컬러 표시기
- **아이콘**: 전체적으로 Lucide React 아이콘 사용

## 📊 주요 데이터 구조

```typescript
// src/types/index.ts
interface City {
  id: string;
  name: string;
  emoji: string;
  rating: number;
  monthlyCost: number;
  nomadCount: number;
  growthRate: number;
  tags: string[];
  image?: string;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  location: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
}
```

## 🚀 우선순위 개발 작업

### **Phase 1 개선사항** (앞으로 2주)
1. 도시 카드에 성장률 지표 추가
2. 기본 검색 기능 구현  
3. 통계에 동적 데이터 연결
4. 모바일 반응형 디자인 개선
5. 로딩 상태 및 에러 처리 추가

### **Phase 2 기능들** (이후 4주)
1. 사용자 인증 시스템
2. 여러 조건을 가진 고급 필터링
3. 도시 비교 기능
4. 실제 커뮤니티 통합
5. 개인화 알고리즘 기초

### **Phase 3 확장** (이후 6주)  
1. 실시간 데이터 통합
2. 고도화된 개인화
3. 모바일 앱 통합
4. 성능 최적화
5. SEO 및 분석 설정

## 🐛 알려진 이슈 & 기술 부채

1. **정적 데이터**: 모든 컴포넌트가 하드코딩된 데이터 사용
2. **에러 처리 없음**: 에러 바운더리와 로딩 상태 누락
3. **검색 플레이스홀더**: 검색 UI는 있지만 기능 없음
4. **타입 안전성**: 일부 컴포넌트에 더 나은 TypeScript 타이핑 필요
5. **성능**: 이미지 최적화나 지연 로딩 없음
6. **SEO**: 메타 태그와 구조화된 데이터 누락

## 📝 개발 가이드라인

### 코드 스타일
- 모든 새 컴포넌트에 TypeScript 사용
- React 함수형 컴포넌트 패턴 따르기
- 커스텀 CSS보다 Tailwind 클래스 사용
- 적절한 에러 바운더리 구현
- 모든 비동기 작업에 로딩 상태 추가

### 컴포넌트 구조
```typescript
// 새 컴포넌트 템플릿
interface ComponentProps {
  // TypeScript로 props 정의
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 컴포넌트 로직
  
  return (
    <section className="tailwind-classes">
      {/* 컴포넌트 JSX */}
    </section>
  );
}
```

### 파일 명명
- 컴포넌트: PascalCase (`HeroSection.tsx`)
- 유틸리티: camelCase (`utils.ts`)
- 타입: 설명적 인터페이스 (`City`, `CommunityPost`)

## 🔧 빠른 수정 & 일반 작업

### 새 도시 추가하기
```typescript
// PopularCitiesSection.tsx에서
const newCity: City = {
  id: 'unique-id',
  name: '도시명',
  emoji: '🏙️',
  rating: 4.2,
  monthlyCost: 2500000,
  nomadCount: 150,
  growthRate: 12,
  tags: ['카페', '교통편의']
};
```

### 통계 업데이트
```typescript
// StatisticsSection.tsx에서
const stats = {
  totalCities: 87,
  totalNomads: 12847,
  averageRating: 4.2,
  averageCost: 2100000,
  growthRate: 15
};
```

### 새 필터 추가하기
```typescript
// HeroSection.tsx에서 - 필터 옵션에 추가
<SelectItem value="new-filter">새 필터</SelectItem>
```

## 📚 추가 자료

- **PRD**: 완전한 제품 요구사항은 `PRD.md` 참조
- **디자인**: Figma 디자인 (링크 추가 예정)
- **API 문서**: API 문서 (생성 예정)
- **테스팅**: 테스트 가이드라인 (수립 예정)

## 🤝 기여하기

1. 먼저 PRD.md 읽기
2. 위의 현재 구현 상태 확인
3. master에서 기능 브랜치 생성
4. TypeScript와 Tailwind 컨벤션 따르기
5. 여러 기기에서 반응형 디자인 테스트
6. 새 기능 추가시 이 CLAUDE.md 업데이트

---

**현재 상태**: Phase 1 MVP (85% 완료)  
**다음 마일스톤**: Phase 1 완료, Phase 2 기능 시작  
**최종 업데이트**: 2025-09-04

이 가이드가 모든 개발자(Claude 포함)가 프로젝트 구조를 이해하고 효과적으로 개발을 이어갈 수 있도록 도움이 되길 바랍니다! 🚀