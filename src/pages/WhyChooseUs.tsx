import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, MapPin, Clock, BadgeCheck, Smartphone, Star, MessageCircle } from 'lucide-react';
import aboutHeroImage from '/about-us/outside-chair.jpg';
// import avilaBeachImage from '/about-us/avila-beach.jpg';

// Core Values - Addressing top 3 guest fears
const values = [
  {
    icon: Sparkles,
    title: 'Curated Comfort',
    description: 'From Parachute linens to locally sourced welcome baskets, every detail is hand-selected to make you feel spoiled the moment you walk through the door.',
  },
  {
    icon: ShieldCheck,
    title: 'The 50-Point Clean',
    description: "We don't just 'clean.' We inspect. Every home undergoes a rigorous 50-point video inspection before your arrival to guarantee it is spotless and staged to perfection.",
  },
  {
    icon: MapPin,
    title: 'Your Local Concierge',
    description: "We live here. Whether you need a reservation at the best winery or a secret beach recommendation, our team is your boots-on-the-ground guide to the Central Coast.",
  },
];

// Seamless Service features
const seamlessFeatures = [
  {
    icon: Clock,
    title: '24/7 Instant Response',
    description: "We are always just a text away. Whether it's a late-night check-in question or a morning coffee recommendation, you get instant answers when you need them most.",
  },
  {
    icon: BadgeCheck,
    title: 'Best Rate Guarantee',
    description: "We monitor local market rates daily to ensure our direct-booking prices are always fair, competitive, and free from the hidden service fees found on big listing sites.",
  },
  {
    icon: Smartphone,
    title: 'Frictionless Check-In',
    description: "No keys to lose or meetups to coordinate. Enjoy a smooth arrival with your own unique smart-lock code, plus unobtrusive tech that keeps your stay safe and secure.",
  },
];

const testimonials = [
  {
    name: 'Paul',
    property: 'Coral House',
    text: "The place was decorated with top notch decor and was spotless upon arrival. The location was perfect. Just a block from the beach and close to everything. Restaurants, coffee shops, etc. would highly recommend. You won't be disappointed :)",
    platform: 'Airbnb',
  },
  {
    name: 'Ashlea',
    property: 'Palm House',
    text: 'Great spot for one or two people to stay in Avila Beach. Pet friendly which was a plus. Super walkable and one block from the beach. We enjoyed our stay and would definitely stay here again!',
    platform: 'Airbnb',
  },
  {
    name: 'Chasity',
    property: 'Pine House',
    text: 'Beautiful stay! 30 second walk to the beach! Super clean and plenty of amenities for a few nights. I will definitely be going back and Kyle was a great host!',
    platform: 'Vrbo',
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

  const seamlessRef = useRef(null);
  const isSeamlessInView = useInView(seamlessRef, { once: true, margin: '-100px' });

  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  const scrollToValues = () => {
    document.getElementById('standards')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Solmaré Standard"
        description="Hotel reliability meets vacation home freedom. Discover immaculate standards, curated comfort, and local expertise on California's Central Coast."
      />
      <Header />
      <main>
        {/* SECTION 1: Hero Section */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={aboutHeroImage}
              alt="California Central Coast"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Content Box */}
          <div className="absolute bottom-6 left-6 md:bottom-20 md:left-20 w-[calc(100%-3rem)] md:w-[600px] lg:w-[700px] bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground mb-6">
                The Solmaré Standard.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Not just a vacation rental. A curated coastal experience defined by immaculate standards and effortless stays.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="xl" onClick={scrollToValues}>
                  See Our Standards
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: More Than a Place to Stay */}
        <section className="section-padding bg-[#F9F7F2]">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <div className="overflow-hidden rounded-2xl shadow-elevated">
                  <img
                    src="/avila-beach.jpg"
                    alt="California palm trees at sunset"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </motion.div>

              {/* Right: Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2"
              >
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6">
                  More Than a Place to Stay.
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic">
                  "We believe a vacation home should feel better than your own home. That means chef-ready kitchens, professional interior design, and a level of cleanliness that rivals 5-star hotels. No clutter, no guesswork—just the coast."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Core Values - 3 White Cards */}
        <section id="standards" ref={valuesRef} className="section-padding bg-background scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hotel reliability, vacation home freedom.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white p-8 md:p-10 rounded-2xl shadow-elevated border border-border/30"
                >
                  <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-ocean" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Seamless Service (NEW) */}
        <section ref={seamlessRef} className="section-padding bg-[#f5f5f5]">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSeamlessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
                SEAMLESS FROM START TO FINISH
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Modern conveniences designed to make your stay effortless.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {seamlessFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isSeamlessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Testimonials */}
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
                    <p className="text-primary-foreground/60 text-sm mt-1">{testimonial.property}</p>
                    <p className="text-primary-foreground/50 text-xs mt-1 italic">
                      ✓ Verified Review from {testimonial.platform}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Final CTA */}
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
                The coast is calling. Book direct for the best rates guaranteed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Browse The Collection</Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contact" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Message the Host
                  </Link>
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
