import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Home, Camera, Wrench, UtensilsCrossed, Wine, Bike } from 'lucide-react';
import servicesHeroImage from '@/assets/services-hero.jpg';

const coreServices = [
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

const localPartners = [
  {
    icon: Wine,
    category: 'Wine & Dining',
    partners: ['Tolosa Winery', 'Claiborne & Churchill', 'The Spoon Trade', 'Luna Red'],
  },
  {
    icon: UtensilsCrossed,
    category: 'Restaurants',
    partners: ['Custom House', 'Ventana Grill', 'Mersea\'s', 'Avila Beach Fish & Farmers Market'],
  },
  {
    icon: Bike,
    category: 'Activities',
    partners: ['Central Coast Kayaks', 'Bob Jones Trail Bikes', 'Avila Beach Paddlesports', 'Point San Luis Lighthouse'],
  },
];

const ServicesPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  
  const partnersRef = useRef(null);
  const isPartnersInView = useInView(partnersRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Full Screen */}
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0">
            <motion.img
              src={servicesHeroImage}
              alt="Professional service"
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
              <span className="inline-block text-gold font-medium mb-4">Services & Partners</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Excellence in Every Detail
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                From immaculate cleaning to curated local experiences, we partner with the 
                best to deliver exceptional stays for every guest.
              </p>
              <Button variant="hero" size="xl" className="bg-white text-foreground hover:bg-white/90" asChild>
                <Link to="/contact">Work With Us</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Core Services */}
        <section ref={servicesRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
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
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
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

        {/* Local Partners */}
        <section ref={partnersRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPartnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Local Partners
              </h2>
              <p className="text-muted-foreground text-lg">
                We've built relationships with the best local businesses to enhance your 
                Central Coast experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localPartners.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isPartnersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-card p-8 rounded-xl shadow-soft"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-ocean" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.partners.map((partner, pIndex) => (
                      <motion.li
                        key={pIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isPartnersInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + pIndex * 0.1 }}
                        className="text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-ocean" />
                        {partner}
                      </motion.li>
                    ))}
                  </ul>
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
                Interested in Partnering?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're always looking to connect with local businesses that share our commitment 
                to quality and exceptional experiences.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
