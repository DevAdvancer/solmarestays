import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import {
  MapPin, Waves, ShoppingBag, Compass, Sunset, TreePine,
  ChevronDown, ChevronUp, MessageCircle, Star, ShieldCheck, Clock, Car
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is there to do in Pismo Beach?',
    answer: 'Pismo Beach is packed with activities for every type of traveler. Walk the iconic Pismo Beach Pier, explore tide pools at Dinosaur Caves Park, drive or ride ATVs on the Oceano Dunes, visit the Monarch Butterfly Grove (October-February), shop at the Pismo Beach Premium Outlets, stroll the downtown boardwalk, or enjoy world-class clam chowder at Splash Cafe. The area also offers excellent surfing, kayaking, golf, and hiking.',
  },
  {
    question: 'How far is Pismo Beach from Avila Beach?',
    answer: 'Pismo Beach and Avila Beach are only 5-10 minutes apart by car, roughly 5 miles via US-101. Many guests staying near Pismo Beach in our Avila Beach properties visit Pismo daily for dining, shopping, and beach activities. Shell Beach sits between the two towns and is equally close.',
  },
  {
    question: 'When is the best time to visit Pismo Beach?',
    answer: 'Pismo Beach is beautiful year-round. Summer (June-September) brings the warmest weather and biggest crowds. Fall (September-November) offers warm days with fewer visitors and is ideal for the monarch butterfly migration. Winter is whale-watching season with dramatic surf. Spring brings wildflowers and pleasant temperatures. For the sunniest weather, stay in nearby Avila Beach, which is sheltered from coastal fog.',
  },
  {
    question: 'Can you drive on the beach at Pismo Beach?',
    answer: 'Yes, the Oceano Dunes State Vehicular Recreation Area at the south end of Pismo Beach is one of the few places in California where you can drive directly on the beach. It is also popular for ATV and off-highway vehicle riding. Access is from the Grand Avenue entrance in Grover Beach. Note that vehicle access rules can change seasonally, so check current conditions before your visit.',
  },
  {
    question: 'Where should I stay near Pismo Beach?',
    answer: 'Our vacation rentals in neighboring Avila Beach offer the perfect home base for exploring Pismo Beach. Located just 5-10 minutes from downtown Pismo, our Avila Beach homes give you easy access to everything Pismo offers while staying in a quieter, sunnier town with walkable restaurants and beach access of its own. You get the best of both worlds.',
  },
  {
    question: 'Is Pismo Beach good for families?',
    answer: 'Pismo Beach is an excellent family destination. The beach is wide and sandy, Dinosaur Caves Park has a great playground with ocean views, the boardwalk is stroller-friendly, and the Monarch Butterfly Grove is a magical experience for children. The Oceano Dunes offer family-friendly ATV tours, and nearby Avila Valley Barn has a petting zoo and hay rides.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const locationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Solmaré Stays - Near Pismo Beach Vacation Rentals',
  description:
    'Vacation rentals minutes from Pismo Beach, California. Stay in nearby Avila Beach and enjoy easy access to the Pismo pier, Oceano Dunes, downtown shopping, and more.',
  url: 'https://www.solmarestays.com/pismo-beach',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pismo Beach',
    addressRegion: 'CA',
    postalCode: '93449',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.1428,
    longitude: -120.6413,
  },
};

const highlights = [
  {
    icon: Waves,
    title: 'The Pismo Beach Pier',
    description:
      'The 1,200-foot Pismo Beach Pier is the centerpiece of downtown. Walk to the end for panoramic ocean views, fishing, and stunning sunsets.',
  },
  {
    icon: Compass,
    title: 'Oceano Dunes',
    description:
      'One of the only places in California where you can drive on the beach. Rent an ATV or bring your own vehicle for an unforgettable dune adventure.',
  },
  {
    icon: ShoppingBag,
    title: 'Premium Outlets',
    description:
      'The Pismo Beach Premium Outlets feature over 40 name-brand stores with ocean views from the parking lot. Nike, Coach, Kate Spade, and more.',
  },
  {
    icon: Sunset,
    title: 'Dinosaur Caves Park',
    description:
      'Perched on the bluffs above the ocean, this park offers dramatic coastal views, walking paths, a playground, and picnic areas.',
  },
  {
    icon: TreePine,
    title: 'Monarch Butterfly Grove',
    description:
      'From October through February, thousands of monarch butterflies cluster in the eucalyptus trees at this free, awe-inspiring natural sanctuary.',
  },
  {
    icon: Car,
    title: '5 Minutes from Avila Beach',
    description:
      'Our vacation rentals in Avila Beach put you just minutes from everything Pismo offers, plus a sunnier, quieter home base.',
  },
];

const PismoBeachPage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Show properties near Pismo — primarily Avila Beach properties
  const nearbyProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        p.location.toLowerCase().includes('avila') ||
        p.location.toLowerCase().includes('pismo') ||
        p.location.toLowerCase().includes('shell')
    );
  }, [properties]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pismo Beach Vacation Rentals"
        description="Find vacation rentals near Pismo Beach, California. Stay minutes from the pier, Oceano Dunes, and downtown Pismo in professionally managed coastal homes. Best rate guaranteed when you book direct with Solmaré Stays."
        schema={locationSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com' },
          { name: 'Pismo Beach Vacation Rentals', url: 'https://www.solmarestays.com/pismo-beach' },
        ]}
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <p className="text-ocean font-medium mb-3 tracking-wide uppercase text-sm">
                California's Central Coast
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Pismo Beach Vacation Rentals
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Experience the best of Pismo Beach from our curated collection of vacation homes just minutes away. The
                pier, the dunes, the downtown — all within easy reach of your coastal retreat.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a href="#properties">View Nearby Homes</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask Us Anything
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Pismo Beach: The Classic California Beach Town
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Pismo Beach is the quintessential California beach town. With its iconic wooden pier stretching over
                    the Pacific, a lively downtown strip filled with restaurants and shops, and miles of wide, sandy
                    beach, Pismo has been a beloved destination for generations of California travelers. Located halfway
                    between Los Angeles and San Francisco on Highway 101, it is one of the most accessible and
                    rewarding beach destinations in the state.
                  </p>
                  <p>
                    The town's personality is a perfect blend of laid-back surf culture and small-town charm. You will
                    find world-famous clam chowder at Splash Cafe, sunset cocktails at oceanfront restaurants, and a
                    boardwalk scene that comes alive every evening. Whether you are here for a romantic weekend, a family
                    vacation, or a surf trip with friends, Pismo Beach delivers an authentic coastal California experience
                    that never gets old.
                  </p>
                  <p>
                    Our vacation rental homes in neighboring Avila Beach put you just 5-10 minutes from everything Pismo
                    Beach has to offer. You get the energy and excitement of Pismo with the quiet, sunny home base that
                    Avila Beach provides. It is the best of both worlds — and our guests consistently tell us it is the
                    ideal setup for experiencing the Central Coast.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Things to Do in Pismo Beach
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From pier walks to sand dunes, Pismo Beach has something for everyone.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-soft border border-border/30"
                >
                  <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center mb-6">
                    <highlight.icon className="w-7 h-7 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Content: Downtown & Dining */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Downtown Pismo Beach: Dining, Shopping & Nightlife
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Downtown Pismo Beach is centered around Pomeroy Avenue, which leads directly to the pier and the
                    beach. The main drag is lined with a mix of classic surf shops, boutiques, ice cream parlors, and
                    some of the best restaurants on the Central Coast. Splash Cafe, home of the award-winning clam
                    chowder in a sourdough bread bowl, is a Pismo institution and consistently ranked among the best in
                    California.
                  </p>
                  <p>
                    For sit-down dining, the options are diverse and excellent. Ventana Grill offers upscale Latin fusion
                    with dramatic ocean views from its cliffside terrace. The Oyster Loft serves fresh oysters and
                    seafood in an intimate rooftop setting. Steamers of Pismo Beach delivers classic American seafood
                    right on the waterfront. Giuseppe's Cucina Italiana is a local favorite for wood-fired pizza and
                    handmade pasta. And for a casual morning start, Old West Cinnamon Rolls has been serving enormous
                    fresh rolls for decades.
                  </p>
                  <p>
                    The Pismo Beach Premium Outlets, located just off Highway 101, offer a shopping experience that draws
                    visitors from across the region. With over 40 brand-name stores including Nike, Coach, Kate Spade,
                    Calvin Klein, and J.Crew, the outlet center provides excellent deals with the bonus of coastal views
                    from the parking lot. It is a popular rainy-day activity and a regular stop for guests who want to
                    combine beach time with retail therapy.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Deep Content: Outdoor Activities */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Outdoor Adventures Near Pismo Beach
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The Oceano Dunes State Vehicular Recreation Area is one of Pismo Beach's most famous attractions and
                    one of the only places in California where you can drive directly on the beach. The dunes stretch for
                    miles along the coast and offer opportunities for ATV riding, sand boarding, camping, and off-road
                    adventures. Several local companies rent ATVs and offer guided tours for visitors who want to
                    experience the dunes safely. It is a thrilling and unique activity that you will not find at most
                    California beach towns.
                  </p>
                  <p>
                    Dinosaur Caves Park, located on the bluffs above Shell Beach at the north end of Pismo, is one of
                    the most scenic parks on the Central Coast. The park features walking paths along the cliff edge,
                    dramatic views of the rocky coastline, a children's playground, and picnic areas. At low tide, the
                    tide pools below the cliffs reveal a fascinating world of sea anemones, starfish, and hermit crabs.
                    It is an excellent spot for families and photographers alike.
                  </p>
                  <p>
                    The Monarch Butterfly Grove, located in a eucalyptus grove at the south end of Pismo Beach, is a
                    must-visit from October through February. Tens of thousands of monarch butterflies migrate here each
                    year, clustering in the trees in breathtaking orange masses. The grove is free to visit and staffed
                    by volunteer docents who share information about the butterflies' remarkable migration from as far
                    away as Canada. It is one of the largest monarch overwintering sites in the United States.
                  </p>
                  <p>
                    Surfing at Pismo Beach is excellent, with consistent waves and breaks suitable for beginners and
                    experienced surfers alike. The beach break near the pier is a popular spot, and several local surf
                    schools offer lessons for first-timers. Stand-up paddleboarding, kayaking, and clamming (Pismo clams
                    are famous, though harvesting is regulated) round out the water-based activities.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Proximity to Avila Beach */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Stay in Avila Beach, Play in Pismo Beach
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Many of our guests tell us that staying in Avila Beach while visiting Pismo Beach is the perfect
                    arrangement. Avila Beach is just a 5-10 minute drive north of Pismo, but it offers a completely
                    different vibe — quieter, sunnier, and more walkable. After a day exploring Pismo's pier, dunes,
                    and downtown, you return to a peaceful neighborhood with your own private vacation home, steps from
                    Avila's calm beach and excellent restaurants.
                  </p>
                  <p>
                    The two towns complement each other beautifully. Pismo brings the energy, the iconic pier, the
                    shopping, and the adventure. Avila brings the relaxation, the wine tasting, the hot springs, and the
                    sunshine. By staying with Solmaré Stays in Avila Beach, you are positioned to enjoy the best of both
                    without compromise.
                  </p>
                  <p>
                    Shell Beach, the charming residential community perched on the bluffs between Avila and Pismo, is
                    equally close and worth exploring. Its rugged coastline, tide pools, and quiet coves offer a more
                    secluded beach experience than either of its neighbors.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="properties" className="section-padding bg-secondary scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Vacation Rentals Near Pismo Beach
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our professionally managed homes in Avila Beach are just minutes from downtown Pismo Beach.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] rounded-xl bg-muted mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : nearbyProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nearbyProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Browse our full collection of Central Coast vacation rentals.
                </p>
                <Button variant="default" asChild>
                  <Link to="/collection">View All Properties</Link>
                </Button>
              </div>
            )}

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/collection">View All Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Book with Solmare */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Why Book with Solmaré Stays
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Locally managed, professionally maintained, and always priced right.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: 'Best Rate Guarantee',
                  description:
                    'No hidden service fees. Our direct booking prices beat Airbnb and Vrbo every time.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Hotel-Quality Standards',
                  description:
                    'Every home passes a 50-point inspection before your arrival. We guarantee spotless, well-stocked homes.',
                },
                {
                  icon: Clock,
                  title: '24/7 Local Team',
                  description:
                    'We live on the Central Coast and are always available by phone or text. Real people, real help, real fast.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Frequently Asked Questions About Pismo Beach
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white border border-border/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <h3 className="font-serif text-lg font-semibold text-foreground">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-6">
                Your Pismo Beach Getaway Starts Here
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Book direct for the best rates. No service fees, no surprises — just the coast.
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

        {/* Internal Links */}
        <section className="py-10 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/avila-beach" className="hover:text-ocean transition-colors">
                Avila Beach Vacation Rentals
              </Link>
              <span className="text-border">|</span>
              <Link to="/central-coast" className="hover:text-ocean transition-colors">
                Central Coast Vacation Rentals
              </Link>
              <span className="text-border">|</span>
              <Link to="/san-luis-obispo" className="hover:text-ocean transition-colors">
                San Luis Obispo Vacation Rentals
              </Link>
              <span className="text-border">|</span>
              <Link to="/collection" className="hover:text-ocean transition-colors">
                All Properties
              </Link>
              <span className="text-border">|</span>
              <Link to="/management" className="hover:text-ocean transition-colors">
                Property Management
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PismoBeachPage;
