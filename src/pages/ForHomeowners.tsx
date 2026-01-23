import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, BarChart3, Calendar, Headphones, Check, Star, Quote } from 'lucide-react';
import homeownersHeroImage from '/homeowners/drone.jpg';
import propertyHummingbird from '/homeowners/ipad.jpg';

// 6 Pillars - Sharpened Copy
const benefits = [
  {
    icon: TrendingUp,
    title: 'Maximize Your Revenue',
    description: 'Dynamic pricing algorithms and direct-booking strategies designed to outperform the market average.',
  },
  {
    icon: Shield,
    title: 'Protect Your Investment',
    description: 'Strict guest screening and video-verified inspections after every stay ensure your home stays pristine.',
  },
  {
    icon: Users,
    title: 'Professional Guest Management',
    description: 'From inquiry to checkout, we handle 100% of guest communications with 24/7 local support.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: "Real-time access to your financial performance and calendar. No hidden fees, no confusing statements.",
  },
  {
    icon: Calendar,
    title: 'Flexible Owner Access',
    description: "It's your home. Block dates for personal use whenever you want without penalty or hassle.",
  },
  {
    icon: Headphones,
    title: 'Dedicated Local Support',
    description: 'No call centers. You get direct access to our local team who knows your property inside and out.',
  },
];

// Owner testimonials - 3 cards as specified
const ownerReviews = [
  {
    name: 'Chad V., Owner',
    property: 'La Casita | Avila Beach',
    stats: ['+22% ADR Lift', '4.9★ Rating'],
    rating: 5,
    text: 'Our experience with Solmare has been exceptional. Their attentive service, transparency, and deep market insight make vacation rental ownership truly hands-off for us. They are incredibly responsive and detail-oriented, consistently going above and beyond to ensure everything runs smoothly. After previously using another local company, the difference is clear—this has been a far superior, easier, and more professional experience in every way.',
  },
  {
    name: 'Jane M., Owner',
    property: 'The Hummingbird | Avila Beach',
    stats: ['+31% Occupancy', '+42% Profit Increase'],
    rating: 5,
    text: 'Solmaré Stays has done an amazing job managing Hummingbird House. The team handles all aspects of property management for me — bookings, cleaning, refilling supplies, and troubleshooting. The whole process is hands-off for me, and I get an organized revenue summary each month.',
  },
  {
    name: 'Monterey Heights Owner',
    property: 'Monterey Heights | San Luis Obispo',
    stats: ['+32% Revenue Growth', '+48% Guest Satisfaction'],
    rating: 5,
    text: "Switching to Solmaré was a game-changer for my property. Unlike my previous manager, the transparency here is unmatched—I finally know exactly how my home is performing and where every dollar goes. There is no 'black box,' just clear communication and significantly higher returns. Hands down the best management team on the Central Coast.",
  },
];

// Comprehensive Services - 5 Columns
const serviceCategories = [
  {
    title: 'Listing & Marketing',
    items: [
      'Professional photography coordination',
      'Listing creation and optimization',
      'Multi-platform distribution (Airbnb, Vrbo, Direct)',
      'Ongoing listing updates',
    ],
  },
  {
    title: 'Pricing & Revenue',
    items: [
      'Dynamic pricing adjustments',
      'Seasonal strategy',
      'Length-of-stay optimization',
      'Tax collection and remittance',
    ],
  },
  {
    title: 'Guest Management',
    items: [
      'Strict guest screening',
      '24/7 guest communication',
      'Check-in/out coordination',
      'Concierge support',
    ],
  },
  {
    title: 'Cleaning & Maintenance',
    items: [
      'Professional cleaning coordination',
      'Linen and laundry management',
      'Pre-arrival inspections',
      'Routine maintenance coordination',
    ],
  },
  {
    title: 'Owner Reporting',
    items: [
      'Monthly financial statements',
      'Real-time calendar visibility',
      'Owner portal access',
    ],
  },
];

const ForHomeownersPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const benefitsRef = useRef(null);
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Property Management for Homeowners"
        description="Partner with Solmaré Stays to maximize your rental revenue. Full-service property management for vacation homes on the Central Coast."
      />
      <Header />
      <main>
        {/* SECTION 1: Hero */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={homeownersHeroImage}
              alt="Coastal property"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-20 md:left-20 w-[calc(100%-3rem)] md:w-[600px] lg:w-[700px] bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="inline-block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">For Property Owners</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground mb-6">
                Elevate Your Property.<br />
                Maximize Your Returns.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Boutique management designed for high yields and asset protection. Experience the difference of owner-first stewardship on the Central Coast.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="xl" asChild>
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 & 3: Why Partner + Value Cards */}
        <section ref={benefitsRef} className="section-padding bg-secondary relative">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

              {/* Left Content - Sticky */}
              <div className="lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
                    Why Partner With Solmaré?
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    We treat your home as a high-performing asset, not just inventory. By combining local stewardship with sophisticated revenue strategies, we deliver higher net income and better property care than large, impersonal management firms.
                  </p>
                  <Button variant="default" size="lg" asChild className="rounded-full">
                    <Link to="/contact">Schedule a Consultation</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right Benefits - Stacking Cards */}
              <div className="relative flex flex-col gap-8 pb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-card p-8 md:p-12 rounded-3xl shadow-lg border border-border/50 sticky top-24 lg:top-32 min-h-[280px] flex flex-col justify-center"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center shrink-0">
                        <benefit.icon className="w-7 h-7 text-ocean" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Owner Reviews - MOVED UP */}
        <section ref={testimonialsRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Real Results
              </h2>
              <p className="text-muted-foreground text-lg">
                Hear from property owners who have partnered with Solmaré Stays.
              </p>
            </motion.div>

            {/* 3 Cards Horizontally */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ownerReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{review.property}</h3>
                    {/* Blue Data Badges */}
                    <div className="flex flex-wrap gap-2">
                      {review.stats.map((stat, i) => (
                        <span key={i} className="text-xs font-medium text-ocean bg-ocean/10 px-3 py-1 rounded-full">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow">
                    <p className="text-foreground text-sm leading-relaxed mb-6 font-light">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                        <Quote className="w-5 h-5 text-ocean" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Comprehensive Management - Detailed Bullet List */}
        <section ref={servicesRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                COMPREHENSIVE MANAGEMENT
              </h2>
              <p className="text-muted-foreground text-lg">
                We handle every operational detail required to run a successful short-term rental.
              </p>
            </motion.div>

            {/* 5-Column Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-soft"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-ocean flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Full Service Visual Summary */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                  Full-Service Management
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  From listing creation to guest checkout, we handle every aspect of your
                  vacation rental business. Our comprehensive approach ensures nothing falls
                  through the cracks.
                </p>
                <div className="space-y-3">
                  {[
                    'Professional photography & listing optimization',
                    'Dynamic pricing & revenue management',
                    'Guest screening & 24/7 communication',
                    'Professional cleaning & linen service',
                    'Maintenance coordination & inspections',
                    'Financial reporting & tax documents',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-primary-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={propertyHummingbird}
                  alt="Beautifully managed property"
                  className="rounded-2xl shadow-elevated"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Final CTA */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                See how much your home could be earning with Solmaré.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Get My Revenue Projection</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForHomeownersPage;
