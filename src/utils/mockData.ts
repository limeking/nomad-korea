import { City } from '@/types';

export const mockCities: City[] = [
  {
    id: 'seoul',
    name: '서울',
    region: 'seoul',
    rating: 4.2,
    monthlyBudget: 2850000,
    nomadCount: 2847,
    growthRate: 15,
    livingCost: 2850000,
    housingCost: 1500000,
    transportation: 4.8,
    internet: 4.9,
    safety: 4.7,
    weather: 3.8,
    coworking: 4.8,
    tags: ['카페', '교통편의', '인프라', '문화'],
    description: '대한민국의 수도로서 최첨단 인프라와 다양한 문화 콘텐츠를 제공하는 글로벌 도시입니다.',
    highlights: ['24시간 인터넷 문화', '풍부한 카페 문화', '우수한 대중교통', '다양한 코워킹 스페이스'],
    bestMonths: ['4월', '5월', '9월', '10월'],
    timeZone: 'Asia/Seoul',
    currency: 'KRW',
    language: '한국어',
    visaRequirement: '90일 무비자 (관광목적)',
    averageTemperature: { summer: 28, winter: -2 },
    popularDistricts: ['강남구', '홍대', '이태원', '종로', '명동'],
    nearbyAttractions: ['경복궁', '남산타워', '한강공원', '동대문', '명동'],
    coworkingSpaces: [
      { name: '위워크 강남', pricePerDay: 35000, rating: 4.5 },
      { name: '스파크플러스 홍대', pricePerDay: 28000, rating: 4.3 },
      { name: '패스트파이브 종로', pricePerDay: 32000, rating: 4.4 }
    ]
  },
  {
    id: 'busan',
    name: '부산',
    region: 'busan',
    rating: 4.0,
    monthlyBudget: 1950000,
    nomadCount: 891,
    growthRate: 28,
    livingCost: 1950000,
    housingCost: 900000,
    transportation: 4.3,
    internet: 4.6,
    safety: 4.5,
    weather: 4.2,
    coworking: 4.0,
    tags: ['바다', '온화한기후', '해산물', '항구'],
    description: '바다와 산이 어우러진 아름다운 항구도시로, 온화한 기후와 합리적인 생활비가 매력적입니다.',
    highlights: ['아름다운 해변과 바다 전망', '서울 대비 저렴한 생활비', '신선한 해산물', '온화한 기후'],
    bestMonths: ['3월', '4월', '5월', '9월', '10월', '11월'],
    timeZone: 'Asia/Seoul',
    currency: 'KRW',
    language: '한국어',
    visaRequirement: '90일 무비자 (관광목적)',
    averageTemperature: { summer: 26, winter: 3 },
    popularDistricts: ['해운대', '서면', '광안리', '남포동', '기장'],
    nearbyAttractions: ['해운대해수욕장', '광안대교', '감천문화마을', '태종대', '벡스코'],
    coworkingSpaces: [
      { name: '버티컬 해운대', pricePerDay: 25000, rating: 4.2 },
      { name: '스파크플러스 서면', pricePerDay: 22000, rating: 4.0 },
      { name: '위워크 센텀시티', pricePerDay: 30000, rating: 4.3 }
    ]
  },
  {
    id: 'jeju',
    name: '제주',
    region: 'jeju',
    rating: 4.3,
    monthlyBudget: 2200000,
    nomadCount: 456,
    growthRate: 5,
    livingCost: 2200000,
    housingCost: 1100000,
    transportation: 3.2,
    internet: 4.4,
    safety: 4.8,
    weather: 4.5,
    coworking: 3.8,
    tags: ['자연', '휴양지', '청정', '관광'],
    description: '천혜의 자연환경을 자랑하는 섬으로, 워케이션의 최적지이자 힐링이 필요한 노마드들의 성지입니다.',
    highlights: ['청정한 자연환경', '온화한 기후', '독특한 섬 문화', '힐링 워케이션'],
    bestMonths: ['3월', '4월', '5월', '9월', '10월', '11월'],
    timeZone: 'Asia/Seoul',
    currency: 'KRW',
    language: '한국어',
    visaRequirement: '90일 무비자 (관광목적)',
    averageTemperature: { summer: 25, winter: 5 },
    popularDistricts: ['제주시', '서귀포', '애월', '성산', '한림'],
    nearbyAttractions: ['한라산', '성산일출봉', '만장굴', '중문관광단지', '우도'],
    coworkingSpaces: [
      { name: '제주창조경제혁신센터', pricePerDay: 20000, rating: 4.0 },
      { name: '애월 워크스페이스', pricePerDay: 18000, rating: 3.9 },
      { name: '서귀포 코워킹', pricePerDay: 22000, rating: 3.8 }
    ]
  },
  {
    id: 'gangneung',
    name: '강릉',
    region: 'gangwon',
    rating: 3.9,
    monthlyBudget: 1650000,
    nomadCount: 234,
    growthRate: 45,
    livingCost: 1650000,
    housingCost: 700000,
    transportation: 3.5,
    internet: 4.2,
    safety: 4.6,
    weather: 4.1,
    coworking: 3.5,
    tags: ['바다', '커피', '조용함', '자연'],
    description: '동해바다와 산이 만나는 아름다운 도시로, 유명한 커피 문화와 조용한 분위기가 매력적입니다.',
    highlights: ['유명한 카페 거리', '아름다운 동해바다', '조용한 작업환경', '합리적인 생활비'],
    bestMonths: ['4월', '5월', '6월', '9월', '10월'],
    timeZone: 'Asia/Seoul',
    currency: 'KRW',
    language: '한국어',
    visaRequirement: '90일 무비자 (관광목적)',
    averageTemperature: { summer: 24, winter: -1 },
    popularDistricts: ['교동', '강문해변', '안목해변', '주문진', '정동진'],
    nearbyAttractions: ['안목해변', '오죽헌', '정동진', '경포대', '주문진항'],
    coworkingSpaces: [
      { name: '안목 카페워크', pricePerDay: 15000, rating: 3.7 },
      { name: '강릉 코워킹센터', pricePerDay: 18000, rating: 3.5 },
      { name: '교동 워크라운지', pricePerDay: 16000, rating: 3.6 }
    ]
  },
  {
    id: 'daegu',
    name: '대구',
    region: 'daegu',
    rating: 3.7,
    monthlyBudget: 1750000,
    nomadCount: 312,
    growthRate: 18,
    livingCost: 1750000,
    housingCost: 800000,
    transportation: 4.1,
    internet: 4.5,
    safety: 4.4,
    weather: 3.9,
    coworking: 3.8,
    tags: ['교육', '의료', '전통', '내륙']
  },
  {
    id: 'gwangju',
    name: '광주',
    region: 'gwangju',
    rating: 3.8,
    monthlyBudget: 1680000,
    nomadCount: 198,
    growthRate: 22,
    livingCost: 1680000,
    housingCost: 750000,
    transportation: 3.9,
    internet: 4.3,
    safety: 4.5,
    weather: 4.0,
    coworking: 3.6,
    tags: ['예술', '문화', '학생도시', '음식']
  },
  {
    id: 'incheon',
    name: '인천',
    region: 'incheon',
    rating: 3.6,
    monthlyBudget: 2100000,
    nomadCount: 567,
    growthRate: 12,
    livingCost: 2100000,
    housingCost: 1100000,
    transportation: 4.4,
    internet: 4.7,
    safety: 4.2,
    weather: 3.7,
    coworking: 4.1,
    tags: ['공항', '국제', '물류', '교통']
  },
  {
    id: 'daejeon',
    name: '대전',
    region: 'daejeon',
    rating: 3.9,
    monthlyBudget: 1820000,
    nomadCount: 289,
    growthRate: 25,
    livingCost: 1820000,
    housingCost: 850000,
    transportation: 4.0,
    internet: 4.8,
    safety: 4.6,
    weather: 3.8,
    coworking: 4.2,
    tags: ['과학', '기술', '연구', '교육']
  }
];

export const getFilteredCities = (
  cities: City[],
  searchQuery: string,
  filters: {
    region?: string;
    budget?: string;
    lifestyle?: string;
    transportation?: string;
    occupation?: string;
  }
): City[] => {
  console.log('Filtering cities with:', { searchQuery, filters });
  
  const filtered = cities.filter(city => {
    // 검색어 필터링
    const matchesSearch = !searchQuery || 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // 지역 필터링 - 도시별 지역 그룹 매핑
    const getRegionGroup = (cityRegion: string) => {
      const regionMap: { [key: string]: string } = {
        'seoul': '수도권',
        'incheon': '수도권', 
        'gangwon': '강원권',
        'daejeon': '충청권',
        'daegu': '영남권',
        'busan': '영남권',
        'gwangju': '호남권',
        'jeju': '제주도'
      };
      return regionMap[cityRegion] || cityRegion;
    };
    
    const matchesRegion = !filters.region || filters.region === 'all' || 
      getRegionGroup(city.region) === filters.region;

    // 예산 필터링
    const matchesBudget = !filters.budget || filters.budget === 'all' ||
      (filters.budget === 'low' && city.monthlyBudget <= 1500000) ||
      (filters.budget === 'mid' && city.monthlyBudget > 1500000 && city.monthlyBudget <= 2500000) ||
      (filters.budget === 'high' && city.monthlyBudget > 2500000);

    // 라이프스타일 필터링
    const matchesLifestyle = !filters.lifestyle || filters.lifestyle === 'all' ||
      (filters.lifestyle === '활발한' && (city.tags.includes('카페') || city.tags.includes('문화생활'))) ||
      (filters.lifestyle === '조용한' && (city.tags.includes('자연') || city.tags.includes('깨끗한공기'))) ||
      (filters.lifestyle === '사교적' && (city.tags.includes('네트워킹') || city.tags.includes('맛집'))) ||
      (filters.lifestyle === '독립적' && (city.tags.includes('인터넷') || city.tags.includes('카페')));

    // 교통 필터링  
    const matchesTransportation = !filters.transportation || filters.transportation === 'all' ||
      (filters.transportation === '대중교통' && city.transportation >= 4.0) ||
      (filters.transportation === '자가용' && true) || // 자가용은 모든 도시에서 가능
      (filters.transportation === '도보' && city.tags.includes('교통편의')) ||
      (filters.transportation === '자전거' && city.tags.includes('자연'));

    const matches = matchesSearch && matchesRegion && matchesBudget && matchesLifestyle && matchesTransportation;
    
    if (filters.region && filters.region !== 'all') {
      console.log(`City ${city.name}: region=${city.region} -> group=${getRegionGroup(city.region)}, filter=${filters.region}, matches=${matchesRegion}`);
    }
    
    return matches;
  });
  
  console.log(`Filtered result: ${filtered.length} cities found`);
  return filtered;
};