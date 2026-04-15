import { motion, useInView } from 'framer-motion';
import { usePage } from '@/hooks/useSanityContent';
import { SanitySectionRenderer } from '@/components/sanity/SanitySectionRenderer';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, MapPin, Clock, BadgeCheck, Smartphone, Star, MessageCircle } from 'lucide-react';
import aboutHeroImage from '/about-us/living-room-beams.jpg';
import placeHeroImage from '/about-us/fire-pit.jpg';

// Core Values - The Solmaré Standard
const values = [
  {
    icon: Sparkles,
    title: 'Curated Comfort',
    description: "From Parachute linens to locally sourced welcome baskets, every detail in a Solmaré home is chosen with intention. We think about the way guests actually use a space — the morning coffee routine, the late night wind-down, the midday beach return. Every home is stocked, staged, and styled so that comfort is never something you have to look for.",
  },
  {
    icon: ShieldCheck,
    title: 'Inspected, Not Just Cleaned',
    description: "Cleaning is the baseline. Our 50-point video inspection goes further — every surface, every amenity, every corner is checked and documented before you arrive. We don't send a guest into a home we haven't personally verified. That standard applies to every property, every stay, no exceptions.",
  },
  {
    icon: MapPin,
    title: 'We Live Here',
    description: "Our team lives and works on the Central Coast. That means when you need a winery reservation, a hidden beach recommendation, or just someone to pick up the phone, we're already here. We know the spots that don't show up on social media, the locals worth talking to, and the things that make this place worth coming back to. That knowledge is part of every stay.",
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
    name: 'Stacey W.',
    property: 'La Casita',
    date: 'July 2025',
    channel: 'Airbnb',
    text: "Beds were super comfortable. House is big and well furnished — it's even better than the pictures. One block to the beach. We parked our car and never had to drive again the whole weekend.",
  },
  {
    name: 'Barbara H.',
    property: 'Casa Azul',
    date: 'May 2025',
    channel: 'Airbnb',
    text: "I loved this Casita! It was a perfect location, very comfortable. The host was very attentive. Will stay there again!",
  },
  {
    name: 'Elsa D.',
    property: 'La Casita',
    date: 'December 2024',
    channel: 'Vrbo',
    text: "We spent a long weekend and were extremely pleased with the homey-ness and location of the cottage. It was a great central location to explore the area.",
  },
  {
    name: 'Shamaka N.',
    property: 'Emberlight',
    date: 'December 2025',
    channel: 'Airbnb',
    text: "The property looked like the pictures, clean and conveniently located steps from the beach. Check-in and communication was easy. I'll definitely stay here again.",
  },
  {
    name: 'Todd S.',
    property: 'Hummingbird House',
    date: 'March 2026',
    channel: 'Google',
    text: "My kids loved the proximity to the beach and all the toys in the storage. The house was very clean and well stocked. We hope to return again soon.",
  },
  {
    name: 'Brad E.',
    property: 'The Nest',
    date: 'February 2026',
    channel: 'Airbnb',
    text: "Great little place from which to enjoy Avila Beach. Just a short walk from the beach and boardwalk, yet just far enough to be quiet and peaceful. Everything was clean and in great condition.",
  },
  {
    name: 'Andrea H.',
    property: 'Monterey Heights',
    date: 'September 2025',
    channel: 'Airbnb',
    text: "I really loved this quiet little bungalow. Super clean and simple and had everything I needed. Extremely quiet street and comfortable mattress.",
  },
  {
    name: 'Jennifer A.',
    property: 'The Pine House',
    date: 'January 2026',
    channel: 'Airbnb',
    text: "The host was very responsive. We enjoyed our stay and will definitely be coming back. Great location, close to everything. Comfortable beds and very clean home.",
  },
];

const WhyChooseUsPage = () => {
  const { data: pageData, isLoading } = usePage('philosophy');
  const showSanityContent = !isLoading && pageData?.sections?.length > 0;

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
        title={pageData?.title || "The Solmaré Standard — Our Philosophy"}
        description={pageData?.metaDescription || "What sets Solmaré Stays apart. 50-point cleaning standard, 24/7 guest support, local concierge service, and the best rate guarantee. Elevated hospitality on California's Central Coast."}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Our Philosophy', url: 'https://www.solmarestays.com/philosophy' },
        ]}
      />
      <Header />
      <main>
        {showSanityContent ? (
          <div className="pt-32">
            <SanitySectionRenderer sections={pageData.sections} />
          </div>
        ) : (
          <>
            {/* SECTION 1: Hero Section */}
            <section ref={heroRef} className="relative h-[82vh] min-h-[550px] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <motion.img
                  src={aboutHeroImage}
                  alt="California Central Coast"
                  className="w-full h-full object-cover object-[center_85%]"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>

              {/* Content Box */}
              <div className="absolute bottom-6 left-6 md:bottom-20 md:left-20 w-[calc(100%-3rem)] md:w-[600px] lg:w-[700px] bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/15">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="max-w-xl"
                >
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white mb-6">
                    The Solmaré Standard
                  </h1>
                  <p className="text-lg text-white/80 leading-relaxed mb-8">
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

            {/* SECTION 2: Core Values - 3 White Cards */}
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

            {/* SECTION 4: Testimonials - Moments at Solmaré */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                      className="bg-primary-foreground/20 backdrop-blur-sm px-5 py-4 rounded-xl flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-primary-foreground/40 text-[10px] uppercase tracking-wider">{testimonial.channel}</span>
                      </div>
                      <p className="text-primary-foreground/90 text-xs mb-3 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="border-t border-primary-foreground/20 pt-2 mt-auto">
                        <span className="font-semibold text-xs">{testimonial.name}</span>
                        <p className="text-primary-foreground/50 text-[10px] mt-0.5">{testimonial.property} · {testimonial.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5: Owner Quote */}
            <section className="section-padding bg-secondary">
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
                        src={placeHeroImage}
                        alt="California palm trees at sunset"
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
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
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic mb-6">
                      "Solmaré was built on the idea that the Central Coast deserves a better kind of rental company. One that actually knows the homes, knows the area, and knows the people who make this place worth visiting. Every property in our collection is different by design, and every stay comes with access to the local experiences most visitors never find."
                    </p>
                    <p className="text-foreground font-semibold text-base">
                      Kyle Van Til
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Founder, Solmaré Stays
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SECTION 6: Seamless Service */}
            <section ref={seamlessRef} className="section-padding bg-muted">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isSeamlessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4 uppercase">
                    Seamless From Start to Finish
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

            {/* SECTION 7: Final CTA */}
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WhyChooseUsPage;
