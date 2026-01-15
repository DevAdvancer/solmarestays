import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Search, ShieldCheck, Handshake, Star } from 'lucide-react';
import aboutHeroImage from '@/assets/about-hero.jpg';
import avilaBeachImage from '@/assets/avila-beach.jpg';

const values = [
  {
    icon: Sparkles,
    title: 'Elevated Hospitality',
    description: 'We believe every stay should feel intentional, refined, and unforgettable—from the quality of the linens to the warmth of the welcome.',
  },
  {
    icon: Search,
    title: 'Attention to Detail',
    description: 'From the layout of a space to the placement of a welcome card, we obsess over the small things that create meaningful experiences.',
  },
  {
    icon: ShieldCheck,
    title: 'Immaculate Standards',
    description: "Cleanliness is non-negotiable. Our properties are maintained to the highest standards to ensure every guest feels at ease the moment they arrive.",
  },
  {
    icon: Handshake,
    title: 'Trust & Transparency',
    description: "Whether you're a guest or a homeowner, our commitment to clear communication, reliability, and professionalism is at the heart of everything we do.",
  },
];

const testimonials = [
  {
    name: 'Paul',
    date: 'March 2025',
    property: 'Coral House',
    text: "The place was decorated with top notch decor and was spotless upon arrival. The location was perfect. Just a block from the beach and close to everything. Restaurants, coffee shops, etc. would highly recommend. You won't be disappointed :)",
  },
  {
    name: 'Ashlea',
    date: 'May 2025',
    property: 'Palm House',
    text: 'Great spot for one or two people to stay in Avila Beach. Pet friendly which was a plus. Super walkable and one block from the beach. We enjoyed our stay and would definitely stay here again!',
  },
  {
    name: 'Chasity',
    date: 'Feb 2025',
    property: 'Pine House',
    text: 'Beautiful stay! 30 second walk to the beach! Super clean and plenty of amenities for a few nights. I will definitely be going back and Kyle was a great host!',
  },
];

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
}

const WhyChooseUsPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  
  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Full Screen with Image */}
        <section ref={heroRef} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <motion.img
              src={aboutHeroImage}
              alt="California Central Coast"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Refined Rentals.<br />
                Trusted Management.<br />
                <span className="text-gold">Coastal Living, Curated.</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                Welcome to Solmaré Stays, where elevated living meets the spirit of the California Coast. 
                Our story is rooted in a passion for hospitality, thoughtful design, and creating 
                unforgettable experiences.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                At Solmaré Stays, we do more than manage properties—we craft stays that inspire. 
                Every home is hand-selected for its character, comfort, and location, and every 
                detail is handled with care.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/collection">Explore Our Properties</Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-12 right-12 bg-white/95 backdrop-blur-sm text-foreground p-6 rounded-xl shadow-elevated hidden lg:block"
          >
            <span className="font-serif text-3xl font-bold block text-primary">10+</span>
            <span className="text-sm text-muted-foreground">Curated Properties</span>
          </motion.div>
        </section>

        {/* More Than a Place to Stay */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ParallaxImage
                src={avilaBeachImage}
                alt="California coastal view"
                className="aspect-[4/3] rounded-2xl shadow-elevated"
              />
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6"
                >
                  More Than a Place to Stay
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-muted-foreground italic mb-8"
                >
                  We design homes that feel like they were made for <em>you</em>. Our guests choose 
                  Solmaré for more than convenience — they come for serenity, setting, and style.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section ref={valuesRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground text-lg">
                The principles that guide every decision we make.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-card p-8 rounded-xl shadow-soft hover:shadow-elevated transition-shadow duration-300 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ocean/10 flex items-center justify-center group-hover:bg-ocean/20 transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Moments at Solmaré
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                At Solmaré Stays, we don't just offer homes — we create experiences. 
                Here's how our guests describe their time by the sea.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-xl"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-primary-foreground/20 pt-4">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-primary-foreground/60 text-sm"> · {testimonial.date}</span>
                    <p className="text-primary-foreground/60 text-sm">{testimonial.property}</p>
                  </div>
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
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Discover our curated collection of coastal properties and book your perfect escape today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Browse Properties</Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhyChooseUsPage;
