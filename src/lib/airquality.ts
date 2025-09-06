// 무료 대기질 API 서비스 (OpenWeatherMap Air Pollution API 사용)

import { 
  AirQualityData, 
  AirQualityAPIResponse, 
  AQILevel,
  AQI_LEVELS,
  CacheEntry, 
  CityCoordinates, 
  KOREAN_CITIES 
} from '@/types/realtime';

// 환경변수에서 API 키 가져오기 (날씨 API와 동일한 키 사용)
const AIR_QUALITY_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const AIR_QUALITY_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_DURATION = 10 * 60 * 1000; // 10분 캐시 (대기질은 더 천천히 변함)

// 메모리 캐시
const airQualityCache = new Map<string, CacheEntry<AirQualityData>>();

// AQI 계산 함수 (미국 EPA 기준)
const calculateAQI = (pm25: number): number => {
  if (pm25 <= 12.0) return Math.round((50 / 12.0) * pm25);
  if (pm25 <= 35.4) return Math.round((100 - 51) / (35.4 - 12.1) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4) return Math.round((150 - 101) / (55.4 - 35.5) * (pm25 - 35.5) + 101);
  if (pm25 <= 150.4) return Math.round((200 - 151) / (150.4 - 55.5) * (pm25 - 55.5) + 151);
  if (pm25 <= 250.4) return Math.round((300 - 201) / (250.4 - 150.5) * (pm25 - 150.5) + 201);
  return Math.round((500 - 301) / (500.4 - 250.5) * (Math.min(pm25, 500.4) - 250.5) + 301);
};

// AQI 수치를 등급으로 변환
const getAQILevel = (aqi: number): AQILevel => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy_sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very_unhealthy';
  return 'hazardous';
};

// 모의 대기질 데이터 생성 (API 키가 없을 때 사용)
const generateMockAirQualityData = (cityId: string): AirQualityData => {
  const city = KOREAN_CITIES.find(c => c.cityId === cityId);
  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  // 도시별로 다른 대기질 패턴 생성
  const cityFactors: Record<string, number> = {
    'seoul': 1.3,      // 서울: 나쁨
    'busan': 1.1,      // 부산: 보통-나쁨
    'incheon': 1.2,    // 인천: 나쁨
    'daegu': 1.1,      // 대구: 보통-나쁨
    'daejeon': 1.0,    // 대전: 보통
    'gwangju': 0.9,    // 광주: 보통
    'ulsan': 1.2,      // 울산: 나쁨 (공업도시)
    'jeju': 0.7,       // 제주: 좋음
    'suwon': 1.1,      // 수원: 보통-나쁨
    'gangneung': 0.8   // 강릉: 좋음
  };

  const factor = cityFactors[cityId] || 1.0;
  
  // 계절 및 시간 고려 (겨울, 출퇴근시간 더 나쁨)
  const now = new Date();
  const month = now.getMonth() + 1;
  const hour = now.getHours();
  
  let seasonFactor = 1.0;
  if (month >= 12 || month <= 2) seasonFactor = 1.4; // 겨울 더 나쁨
  if (month >= 3 && month <= 5) seasonFactor = 1.2; // 봄 황사
  if (month >= 6 && month <= 8) seasonFactor = 0.8; // 여름 좋음
  
  let timeFactor = 1.0;
  if ((hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 20)) {
    timeFactor = 1.3; // 출퇴근시간
  }

  // 기본 PM2.5 값 (15-80 범위)
  const basePM25 = Math.random() * 40 + 15; // 15-55
  const pm25 = Math.round(basePM25 * factor * seasonFactor * timeFactor);
  
  // PM10은 보통 PM2.5의 1.5-2배
  const pm10 = Math.round(pm25 * (1.5 + Math.random() * 0.5));
  
  const aqi = calculateAQI(pm25);
  const aqiLevel = getAQILevel(aqi);

  return {
    cityId,
    cityName: city.name,
    pm10,
    pm25,
    aqi,
    aqiLevel,
    co: Math.round((Math.random() * 2000 + 500) * factor), // 500-2500 μg/m³
    no2: Math.round((Math.random() * 100 + 20) * factor),  // 20-120 μg/m³
    o3: Math.round((Math.random() * 150 + 50) * (1/factor)), // 50-200 μg/m³ (도시일수록 적음)
    so2: Math.round((Math.random() * 50 + 10) * factor),   // 10-60 μg/m³
    updatedAt: new Date().toISOString()
  };
};

// 실제 OpenWeatherMap Air Pollution API 호출
const fetchRealAirQualityData = async (cityId: string): Promise<AirQualityData> => {
  const city = KOREAN_CITIES.find(c => c.cityId === cityId);
  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  if (!AIR_QUALITY_API_KEY) {
    throw new Error('Air Quality API key not found');
  }

  const url = `${AIR_QUALITY_BASE_URL}/air_pollution?lat=${city.latitude}&lon=${city.longitude}&appid=${AIR_QUALITY_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const pollution = data.list[0];

  // OpenWeatherMap의 components 데이터
  const pm25 = pollution.components.pm2_5;
  const pm10 = pollution.components.pm10;
  const aqi = calculateAQI(pm25);
  const aqiLevel = getAQILevel(aqi);

  return {
    cityId,
    cityName: city.name,
    pm10: Math.round(pm10),
    pm25: Math.round(pm25),
    aqi,
    aqiLevel,
    co: Math.round(pollution.components.co),
    no2: Math.round(pollution.components.no2),
    o3: Math.round(pollution.components.o3),
    so2: Math.round(pollution.components.so2),
    updatedAt: new Date().toISOString()
  };
};

// 캐시 확인 및 관리
const getCachedAirQualityData = (cityId: string): AirQualityData | null => {
  const cached = airQualityCache.get(cityId);
  if (!cached) return null;

  const now = Date.now();
  if (now > cached.expiryTime) {
    airQualityCache.delete(cityId);
    return null;
  }

  return cached.data;
};

const setCachedAirQualityData = (cityId: string, data: AirQualityData): void => {
  const now = Date.now();
  airQualityCache.set(cityId, {
    data,
    timestamp: now,
    expiryTime: now + CACHE_DURATION
  });

  // 캐시 크기 제한
  if (airQualityCache.size > 100) {
    const oldestKey = airQualityCache.keys().next().value;
    airQualityCache.delete(oldestKey);
  }
};

// 메인 대기질 데이터 조회 함수
export const getAirQualityData = async (cityId: string): Promise<AirQualityAPIResponse> => {
  try {
    // 1. 캐시 확인
    const cachedData = getCachedAirQualityData(cityId);
    if (cachedData) {
      return {
        success: true,
        data: cachedData,
        cached: true,
        cacheExpiry: new Date(Date.now() + CACHE_DURATION).toISOString()
      };
    }

    // 2. 실제 API 호출 또는 모의 데이터 사용
    let airQualityData: AirQualityData;
    
    if (AIR_QUALITY_API_KEY) {
      try {
        airQualityData = await fetchRealAirQualityData(cityId);
      } catch (error) {
        console.warn(`Real air quality API failed for ${cityId}, using mock data:`, error);
        airQualityData = generateMockAirQualityData(cityId);
      }
    } else {
      console.info(`Using mock air quality data for ${cityId} (no API key)`);
      airQualityData = generateMockAirQualityData(cityId);
    }

    // 3. 캐시 저장
    setCachedAirQualityData(cityId, airQualityData);

    return {
      success: true,
      data: airQualityData,
      cached: false
    };

  } catch (error) {
    console.error(`Failed to get air quality data for ${cityId}:`, error);
    
    // 에러 발생시 기본값 반환
    try {
      const mockData = generateMockAirQualityData(cityId);
      return {
        success: false,
        data: mockData,
        error: error instanceof Error ? error.message : 'Unknown error',
        cached: false
      };
    } catch (mockError) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

// 여러 도시의 대기질 데이터 한번에 조회
export const getMultipleAirQualityData = async (cityIds: string[]): Promise<Record<string, AirQualityAPIResponse>> => {
  const results: Record<string, AirQualityAPIResponse> = {};
  
  // 병렬로 API 호출 (동시 요청 수 제한)
  const batchSize = 3; // 대기질은 더 신중하게
  for (let i = 0; i < cityIds.length; i += batchSize) {
    const batch = cityIds.slice(i, i + batchSize);
    const batchPromises = batch.map(async (cityId) => {
      const result = await getAirQualityData(cityId);
      return { cityId, result };
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ cityId, result }) => {
      results[cityId] = result;
    });

    // API 레이트 리밋 고려한 딜레이
    if (i + batchSize < cityIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  return results;
};

// 캐시 관리 함수들
export const clearAirQualityCache = (): void => {
  airQualityCache.clear();
};

export const getAirQualityCacheStats = () => {
  return {
    size: airQualityCache.size,
    entries: Array.from(airQualityCache.entries()).map(([cityId, entry]) => ({
      cityId,
      cachedAt: new Date(entry.timestamp).toISOString(),
      expiresAt: new Date(entry.expiryTime).toISOString()
    }))
  };
};

// 유틸리티 함수들
export const getAQILevelInfo = (aqi: number) => {
  const level = getAQILevel(aqi);
  return AQI_LEVELS[level];
};

export const formatAQI = (aqi: number): string => {
  const levelInfo = getAQILevelInfo(aqi);
  return `${aqi} (${levelInfo.label})`;
};

export const getPollutionAdvice = (aqiLevel: AQILevel): string => {
  const advice: Record<AQILevel, string> = {
    good: '외출하기 좋은 날씨입니다.',
    moderate: '일반적인 실외활동 가능합니다.',
    unhealthy_sensitive: '민감군은 실외활동을 줄이세요.',
    unhealthy: '장시간 실외활동을 피하세요.',
    very_unhealthy: '실외활동을 자제하고 마스크를 착용하세요.',
    hazardous: '외출을 삼가고 실내에 머무르세요.'
  };
  return advice[aqiLevel];
};

// PM2.5 수치에 따른 마스크 착용 권장사항
export const getMaskRecommendation = (pm25: number): string => {
  if (pm25 <= 15) return '마스크 불필요';
  if (pm25 <= 35) return '민감군 마스크 권장';
  if (pm25 <= 75) return '마스크 착용 권장';
  return '마스크 필수 착용';
};