import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { ManagementSection } from '@/components/home/ManagementSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery } from '@/lib/sanityQueries';

const Index = () => {
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await sanityClient.fetch(homePageQuery);
        setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      }
    };
    fetchHome();
  }, []);

  const sections = homeData?.sections || [];
  const heroData = sections.find((s: any) => s._type === 'heroSection');
  const statsData = sections.find((s: any) => s._type === 'statsSection');
  const managementData = sections.find((s: any) => s._type === 'featureGrid' && s.heading?.includes('STANDARD'));
  const locationData = sections.find((s: any) => s._type === 'locationsSection');
  const reviewsData = sections.find((s: any) => s._type === 'reviewsSection');
  const partnersData = sections.find((s: any) => s._type === 'partnersSection');
  const ctaData = sections.find((s: any) => s._type === 'ctaSection');

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Solmare Stays"
        description="Experience the finest vacation rentals in Avila Beach, Pismo Beach, and San Luis Obispo. Book your perfect coastal getaway with Solmaré Stays."
      />
      <Header />
      <main>
        <HeroSection data={heroData} />
        <StatsSection data={statsData} />
        <PropertiesSection />
        <LocationSection data={locationData} />
        <ManagementSection data={managementData} />
        <ReviewsSection data={reviewsData} />
        {/* <ExperienceSection data={partnersData} /> */}
        <CTASection data={ctaData} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
