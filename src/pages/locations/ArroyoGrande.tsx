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
  MapPin, Wine, Utensils, Mountain, TreePine, Waves,
  ChevronDown, ChevronUp, MessageCircle, Star, ShieldCheck, Clock
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is there to do in Arroyo Grande and the surrounding area?',
    answer: 'Arroyo Grande is the gateway to Central Coast wine country. Visit award-winning wineries in the Edna Valley and Arroyo Grande Valley AVAs, explore the charming Village of Arroyo Grande with its antique shops and restaurants, hike at Lopez Lake, or drive 15 minutes to Pismo Beach or 20 minutes to Avila Beach. The area offers a perfect blend of wine country relaxation and coastal adventure.',
  },
  {
    question: 'How far is Arroyo Grande from the beach?',
    answer: 'Arroyo Grande is approximately 15 minutes from Pismo Beach and 20 minutes from Avila Beach by car. Oceano Dunes, where you can drive and ride ATVs on the beach, is about 15 minutes away. The area is perfectly positioned between wine country and the coast, giving you the best of both worlds.',
  },
  {
    question: 'What wineries are near Arroyo Grande?',
    answer: 'The Arroyo Grande Valley and neighboring Edna Valley are home to dozens of world-class wineries. Andreini Winery is literally next door to our Casitas Estate property. Other nearby favorites include Talley Vineyards, Laetitia Vineyard & Winery, Saucelito Canyon, and Claiborne & Churchill. The region is known for exceptional pinot noir, chardonnay, and sparkling wines.',
  },
  {
    question: 'Is Arroyo Grande good for group trips and retreats?',
    answer: 'Absolutely. Our Casitas Estate in Arroyo Grande is specifically designed for groups — it sleeps up to 14 guests across six king suites on seven private acres. With a pool, hot tub, bocce court, and walking trails, it is ideal for family reunions, corporate retreats, wedding parties, and milestone celebrations. The wine country setting and proximity to beaches make it a uniquely versatile group destination.',
  },
  {
    question: 'What is the weather like in Arroyo Grande?',
    answer: 'Arroyo Grande enjoys a Mediterranean climate with warm, dry summers and mild winters. Summer temperatures range from 75-90 degrees Fahrenheit — typically warmer than the immediate coast due to its inland valley location. Spring and fall are beautiful with comfortable temperatures in the 65-80 degree range. Winters are mild at 50-65 degrees. The area gets more sunshine than the foggy coastal towns.',
  },
  {
    question: 'What is the Village of Arroyo Grande?',
    answer: 'The Village of Arroyo Grande is a charming historic downtown centered on Branch Street. It features a famous swinging bridge over Arroyo Grande Creek, antique shops, art galleries, locally owned restaurants like Rooster Creek Tavern and Mason Bar Mixed Grill, and a walkable small-town atmosphere. The Village hosts seasonal events including the Harvest Festival and holiday celebrations.',
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
  name: 'Solmaré Stays - Arroyo Grande & Wine Country Vacation Rentals',
  description:
    'Luxury vacation estate rental in Arroyo Grande wine country, California. Private 7-acre estate with pool, hot tub, and vineyard views. 15 minutes to Pismo Beach, 10 minutes to downtown SLO.',
  url: 'https://www.solmarestays.com/arroyo-grande',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Arroyo Grande',
    addressRegion: 'CA',
    postalCode: '93420',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.1575,
    longitude: -120.5364,
  },
};

const highlights = [
  {
    icon: Wine,
    title: 'Wine Country Living',
    description:
      'Surrounded by the Edna Valley and Arroyo Grande Valley AVAs. Dozens of world-class wineries within minutes — including one literally next door.',
  },
  {
    icon: Waves,
    title: '15 Minutes to the Beach',
    description:
      'Pismo Beach, Avila Beach, and Oceano Dunes are all a short drive away. Wine country mornings, beach afternoons.',
  },
  {
    icon: TreePine,
    title: 'Seven Private Acres',
    description:
      'Our Casitas Estate sits on seven acres of rolling vineyard landscape. Private trails, pool, hot tub, and bocce court — all exclusively yours.',
  },
  {
    icon: Utensils,
    title: 'Village of Arroyo Grande',
    description:
      'A charming historic downtown with the famous swinging bridge, locally owned restaurants, antique shops, and a walkable small-town atmosphere.',
  },
  {
    icon: Mountain,
    title: 'Lopez Lake & Outdoor Adventures',
    description:
      'Just 10 minutes to Lopez Lake for kayaking, hiking, and fishing. Montana de Oro State Park is 30 minutes away with dramatic coastal bluffs.',
  },
  {
    icon: MapPin,
    title: 'Central to Everything',
    description:
      'SLO downtown is 10 minutes away. Pismo Beach is 15 minutes. Paso Robles wine country is 30 minutes. You are at the center of the Central Coast.',
  },
];

const ArroyoGrandePage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const agProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        p.location.toLowerCase().includes('arroyo') ||
        p.location.toLowerCase().includes('grande')
    );
  }, [properties]);

  const displayProperties = agProperties.length > 0 ? agProperties : properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Arroyo Grande & Wine Country Vacation Rentals"
        description="Book a luxury wine country estate in Arroyo Grande, California. Private 7-acre estate sleeping 14 with pool, hot tub, and vineyard views. 15 minutes to the beach. Book direct and save."
        schema={locationSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com' },
          { name: 'Arroyo Grande Vacation Rentals', url: 'https://www.solmarestays.com/arroyo-grande' },
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
                Central Coast Wine Country
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Arroyo Grande & Wine Country Vacation Rentals
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Where vineyard views meet coastal access. Stay on a private wine country estate just minutes from the beach, downtown SLO, and the best wineries on the Central Coast.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a href="#properties">View Wine Country Homes</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Plan Your Group Trip
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
                  Wine Country Meets the Coast
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Arroyo Grande sits in the heart of California's Central Coast wine country — a rolling landscape of
                    vineyards, oak-studded hills, and some of the best pinot noir and chardonnay in the state. Unlike the
                    crowded tasting rooms of Napa, the Arroyo Grande and Edna Valley wine regions offer an intimate,
                    unhurried experience where winemakers still pour for you personally and the views stretch uninterrupted
                    to the Pacific.
                  </p>
                  <p>
                    What makes Arroyo Grande uniquely appealing is its position between wine country and the coast. You can
                    spend the morning hiking at Lopez Lake, the afternoon tasting wines at Talley Vineyards or Laetitia, and
                    be sitting on the sand at Pismo Beach by sunset — all within a 15-minute drive. Downtown San Luis Obispo,
                    with its restaurants, Thursday Night Farmers Market, and university-town energy, is just 10 minutes north.
                  </p>
                  <p>
                    Our Casitas Estate in Arroyo Grande takes this location and elevates it into something extraordinary:
                    seven private acres of vineyard-lined grounds, a 3,700 square foot main house, five private casitas each
                    with a king bed and fireplace, a pool, hot tub, bocce court, and walking trails — all reserved exclusively
                    for your group. Andreini Winery is literally next door. It is one of the most beloved private estates on
                    the Central Coast, and it is now managed by Solmaré Stays.
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
                What Makes Arroyo Grande Special
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Wine country charm, coastal access, and the kind of privacy you cannot find at a hotel.
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
                  <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center mb-6">
                    <highlight.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wine Country Deep Content */}
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
                  World-Class Wine Country at Your Doorstep
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The Arroyo Grande Valley and Edna Valley wine regions are among California's most exciting wine
                    destinations. Cooled by ocean breezes from nearby Pismo Beach and Avila Beach, these valleys produce
                    wines with a character distinct from warmer inland regions — bright acidity, complex flavors, and an
                    elegance that has earned the area recognition from wine critics worldwide.
                  </p>
                  <p>
                    Andreini Winery, literally adjacent to our Casitas Estate property, is a boutique producer known for
                    Italian-inspired wines grown on the estate vineyard. You can walk from your front door to the tasting
                    room and return with a bottle for dinner — no car needed. Talley Vineyards, one of the region's most
                    celebrated producers, is a short drive south and offers tastings overlooking their organic vineyards.
                    Laetitia Vineyard and Winery specializes in sparkling wines and pinot noir, with a beautiful tasting
                    room and patio.
                  </p>
                  <p>
                    For those who want to venture further, Paso Robles — one of California's largest and most diverse wine
                    regions — is 30-40 minutes north. With over 200 wineries specializing in bold reds, Rhone varietals, and
                    innovative blends, Paso Robles offers a perfect day trip from Arroyo Grande. Many wine tour companies
                    will pick up directly from the estate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Casitas Estate Feature */}
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
                  Casitas Estate: Seven Acres of Wine Country, Exclusively Yours
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Our flagship Arroyo Grande property is the Casitas Estate — a seven-acre wine country compound that
                    sleeps up to 14 guests across six private king suites. The estate features a 3,700 square foot Main
                    House with a full commercial kitchen, bar, and dining room that seats the entire group, plus five
                    private casitas scattered across the grounds, each with its own king bed, fireplace, and en-suite bathroom.
                  </p>
                  <p>
                    The grounds are designed for gathering and relaxation. A private pool and hot tub sit surrounded by
                    vineyard views with no neighbors in sight. A full-size bocce court is tucked into the landscape for
                    afternoon tournaments. Walking trails wind through the full seven acres, past oak trees and working
                    vines, offering the kind of space and privacy that simply does not exist at a hotel or resort.
                  </p>
                  <p>
                    The Casitas Estate is ideal for family reunions, corporate retreats, wedding parties, and milestone
                    celebrations. It is a whole-estate booking — all six suites, the Main House, pool, hot tub, bocce court,
                    and all seven acres are reserved exclusively for your group. No other guests, no shared spaces, no
                    schedules imposed on you.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
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
                Arroyo Grande & Wine Country Vacation Rentals
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Private estate living in the heart of Central Coast wine country.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] rounded-xl bg-muted mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : displayProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProperties.map((property, index) => (
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

        {/* Why Book with Solmaré */}
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
                Why Book with Solmaré Stays
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We are a local team that lives on the Central Coast. This is not a side hustle — it is our business and our passion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: 'Best Rate Guarantee',
                  description:
                    'Book direct and save 10-15% versus Airbnb or Vrbo. No service fees, no hidden charges, just straightforward pricing.',
                },
                {
                  icon: ShieldCheck,
                  title: '50-Point Clean Standard',
                  description:
                    'Every home is inspected against a 50-point checklist before your arrival. We document it on video so you arrive to perfection.',
                },
                {
                  icon: Clock,
                  title: '24/7 Local Support',
                  description:
                    'We are available around the clock by phone or text. Need a dinner reservation or help with the property? We are on it.',
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
                  <div className="w-16 h-16 rounded-full bg-ocean flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
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
                Frequently Asked Questions About Arroyo Grande
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
                Book Your Wine Country Getaway
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Seven private acres of Central Coast wine country — reserved entirely for your group. Book direct for the best rates.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Browse The Collection</Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contact" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Plan Your Group Trip
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
              <Link to="/central-coast" className="hover:text-ocean transition-colors">
                Central Coast Vacation Rentals
              </Link>
              <span className="text-border">|</span>
              <Link to="/collection" className="hover:text-ocean transition-colors">
                All Properties
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArroyoGrandePage;
