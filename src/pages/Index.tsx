import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { ManagementSection } from '@/components/home/ManagementSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Luxury Vacation Rentals on the Central Coast"
        description="Experience the finest vacation rentals in Avila Beach, Pismo Beach, and San Luis Obispo. Book your perfect coastal getaway with Solmaré Stays."
      />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <PropertiesSection />
        <LocationSection />
        <ExperienceSection />
        <ManagementSection />
        <ReviewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
