// 통합 실시간 데이터 API Route Handler (날씨 + 대기질)
import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather';
import { getAirQualityData } from '@/lib/airquality';
import { RealtimeData } from '@/types/realtime';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cityId: string }> }
) {
  try {
    const { cityId } = await params;
    
    // 도시 ID 검증
    if (!cityId || typeof cityId !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid city ID' 
        },
        { status: 400 }
      );
    }

    // 병렬로 날씨와 대기질 데이터 조회
    const [weatherResponse, airQualityResponse] = await Promise.all([
      getWeatherData(cityId),
      getAirQualityData(cityId)
    ]);

    // 응답 데이터 구성
    if (weatherResponse.success && airQualityResponse.success && 
        weatherResponse.data && airQualityResponse.data) {
      
      const realtimeData: RealtimeData = {
        cityId,
        cityName: weatherResponse.data.cityName,
        weather: weatherResponse.data,
        airQuality: airQualityResponse.data,
        lastUpdated: new Date().toISOString()
      };

      const response = NextResponse.json({
        success: true,
        data: realtimeData,
        cached: {
          weather: weatherResponse.cached || false,
          airQuality: airQualityResponse.cached || false
        }
      });

      // CORS 헤더 설정
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

      return response;
    }

    // 부분적 실패 처리
    return NextResponse.json({
      success: false,
      data: {
        weather: weatherResponse.data || null,
        airQuality: airQualityResponse.data || null
      },
      errors: {
        weather: weatherResponse.error,
        airQuality: airQualityResponse.error
      }
    }, { status: 206 }); // Partial Content

  } catch (error) {
    console.error(`Realtime API route error for ${params.cityId}:`, error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Preflight 요청 처리
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}