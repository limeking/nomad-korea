import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockCities } from '@/utils/mockData';
import CityDetailPage from '@/components/CityDetailPage';

interface CityPageProps {
  params: {
    cityId: string;
  };
}

export async function generateStaticParams() {
  return mockCities.map((city) => ({
    cityId: city.id,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = mockCities.find(c => c.id === params.cityId);
  
  if (!city) {
    return {
      title: '도시를 찾을 수 없습니다 | Nomad Korea',
      description: '요청하신 도시 정보를 찾을 수 없습니다.'
    };
  }

  return {
    title: `${city.name} 노마드 가이드 | Nomad Korea`,
    description: city.description || `${city.name}에서의 디지털 노마드 생활 정보와 리뷰를 확인해보세요. 생활비, 코워킹 스페이스, 안전도 등 실용적인 정보를 제공합니다.`,
    openGraph: {
      title: `${city.name} - 디지털 노마드 가이드`,
      description: city.description,
      images: city.image ? [city.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${city.name} 노마드 가이드`,
      description: city.description,
    }
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = mockCities.find(c => c.id === params.cityId);

  if (!city) {
    notFound();
  }

  return <CityDetailPage city={city} />;
}