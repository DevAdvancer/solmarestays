import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, BarChart3, Calendar, Headphones, Check } from 'lucide-react';
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

const ForHomeownersPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const benefitsRef = useRef(null);
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Full Screen */}
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0">
            <motion.img
              src={homeownersHeroImage}
              alt="Coastal property"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block text-gold font-medium mb-4">For Property Owners</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Elevate Your Property.<br />
                Maximize Your Returns.
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Partner with Solmaré Stays and transform your Central Coast property into a 
                high-performing vacation rental. We handle everything—so you can enjoy the 
                returns without the work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
                <Button variant="hero-outline" size="xl" className="border-white text-white hover:bg-white hover:text-foreground" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section ref={benefitsRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-muted-foreground text-lg">
                We bring hospitality expertise, local knowledge, and meticulous attention 
                to detail to every property we manage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center mb-6 group-hover:bg-ocean/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
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
