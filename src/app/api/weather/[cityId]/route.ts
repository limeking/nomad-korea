// 날씨 API Route Handler
import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather';

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

    // 날씨 데이터 조회
    const weatherResponse = await getWeatherData(cityId);

    // CORS 헤더 설정
    const response = NextResponse.json(weatherResponse);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

  } catch (error) {
    console.error(`Weather API route error for ${params.cityId}:`, error);
    
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