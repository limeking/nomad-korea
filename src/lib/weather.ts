// 무료 날씨 API 서비스 (OpenWeatherMap 무료 티어 사용)

import { 
  WeatherData, 
  WeatherAPIResponse, 
  CacheEntry, 
  CityCoordinates, 
  KOREAN_CITIES,
  WeatherIconType 
} from '@/types/realtime';

// 환경변수에서 API 키 가져오기 (없으면 모의 데이터 사용)
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_DURATION = 5 * 60 * 1000; // 5분 캐시

// 메모리 캐시 (실제 운영에서는 Redis 등 사용 권장)
const weatherCache = new Map<string, CacheEntry<WeatherData>>();

// OpenWeatherMap 아이콘을 우리 시스템 아이콘으로 변환
const mapWeatherIcon = (openWeatherIcon: string): WeatherIconType => {
  const iconMap: Record<string, WeatherIconType> = {
    '01d': 'sunny', '01n': 'sunny',
    '02d': 'partly_cloudy', '02n': 'partly_cloudy',
    '03d': 'cloudy', '03n': 'cloudy',
    '04d': 'cloudy', '04n': 'cloudy',
    '09d': 'rainy', '09n': 'rainy',
    '10d': 'rainy', '10n': 'rainy',
    '11d': 'stormy', '11n': 'stormy',
    '13d': 'snowy', '13n': 'snowy',
    '50d': 'foggy', '50n': 'foggy'
  };
  return iconMap[openWeatherIcon] || 'partly_cloudy';
};

// 모의 날씨 데이터 생성 (API 키가 없을 때 사용)
const generateMockWeatherData = (cityId: string): WeatherData => {
  const city = KOREAN_CITIES.find(c => c.cityId === cityId);
  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  // 계절에 따른 온도 범위 (현실적인 값)
  const now = new Date();
  const month = now.getMonth() + 1;
  let baseTemp: number;
  
  if (month >= 12 || month <= 2) { // 겨울
    baseTemp = Math.random() * 10 - 5; // -5°C ~ 5°C
  } else if (month >= 3 && month <= 5) { // 봄
    baseTemp = Math.random() * 15 + 10; // 10°C ~ 25°C
  } else if (month >= 6 && month <= 8) { // 여름
    baseTemp = Math.random() * 15 + 20; // 20°C ~ 35°C
  } else { // 가을
    baseTemp = Math.random() * 20 + 5; // 5°C ~ 25°C
  }

  const conditions = ['맑음', '구름많음', '흐림', '비', '눈'];
  const icons: WeatherIconType[] = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'snowy'];
  const randomIndex = Math.floor(Math.random() * conditions.length);

  return {
    cityId,
    cityName: city.name,
    temperature: Math.round(baseTemp),
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    description: conditions[randomIndex],
    icon: icons[randomIndex],
    windSpeed: Math.random() * 10, // 0-10 m/s
    windDirection: ['북', '북동', '동', '남동', '남', '남서', '서', '북서'][Math.floor(Math.random() * 8)],
    visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    updatedAt: new Date().toISOString()
  };
};

// 실제 OpenWeatherMap API 호출
const fetchRealWeatherData = async (cityId: string): Promise<WeatherData> => {
  const city = KOREAN_CITIES.find(c => c.cityId === cityId);
  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  if (!WEATHER_API_KEY) {
    throw new Error('Weather API key not found');
  }

  const url = `${WEATHER_BASE_URL}/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    cityId,
    cityName: city.name,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: mapWeatherIcon(data.weather[0].icon),
    windSpeed: data.wind?.speed || 0,
    windDirection: data.wind?.deg ? `${Math.round(data.wind.deg)}°` : '정보없음',
    visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
    pressure: data.main.pressure,
    updatedAt: new Date().toISOString()
  };
};

// 캐시 확인 및 관리
const getCachedWeatherData = (cityId: string): WeatherData | null => {
  const cached = weatherCache.get(cityId);
  if (!cached) return null;

  const now = Date.now();
  if (now > cached.expiryTime) {
    weatherCache.delete(cityId);
    return null;
  }

  return cached.data;
};

const setCachedWeatherData = (cityId: string, data: WeatherData): void => {
  const now = Date.now();
  weatherCache.set(cityId, {
    data,
    timestamp: now,
    expiryTime: now + CACHE_DURATION
  });

  // 캐시 크기 제한 (100개 도시)
  if (weatherCache.size > 100) {
    const oldestKey = weatherCache.keys().next().value;
    weatherCache.delete(oldestKey);
  }
};

// 메인 날씨 데이터 조회 함수
export const getWeatherData = async (cityId: string): Promise<WeatherAPIResponse> => {
  try {
    // 1. 캐시 확인
    const cachedData = getCachedWeatherData(cityId);
    if (cachedData) {
      return {
        success: true,
        data: cachedData,
        cached: true,
        cacheExpiry: new Date(Date.now() + CACHE_DURATION).toISOString()
      };
    }

    // 2. 실제 API 호출 또는 모의 데이터 사용
    let weatherData: WeatherData;
    
    if (WEATHER_API_KEY) {
      try {
        weatherData = await fetchRealWeatherData(cityId);
      } catch (error) {
        console.warn(`Real weather API failed for ${cityId}, using mock data:`, error);
        weatherData = generateMockWeatherData(cityId);
      }
    } else {
      console.info(`Using mock weather data for ${cityId} (no API key)`);
      weatherData = generateMockWeatherData(cityId);
    }

    // 3. 캐시 저장
    setCachedWeatherData(cityId, weatherData);

    return {
      success: true,
      data: weatherData,
      cached: false
    };

  } catch (error) {
    console.error(`Failed to get weather data for ${cityId}:`, error);
    
    // 에러 발생시 기본값 반환
    try {
      const mockData = generateMockWeatherData(cityId);
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

// 여러 도시의 날씨 데이터 한번에 조회
export const getMultipleWeatherData = async (cityIds: string[]): Promise<Record<string, WeatherAPIResponse>> => {
  const results: Record<string, WeatherAPIResponse> = {};
  
  // 병렬로 API 호출 (동시 요청 수 제한)
  const batchSize = 5;
  for (let i = 0; i < cityIds.length; i += batchSize) {
    const batch = cityIds.slice(i, i + batchSize);
    const batchPromises = batch.map(async (cityId) => {
      const result = await getWeatherData(cityId);
      return { cityId, result };
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ cityId, result }) => {
      results[cityId] = result;
    });

    // API 레이트 리밋 고려한 딜레이 (무료 티어)
    if (i + batchSize < cityIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
};

// 캐시 클리어 함수
export const clearWeatherCache = (): void => {
  weatherCache.clear();
};

// 캐시 상태 조회
export const getWeatherCacheStats = () => {
  return {
    size: weatherCache.size,
    entries: Array.from(weatherCache.entries()).map(([cityId, entry]) => ({
      cityId,
      cachedAt: new Date(entry.timestamp).toISOString(),
      expiresAt: new Date(entry.expiryTime).toISOString()
    }))
  };
};

// 유틸리티: 도시 좌표 조회
export const getCityCoordinates = (cityId: string): CityCoordinates | null => {
  return KOREAN_CITIES.find(city => city.cityId === cityId) || null;
};

// 유틸리티: 온도 포맷팅
export const formatTemperature = (temp: number): string => {
  return `${temp}°C`;
};

// 유틸리티: 풍속 포맷팅
export const formatWindSpeed = (speed: number): string => {
  return `${speed.toFixed(1)} m/s`;
};