import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PopularCitiesSection from '@/components/PopularCitiesSection';
import PersonalizedRecommendation from '@/components/PersonalizedRecommendation';
import CityComparison from '@/components/CityComparison';
import CommunitySection from '@/components/CommunitySection';
import AppDownloadSection from '@/components/AppDownloadSection';
import StatisticsSection from '@/components/StatisticsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PopularCitiesSection />
        <PersonalizedRecommendation />
        <CityComparison />
        <CommunitySection />
        <AppDownloadSection />
        <StatisticsSection />
      </main>
    </div>
  );
}