import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { ManagementSection } from '@/components/home/ManagementSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <LocationSection />
        <PropertiesSection />
        <ManagementSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
