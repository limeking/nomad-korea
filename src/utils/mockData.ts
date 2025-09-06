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
    tags: ['카페', '교통편의', '인프라', '문화']
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
    tags: ['바다', '온화한기후', '해산물', '항구']
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
    tags: ['자연', '휴양지', '청정', '관광']
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
    tags: ['바다', '커피', '조용함', '자연']
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