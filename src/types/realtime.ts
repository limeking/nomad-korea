// 실시간 데이터를 위한 TypeScript 타입 정의

// 날씨 관련 타입
export interface WeatherData {
  cityId: string;
  cityName: string;
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  updatedAt: string;
}

// 대기질 관련 타입
export interface AirQualityData {
  cityId: string;
  cityName: string;
  pm10: number;
  pm25: number;
  aqi: number;
  aqiLevel: AQILevel;
  co: number;
  no2: number;
  o3: number;
  so2: number;
  updatedAt: string;
}

// 대기질 등급
export type AQILevel = 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous';

// 대기질 등급별 한국어 라벨
export interface AQILevelInfo {
  level: AQILevel;
  label: string;
  color: string;
  description: string;
}

// 통합 실시간 데이터
export interface RealtimeData {
  cityId: string;
  cityName: string;
  weather: WeatherData;
  airQuality: AirQualityData;
  lastUpdated: string;
}

// API 응답 타입들
export interface WeatherAPIResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
  cached?: boolean;
  cacheExpiry?: string;
}

export interface AirQualityAPIResponse {
  success: boolean;
  data?: AirQualityData;
  error?: string;
  cached?: boolean;
  cacheExpiry?: string;
}

// 캐시 관련 타입
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiryTime: number;
}

export interface CacheConfig {
  weatherCacheDuration: number; // 분 단위
  airQualityCacheDuration: number; // 분 단위
  maxCacheSize: number;
}

// 에러 타입
export interface RealtimeAPIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// API 설정 타입
export interface APIConfig {
  weatherAPI: {
    baseUrl: string;
    apiKey?: string;
    timeout: number;
  };
  airQualityAPI: {
    baseUrl: string;
    apiKey?: string;
    timeout: number;
  };
  cache: CacheConfig;
}

// 한국 주요 도시 좌표 (위경도)
export interface CityCoordinates {
  cityId: string;
  name: string;
  latitude: number;
  longitude: number;
  region: string;
}

// 날씨 아이콘 매핑
export type WeatherIconType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy' | 'partly_cloudy';

// 대기질 등급별 색상 및 정보 상수
export const AQI_LEVELS: Record<AQILevel, AQILevelInfo> = {
  good: {
    level: 'good',
    label: '좋음',
    color: '#00d4aa',
    description: '대기오염 관련 질환자군에서도 영향이 유발되지 않을 수준'
  },
  moderate: {
    level: 'moderate',
    label: '보통',
    color: '#ffb347',
    description: '환경기준 이하로 평소와 같이 실외활동 가능'
  },
  unhealthy_sensitive: {
    level: 'unhealthy_sensitive',
    label: '나쁨',
    color: '#ff6b35',
    description: '민감군에게 유해한 수준'
  },
  unhealthy: {
    level: 'unhealthy',
    label: '상당히 나쁨',
    color: '#ff4757',
    description: '일반인에게도 유해한 수준'
  },
  very_unhealthy: {
    level: 'very_unhealthy',
    label: '매우 나쁨',
    color: '#8b00ff',
    description: '외출 및 실외활동 자제 권고'
  },
  hazardous: {
    level: 'hazardous',
    label: '위험',
    color: '#7d4cdb',
    description: '외출 및 모든 실외활동 중단 권고'
  }
};

// 한국 주요 도시 좌표 데이터
export const KOREAN_CITIES: CityCoordinates[] = [
  { cityId: 'seoul', name: '서울', latitude: 37.5665, longitude: 126.9780, region: 'seoul' },
  { cityId: 'busan', name: '부산', latitude: 35.1796, longitude: 129.0756, region: 'busan' },
  { cityId: 'incheon', name: '인천', latitude: 37.4563, longitude: 126.7052, region: 'incheon' },
  { cityId: 'daegu', name: '대구', latitude: 35.8714, longitude: 128.6014, region: 'daegu' },
  { cityId: 'daejeon', name: '대전', latitude: 36.3504, longitude: 127.3845, region: 'daejeon' },
  { cityId: 'gwangju', name: '광주', latitude: 35.1595, longitude: 126.8526, region: 'gwangju' },
  { cityId: 'ulsan', name: '울산', latitude: 35.5384, longitude: 129.3114, region: 'ulsan' },
  { cityId: 'jeju', name: '제주', latitude: 33.4996, longitude: 126.5312, region: 'jeju' },
  { cityId: 'suwon', name: '수원', latitude: 37.2636, longitude: 127.0286, region: 'gyeonggi' },
  { cityId: 'gangneung', name: '강릉', latitude: 37.7519, longitude: 128.8761, region: 'gangwon' }
];

// 유틸리티 함수들을 위한 타입
export interface WeatherUtils {
  getAQILevel: (aqi: number) => AQILevel;
  getWeatherIcon: (condition: string) => WeatherIconType;
  formatTemperature: (temp: number) => string;
  getCityCoordinates: (cityId: string) => CityCoordinates | null;
}