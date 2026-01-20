import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Wine, Bike, MapPin, Star, ExternalLink, Waves, Mountain, Camera } from 'lucide-react';
import servicesHeroImage from '@/assets/services-hero.jpg';
import heroImage1 from '@/assets/hero-1.jpg';
import heroImage2 from '@/assets/hero-2.jpg';
import avilaBeach from '@/assets/avila-beach.jpg';

// Featured experiences - highlighted items
const featuredExperiences = [
  {
    name: "Rod & Hammer's California Whiskey",
    image: heroImage1,
    category: "Spirits & Tasting",
    description: "Award-winning whiskey distillery with stunning coastal views and premium tasting experiences.",
    link: "#",
  },
  {
    name: "Avila Wine & Roasting Co.",
    image: heroImage2,
    category: "Wine & Coffee",
    description: "Local favorite combining artisan wine selections with freshly roasted coffee in a relaxed coastal atmosphere.",
    link: "#",
  },
  {
    name: "Central Coast Kayaks",
    image: avilaBeach,
    category: "Adventure",
    description: "Explore the pristine waters of Port San Luis with guided kayak tours and paddleboard rentals.",
    link: "#",
  },
];

// Category-organized local partners
const partnerCategories = [
  {
    icon: Wine,
    category: 'Wine & Tasting Rooms',
    description: 'World-class wineries just minutes from your stay',
    partners: [
      { name: 'Tolosa Winery', specialty: 'Pinot Noir & Chardonnay' },
      { name: 'Claiborne & Churchill', specialty: 'Alsatian-style wines' },
      { name: 'Baileyana Winery', specialty: 'Estate wines' },
      { name: 'Edna Valley Vineyard', specialty: 'Award-winning Chardonnay' },
    ],
  },
  {
    icon: UtensilsCrossed,
    category: 'Restaurants & Dining',
    description: 'Farm-to-table cuisine and fresh seafood',
    partners: [
      { name: 'Custom House', specialty: 'Fine dining with ocean views' },
      { name: 'Ventana Grill', specialty: 'California coastal cuisine' },
      { name: "Mersea's", specialty: 'Fresh seafood & local catch' },
      { name: 'The Spoon Trade', specialty: 'Creative American fare' },
      { name: 'Avila Beach Fish & Farmers Market', specialty: 'Fresh local produce' },
    ],
  },
  {
    icon: Bike,
    category: 'Activities & Adventures',
    description: 'Explore the coast by land and sea',
    partners: [
      { name: 'Central Coast Kayaks', specialty: 'Kayak tours & rentals' },
      { name: 'Bob Jones Trail Bikes', specialty: 'Scenic bike rentals' },
      { name: 'Avila Beach Paddlesports', specialty: 'SUP & paddleboard' },
      { name: 'Point San Luis Lighthouse', specialty: 'Historic tours' },
    ],
  },
  {
    icon: Waves,
    category: 'Beach & Relaxation',
    description: 'Unwind along the Central Coast',
    partners: [
      { name: 'Avila Beach Pier', specialty: 'Fishing & sunset views' },
      { name: 'Sycamore Mineral Springs', specialty: 'Hot springs & spa' },
      { name: 'Pismo Beach Pier', specialty: 'Classic California beach' },
      { name: 'Shell Beach', specialty: 'Scenic coastal walks' },
    ],
  },
  {
    icon: Mountain,
    category: 'Hiking & Nature',
    description: 'Breathtaking trails and natural beauty',
    partners: [
      { name: 'Bob Jones Trail', specialty: 'Easy coastal path' },
      { name: "Bishop's Peak", specialty: 'Challenging summit hike' },
      { name: 'Montaña de Oro', specialty: 'Diverse coastal trails' },
      { name: 'Avila Beach Promenade', specialty: 'Beachfront walking path' },
    ],
  },
];

const GuestExperiencePage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Guest Experience"
        description="Discover curated local experiences and partners. From wineries to adventure, explore the best of the Central Coast with Solmaré Stays."
      />
      <Header />
      <main>
        {/* Hero Section */}
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

          {/* Content Box */}
          <div className="absolute bottom-0 left-0 w-full md:w-[600px] lg:w-[700px] bg-white pt-12 pb-10 pr-12 pl-4 md:pl-8 lg:pl-16 rounded-tr-[3rem]">
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
                Discover the Central Coast
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From award-winning wineries to hidden beach coves, we've curated the best local
                experiences to make your coastal getaway unforgettable.
              </p>
              <Button variant="default" size="xl" asChild>
                <Link to="/collection">Explore Properties</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Featured Experiences */}
        <section ref={featuredRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Featured Experiences
              </h2>
              <p className="text-muted-foreground text-lg">
                Hand-picked local favorites that our guests love.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredExperiences.map((experience, index) => (
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
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-2 block">
                      {experience.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {experience.name}
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Categories */}
        <section ref={categoriesRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Explore by Category
              </h2>
              <p className="text-muted-foreground text-lg">
                We've built relationships with the best local businesses to enhance your Central Coast experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-ocean" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {category.category}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {category.partners.map((partner, pIndex) => (
                      <motion.li
                        key={pIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isCategoriesInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + pIndex * 0.05 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex items-center gap-2 text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-ocean" />
                          {partner.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {partner.specialty}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Insider Tips */}
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
                Your Personal Concierge
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                As a Solmaré Stays guest, you'll receive a curated digital guidebook with insider
                recommendations, reservation tips, and exclusive local insights tailored to your
                stay. We're here to make your Central Coast experience truly special.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Book Your Stay</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">Ask Us Anything</Link>
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

export default GuestExperiencePage;
