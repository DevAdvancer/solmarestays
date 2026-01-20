import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, BarChart3, Calendar, Headphones, Check, Star, Quote, Sparkles, Home, Camera, Wrench } from 'lucide-react';
import homeownersHeroImage from '@/assets/homeowners-hero.jpg';
import propertyHummingbird from '@/assets/property-hummingbird.jpg';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Maximize Your Revenue',
    description: 'Our dynamic pricing strategies and marketing expertise ensure your property achieves optimal occupancy and nightly rates.',
  },
  {
    icon: Shield,
    title: 'Protect Your Investment',
    description: 'We treat your home like our own—with rigorous guest screening, comprehensive insurance, and meticulous property care.',
  },
  {
    icon: Users,
    title: 'Professional Guest Management',
    description: '24/7 guest communication, seamless check-ins, and immediate response to any concerns or emergencies.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: 'Real-time dashboards and monthly statements keep you informed about your property\'s performance.',
  },
  {
    icon: Calendar,
    title: 'Flexible Owner Access',
    description: 'Use your property whenever you want. Our booking system makes it easy to block dates for personal use.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'A personal account manager who knows your property inside and out, always just a call away.',
  },
];

const services = [
  'Professional photography & listing optimization',
  'Dynamic pricing & revenue management',
  'Guest screening & communication',
  'Professional cleaning & linen service',
  'Maintenance coordination & inspections',
  'Financial reporting & tax documents',
  'Interior design consultation',
  '24/7 emergency response',
];

// Owner testimonials
const ownerReviews = [
  {
    name: 'Jane M., Owner',
    property: 'The Hummingbird | Avila Beach',
    stats: '+31% Occupancy • +42% Increase in Profit',
    rating: 5,
    text: 'Solmaré Stays has done an amazing job managing Hummingbird House. The team handles all aspects of property management for me — bookings, cleaning, refilling supplies, and troubleshooting. The whole process is hands-off for me, and I get an organized revenue summary each month.',
  },
  {
    name: 'Chad V., Owner',
    property: 'La Casita | Avila Beach',
    stats: '+22% ADR Lift • 4.9★ Rating',
    rating: 5,
    text: 'Our experience with Solmare has been exceptional. Their attentive service, transparency, and deep market insight make vacation rental ownership truly hands-off for us. They are incredibly responsive and detail-oriented, consistently going above and beyond to ensure everything runs smoothly. After previously using another local company, the difference is clear—this has been a far superior, easier, and more professional experience in every way.',
  },
  {
    name: 'Verified Owner',
    property: 'Coral House | Avila Beach',
    stats: '+18% Revenue Increase • 4.9★ Average Rating',
    rating: 5,
    text: 'I was overwhelmed by the constant turnover and guest communication. Since hiring Solmaré Stays, my calendar is full, my guests are happy, and I finally get to enjoy the income without being tied to my phone 24/7. Their systems are polished and professional.',
  },
  {
    name: 'Verified Owner',
    property: 'The Deckhouse | Avila Beach',
    stats: '+25% Annual Revenue • 1BR, 1 Bath',
    rating: 5,
    text: 'Before Solmaré, I wasn’t even considering direct bookings. Now, not only am I earning more, but I have a long-term plan that builds equity in my rental business. Their local knowledge, luxury standards, and personal touch make all the difference.',
  },
];

// Services offered (moved from Guest Experience/Services page)
const ourServicesData = [
  {
    icon: Home,
    title: 'Property Management',
    description: 'End-to-end vacation rental management including guest services, maintenance, and revenue optimization.',
  },
  {
    icon: Sparkles,
    title: 'Premium Cleaning',
    description: 'Our expert cleaning team ensures every property meets 5-star standards between every guest stay.',
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Stunning visuals that showcase your property at its best and attract premium guests.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Repairs',
    description: 'Trusted local contractors for everything from routine maintenance to emergency repairs.',
  },
];

const ForHomeownersPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const benefitsRef = useRef(null);
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Property Management for Homeowners"
        description="Partner with Solmaré Stays to maximize your rental revenue. Full-service property management for vacation homes on the Central Coast."
      />
      <Header />
      <main>
        {/* Hero Section - Full Screen */}
        {/* Hero Section - Full Screen */}
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

          {/* Content Box */}
          <div className="absolute bottom-0 left-0 w-full md:w-[600px] lg:w-[700px] bg-white pt-12 pb-10 pr-12 pl-4 md:pl-8 lg:pl-16 rounded-tr-[3rem]">
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
                Partner with Solmaré Stays and transform your Central Coast property into a
                high-performing vacation rental. We handle everything—so you can enjoy the
                returns without the work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="xl" asChild>
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid - Stacking Cards */}
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
                    Why Partner With Us?
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    We bring hospitality expertise, local knowledge, and meticulous attention
                    to detail to every property we manage. Our approach ensures your home is
                    cared for and your revenue is optimized.
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
                    className="bg-card p-8 md:p-12 rounded-3xl shadow-lg border border-border/50 sticky top-24 lg:top-32 min-h-[300px] flex flex-col justify-center"
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

        {/* Full Service */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </motion.div>
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

        {/* Owner Reviews Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                What Our Owners Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Hear from property owners who have partnered with Solmaré Stays.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ownerReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{review.property}</h3>
                    <p className="text-sm font-medium text-ocean bg-ocean/10 inline-block px-3 py-1 rounded-full">{review.stats}</p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow">
                     <p className="text-foreground leading-relaxed mb-6 font-light">
                       "{review.text}"
                     </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                        <Quote className="w-5 h-5 text-ocean" />
                      </div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services Section - Moved from Services/Guest Experience page */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive solutions for property owners and unforgettable experiences for guests.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ourServicesData.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                Let's discuss how Solmaré Stays can help you achieve your rental property goals.
                Schedule a free consultation today.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Contact Us Today</Link>
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
