import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Wine, UtensilsCrossed, Bike, MapPin } from 'lucide-react';
import servicesHeroImage from '/experience/hero.jpg';
import heroImage1 from '/experience/bolt.avif';
import heroImage2 from '/experience/rod.avif';
import heroImage3 from '/experience/AvilaWine.avif';

// Featured Partners - 3 Cards
const featuredPartners = [
  {
    name: 'BoltAbout',
    image: heroImage1,
    description: "Explore the coast with ease using premium electric bicycle rentals, perfect for cruising the scenic Bob Jones Trail or downtown SLO.",
  },
  {
    name: "Rod & Hammer's SLO Stills",
    image: heroImage2,
    description: "Hand-crafted spirits and California whiskey served in a vintage-inspired lounge that embodies the bold spirit of the Central Coast.",
  },
  {
    name: 'Avila Wine & Roasting Co.',
    image: heroImage3,
    description: "A boutique tasting room in the heart of Avila Beach showcasing a curated selection of the region's finest small-lot wines.",
  },
];

// Partner Directory - 3 Categories
const partnerDirectory = [
  {
    icon: Wine,
    title: 'Wine, Spirits & Tasting Rooms',
    venues: [
      { name: 'Avila Wine & Roasting Co.', location: 'Avila Beach', experience: 'Beachfront wine tasting & coffee.' },
      { name: "Rod & Hammer's SLO Stills", location: 'San Luis Obispo', experience: 'Handcrafted California whiskey.' },
      { name: 'Tolosa Winery', location: 'Edna Valley', experience: 'Estate Pinot Noir & Chardonnay.' },
      { name: 'Austin Hope Winery', location: 'Paso Robles', experience: 'Iconic luxury Cabernet Sauvignon.' },
      { name: 'DAOU Vineyards', location: 'Paso Robles', experience: 'World-class views and wines.' },
      { name: 'Kelsey See Canyon Vineyards', location: 'Avila Valley', experience: 'Apple wines in a rustic setting.' },
      { name: 'Peloton Cellars', location: 'Avila Beach', experience: 'Premium flights steps from sand.' },
    ],
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants & Dining',
    venues: [
      { name: "Mersea's", location: 'Avila Pier', experience: 'Fresh seafood over the water.' },
      { name: 'The Oyster Loft', location: 'Pismo Beach', experience: 'Upscale dining with ocean views.' },
      { name: 'Ventana Grill', location: 'Pismo Beach', experience: 'Coastal fusion on the cliffs.' },
      { name: "Giuseppe's Cucina Italiana", location: 'Pismo Beach', experience: 'Authentic local Italian favorite.' },
      { name: 'Firestone Grill', location: 'San Luis Obispo', experience: 'Famous Tri-Tip sandwiches.' },
      { name: 'Ox + Anchor', location: 'San Luis Obispo', experience: 'Michelin-recognized steakhouse.' },
      { name: 'Blue Moon Over Avila', location: 'Avila Beach', experience: 'French bistro on the promenade.' },
    ],
  },
  {
    icon: Bike,
    title: 'Activities & Outdoors',
    venues: [
      { name: 'BoltAbout E-Bikes', location: 'Avila Beach', experience: 'Electric bike rentals & tours.' },
      { name: 'Avila Valley Barn', location: 'Avila Valley', experience: 'Farm fresh produce & animals.' },
      { name: 'Bob Jones City to Sea Trail', location: 'Avila Valley', experience: 'Scenic walking & biking path.' },
      { name: 'Central Coast Kayaks', location: 'Shell Beach', experience: 'Sea cave tours & rentals.' },
      { name: 'Point San Luis Lighthouse', location: 'Avila Beach', experience: 'Historic tours and hiking.' },
      { name: 'Sycamore Mineral Springs', location: 'Avila Valley', experience: 'Private hillside hot tub soaking.' },
      { name: 'Oceano Dunes SVRA', location: 'Oceano / Pismo', experience: 'ATV and dune buggy adventure.' },
      { name: 'Avila Beach Paddlesports', location: 'Avila Beach', experience: 'SUP & kayak rentals.' },
    ],
  },
];

const GuestExperiencePage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const philosophyRef = useRef(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: '-100px' });

  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const directoryRef = useRef(null);
  const isDirectoryInView = useInView(directoryRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Guest Experience"
        description="Discover curated local experiences and partners. From wineries to adventure, explore the best of the Central Coast with Solmaré Stays."
      />
      <Header />
      <main>
        {/* SECTION 1: Hero */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={servicesHeroImage}
              alt="Central Coast Experience"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-20 md:left-20 w-[calc(100%-3rem)] md:w-[600px] lg:w-[700px] bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="inline-block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Guest Experience
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground mb-6">
                More Than a Place to Stay
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Staying with Solmaré means more than a beautiful coastal home. We curate local partnerships and experiences that make every stay feel effortless, personal, and distinctly Central Coast.
              </p>
              <Button variant="default" size="xl" asChild>
                <Link to="/collection">Browse Properties</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Philosophy */}
        <section ref={philosophyRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                What This Means for Our Guests
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                At Solmaré, we believe the best trips feel seamless. That's why we partner with trusted local businesses to offer our guests thoughtful perks, preferred experiences, and insider recommendations—so you can spend less time planning and more time enjoying your stay.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our partnerships are intentionally selective. We focus on quality, consistency, and businesses we trust to deliver an experience that reflects the Solmaré standard.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Featured Partners */}
        <section ref={featuredRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Featured Partners
              </h2>
              <p className="text-muted-foreground text-lg">
                Hand-picked local favorites that our guests love.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Partner Directory - Best of the Coast */}
        <section ref={directoryRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isDirectoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Best of the Coast
              </h2>
              <p className="text-muted-foreground text-lg">
                Our curated guide to the Central Coast's finest experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnerDirectory.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isDirectoryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl shadow-soft"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-ocean" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Venues List */}
                  <ul className="space-y-4">
                    {category.venues.map((venue, vIndex) => (
                      <motion.li
                        key={vIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isDirectoryInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + vIndex * 0.05 }}
                        className="group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground text-sm group-hover:text-ocean transition-colors">
                              {venue.name}
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                              {venue.location}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground text-right max-w-[45%]">
                            {venue.experience}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: How It Works */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-ocean/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-ocean" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                How Guests Access These Experiences
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Once your stay is confirmed, you'll receive access to our curated digital guest guide. Inside, you'll find full details on available partner offers, redemption codes, and our team's personal recommendations for the best hidden spots in town.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Book Your Stay</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">Ask a Question</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: Final CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                Ready to Experience the Central Coast, Thoughtfully Curated?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Discover coastal homes paired with local experiences designed to make your stay unforgettable.
              </p>
              <Button variant="secondary" size="xl" asChild>
                <Link to="/collection">Explore Our Stays</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partner Micro-Copy */}
        <section className="py-8 bg-secondary border-t border-border">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <p className="text-sm text-ocean">
              Interested in partnering with Solmaré? We're always open to collaborating with local businesses that share our commitment to quality and guest experience.{' '}
              <Link to="/contact" className="text-ocean hover:underline font-medium">
                Contact Us
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuestExperiencePage;
