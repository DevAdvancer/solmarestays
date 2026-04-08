import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import {
  MapPin, Waves, Wine, Sun, Mountain, Palmtree,
  ChevronDown, ChevronUp, MessageCircle, Star, ShieldCheck, Clock, ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is the Central Coast of California?',
    answer: 'The Central Coast of California is the stretch of coastline between Los Angeles and San Francisco, roughly from Santa Barbara County in the south to Monterey County in the north. The heart of the Central Coast is San Luis Obispo County, which includes popular destinations like Avila Beach, Pismo Beach, San Luis Obispo, Morro Bay, Paso Robles, and Cambria. The region is known for its stunning natural beauty, world-class wine country, charming small towns, and a relaxed coastal lifestyle.',
  },
  {
    question: 'What is the best town to stay in on the Central Coast?',
    answer: 'It depends on your priorities. Avila Beach is ideal for guests who want a quiet, sunny beach town with walkable restaurants and wine tasting. Pismo Beach offers more nightlife, shopping, and the iconic pier. San Luis Obispo is perfect for guests who want a vibrant downtown with dining and culture, plus easy access to multiple beaches. Our vacation rentals are located across these communities, so we can help you find the right fit for your trip.',
  },
  {
    question: 'How far is the Central Coast from Los Angeles and San Francisco?',
    answer: 'The Central Coast is roughly equidistant between LA and San Francisco. San Luis Obispo is approximately 3 hours north of Los Angeles (200 miles) and 3.5 hours south of San Francisco (230 miles) via Highway 101. This makes it an ideal road trip destination from either city, or a convenient midpoint for travelers driving between northern and southern California.',
  },
  {
    question: 'When is the best time to visit the Central Coast?',
    answer: 'The Central Coast is a year-round destination. Summer (June-September) brings the warmest weather and largest crowds. Fall (September-November) offers warm days, fewer visitors, and wine harvest season. Winter provides dramatic surf, whale watching, and the lowest prices. Spring brings wildflowers, pleasant weather, and moderate crowds. Avila Beach is notably sunnier than other coastal towns year-round due to its sheltered microclimate.',
  },
  {
    question: 'Is the Central Coast good for wine tasting?',
    answer: 'The Central Coast is one of the premier wine regions in the world. San Luis Obispo County alone has over 250 wineries across several distinct growing regions: Paso Robles (bold reds, Rhone varietals), Edna Valley (chardonnay, pinot noir), and the coastal hills near Avila Beach (pinot noir, chardonnay). The tasting room scene is relaxed and accessible compared to Napa Valley, with lower prices and fewer crowds.',
  },
  {
    question: 'What outdoor activities are available on the Central Coast?',
    answer: 'The Central Coast offers an incredible range of outdoor activities. Beach activities include swimming, surfing, kayaking, and paddleboarding. Hiking options range from easy coastal trails to challenging peak climbs like Bishop Peak and Valencia Peak. The Oceano Dunes offer ATV and off-road driving on the beach. The area is also popular for cycling, golf, horseback riding, fishing, and whale watching. The Bob Jones Trail in Avila Beach and Montana de Oro State Park near Morro Bay are two of the most popular outdoor destinations.',
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
  name: 'Solmare Stays - Central Coast California Vacation Rentals',
  description:
    'Premium vacation rentals on California\'s Central Coast. Properties in Avila Beach, Pismo Beach, San Luis Obispo, and surrounding communities. Professionally managed with best rate guarantee.',
  url: 'https://www.solmarestays.com/central-coast',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Luis Obispo',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.7',
    ratingCount: '2429',
    bestRating: '10',
    worstRating: '1',
  },
  priceRange: '$140 - $1,100',
};

const destinations = [
  {
    name: 'Avila Beach',
    link: '/avila-beach',
    icon: Sun,
    description:
      'The sunniest spot on the Central Coast. Walkable downtown, calm waters, local wineries, and our largest collection of vacation rentals.',
    highlights: ['Walk to the beach', 'Bob Jones Trail', 'Wine tasting', 'Farmers market'],
  },
  {
    name: 'Pismo Beach',
    link: '/pismo-beach',
    icon: Waves,
    description:
      'The classic California beach town. Iconic pier, Oceano Dunes, downtown boardwalk, and excellent dining — all just minutes from our Avila Beach homes.',
    highlights: ['Pismo Pier', 'Oceano Dunes', 'Premium Outlets', 'Monarch butterflies'],
  },
  {
    name: 'San Luis Obispo',
    link: '/san-luis-obispo',
    icon: Mountain,
    description:
      'The happiest city in America. Vibrant downtown, Cal Poly, legendary Thursday Night Farmers Market, and the gateway to Central Coast wine country.',
    highlights: ['Thursday Farmers Market', 'Bishop Peak', 'Higuera Street', 'Wine country'],
  },
];

const CentralCoastPage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Central Coast California Vacation Rentals"
        description="Discover premium vacation rentals on California's Central Coast. Properties in Avila Beach, Pismo Beach, and San Luis Obispo. Professionally managed homes with best rate guarantee. Book direct and save."
        schema={locationSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com' },
          { name: 'Central Coast Vacation Rentals', url: 'https://www.solmarestays.com/central-coast' },
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
                San Luis Obispo County
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Central Coast California Vacation Rentals
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                From sun-soaked beaches to world-class wine country, the Central Coast is California at its finest. Our
                curated collection of vacation homes puts you in the heart of it all — professionally managed and always
                priced right.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a href="#properties">View All Homes</a>
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
                  California's Central Coast: Where the Beach Meets Wine Country
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The Central Coast of California is one of the most stunning and diverse destinations in the United
                    States. Stretching along the Pacific between Los Angeles and San Francisco, this region offers an
                    unmatched combination of pristine beaches, rolling wine country, charming small towns, and dramatic
                    coastal scenery. San Luis Obispo County, the heart of the Central Coast, is where Solmare Stays
                    calls home — and where our guests experience the very best of California's coastal lifestyle.
                  </p>
                  <p>
                    Unlike the crowded resort towns of Southern California or the fog-heavy coast of Northern California,
                    the Central Coast strikes the perfect balance. The pace is relaxed, the towns are walkable, the food
                    is farm-fresh, and the wine is world-class. Whether you are looking for a romantic weekend at the
                    beach, a family vacation filled with outdoor adventure, or a wine country escape with friends, the
                    Central Coast delivers an experience that feels both authentic and elevated.
                  </p>
                  <p>
                    Our vacation rentals are spread across the Central Coast's most desirable communities: Avila Beach,
                    the sunniest town on the coast; the charming neighborhoods near Pismo Beach; and the vibrant city of
                    San Luis Obispo. Each property is professionally managed, impeccably maintained, and designed to feel
                    like a true home away from home. When you book with Solmare Stays, you get the reliability of a
                    hotel, the space and privacy of a vacation home, and the local expertise of a team that lives and
                    breathes the Central Coast.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Destination Cards */}
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
                Explore Our Central Coast Destinations
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three distinct communities, each with its own character and charm.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={destination.link}
                    className="block bg-white p-8 rounded-2xl shadow-soft border border-border/30 hover:shadow-medium transition-shadow duration-300 h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center mb-6">
                      <destination.icon className="w-7 h-7 text-ocean" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{destination.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{destination.description}</p>
                    <ul className="space-y-1 mb-6">
                      {destination.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-ocean flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-ocean font-medium text-sm">
                      Explore {destination.name}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Content: The Region */}
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
                  The Central Coast Experience: Beaches, Wine & Highway 1
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The Central Coast is anchored by San Luis Obispo County, a region that packs an extraordinary
                    amount of natural beauty, culture, and flavor into a relatively compact area. The coastline runs
                    from the dramatic cliffs of Big Sur in the north to the wide, sandy beaches of Grover Beach and
                    Oceano in the south. In between, you will find some of the most charming and diverse beach towns in
                    California.
                  </p>
                  <p>
                    Highway 1, the Pacific Coast Highway, runs through the heart of the Central Coast and is widely
                    considered one of the most scenic drives in the world. From San Simeon (home of Hearst Castle) south
                    through Cambria, Cayucos, Morro Bay, and into San Luis Obispo, the drive offers jaw-dropping views
                    of rugged coastline, elephant seal beaches, and the famous Morro Rock. Many of our guests plan day
                    trips along Highway 1 as part of their Central Coast vacation, returning to their Solmare Stays
                    vacation rental each evening.
                  </p>
                  <p>
                    Wine is a defining feature of the Central Coast. San Luis Obispo County is home to over 250
                    wineries across multiple growing regions. The Paso Robles AVA, with over 200 wineries, is known for
                    bold Rhone varietals, cabernet sauvignon, and zinfandel. The Edna Valley, just south of San Luis
                    Obispo, produces elegant chardonnay and pinot noir in one of the coolest wine-growing climates in
                    California. The coastal hills near Avila Beach add another dimension with boutique wineries tucked
                    into the canyons. Whether you are a serious oenophile or a casual taster, the Central Coast wine
                    scene is world-class and remarkably accessible.
                  </p>
                  <p>
                    Outdoor recreation is woven into daily life on the Central Coast. Surfing, kayaking, hiking, biking,
                    horseback riding, golf, and fishing are all popular year-round activities. Montana de Oro State Park,
                    just north of Morro Bay, is one of the most spectacular and uncrowded state parks in California, with
                    miles of coastal trails, tide pools, and hidden beaches. The Oceano Dunes offer off-road adventures
                    on the beach. Bishop Peak, Cerro San Luis, and other peaks in the Nine Sisters chain provide hiking
                    with panoramic views.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Getting Here & Around */}
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
                  Getting to the Central Coast
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The Central Coast is easily accessible from both Northern and Southern California. San Luis Obispo
                    County Regional Airport (SBP) offers direct flights from several major hubs including Los Angeles,
                    San Francisco, Phoenix, Denver, Dallas, and Seattle. The airport is small and efficient — you can
                    typically go from landing to your rental car in under 15 minutes.
                  </p>
                  <p>
                    By car, San Luis Obispo is approximately 3 hours from Los Angeles via Highway 101 and 3.5 hours
                    from San Francisco. The drive from LA is one of the more scenic highway drives in California,
                    passing through Santa Barbara wine country and the Gaviota Pass. From San Francisco, the Highway 101
                    route passes through Paso Robles, or you can take the longer but spectacular Highway 1 along the
                    coast through Big Sur.
                  </p>
                  <p>
                    Once you are on the Central Coast, a car is recommended for getting between towns, though individual
                    communities like Avila Beach and downtown San Luis Obispo are very walkable. The distances between
                    towns are short — Avila Beach to Pismo Beach is 10 minutes, Avila to downtown SLO is 15 minutes,
                    and even Paso Robles wine country is just 30-40 minutes away. This compact geography means you can
                    experience multiple towns and environments in a single day without spending hours in the car.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* All Properties */}
        <section id="properties" className="section-padding bg-background scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Our Central Coast Vacation Rentals
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Browse our full collection of professionally managed homes across the Central Coast.
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
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Our properties are loading. Please check back shortly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Book with Solmare */}
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
                Why Book Direct with Solmare Stays
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We live here. We manage every property personally. And we guarantee the best rates.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: 'Best Rate Guarantee',
                  description:
                    'Book direct and save 10-15% versus Airbnb and Vrbo. No service fees, no hidden costs — just the best price on every stay.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Hotel-Quality Standards',
                  description:
                    'Every home undergoes a 50-point video inspection before your arrival. Premium linens, fully stocked kitchens, and immaculate spaces — guaranteed.',
                },
                {
                  icon: Clock,
                  title: '24/7 Local Team',
                  description:
                    'We are not a call center. We are a local team that lives on the Central Coast and is always available by phone or text. Real people, real help.',
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
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Frequently Asked Questions About the Central Coast
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
                Your Central Coast Escape Awaits
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Beach, wine, and everything in between. Book direct for the best rates — guaranteed.
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
              <Link to="/pismo-beach" className="hover:text-ocean transition-colors">
                Pismo Beach Vacation Rentals
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

export default CentralCoastPage;
