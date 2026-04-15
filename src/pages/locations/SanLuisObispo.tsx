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
  MapPin, GraduationCap, Wine, Utensils, Mountain, ShoppingBag,
  ChevronDown, ChevronUp, MessageCircle, Star, ShieldCheck, Clock
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is there to do in San Luis Obispo?',
    answer: 'San Luis Obispo offers a wonderful mix of culture, dining, and outdoor adventure. Stroll through the charming downtown centered on Higuera Street, visit the historic Mission San Luis Obispo de Tolosa, attend the legendary Thursday Night Farmers Market, hike to the top of Bishop Peak or Cerro San Luis for panoramic views, explore the SLO Museum of Art, browse the weekly Farmers Market, and enjoy world-class restaurants and craft breweries. The Cal Poly campus offers events, performances, and beautiful grounds to explore.',
  },
  {
    question: 'How far is San Luis Obispo from the beach?',
    answer: 'San Luis Obispo is approximately 10-15 minutes from Avila Beach and 15 minutes from Pismo Beach by car. This makes it an excellent home base for guests who want to split their time between the beach and the vibrant downtown scene. Our properties in SLO and the surrounding area give you easy access to multiple beaches along the Central Coast.',
  },
  {
    question: 'When is the SLO Farmers Market?',
    answer: 'The famous San Luis Obispo Thursday Night Farmers Market (known locally as "Farmers") takes place every Thursday evening year-round on Higuera Street downtown. From approximately 6pm to 9pm, several blocks of Higuera are closed to traffic and filled with farm stands, food vendors, live music, and thousands of locals and visitors. It is widely considered one of the best farmers markets in the country and is a must-do experience during your stay.',
  },
  {
    question: 'Is San Luis Obispo a good place for a family vacation?',
    answer: 'Absolutely. San Luis Obispo is one of the most family-friendly towns on the Central Coast. The Thursday Night Farmers Market is a hit with kids, the hiking trails offer adventures for all ages, the San Luis Obispo Children Museum is excellent for younger children, and the proximity to multiple beaches means you can build in daily beach time. The overall pace of the town is relaxed and welcoming, making it easy to enjoy quality family time.',
  },
  {
    question: 'What is the weather like in San Luis Obispo?',
    answer: 'San Luis Obispo enjoys a Mediterranean climate with warm, dry summers and mild, wet winters. Summer temperatures typically range from 70-85 degrees Fahrenheit, while winters are mild at 50-65 degrees. The town gets more sunshine than the immediate coast due to its inland location, though it is close enough to benefit from ocean breezes. Spring and fall offer some of the best weather with comfortable temperatures and fewer crowds.',
  },
  {
    question: 'What wineries are near San Luis Obispo?',
    answer: 'San Luis Obispo is surrounded by world-class wine country. The Edna Valley wine region, just minutes south of downtown, is known for exceptional chardonnay and pinot noir. Further north, Paso Robles (30-40 minutes) offers over 200 wineries specializing in bold reds like cabernet sauvignon and Rhone varieties. Closer to the coast, the See Canyon area near Avila Beach has a dozen tasting rooms. You could spend weeks exploring the wine scene and still not visit every producer.',
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
  name: 'Solmaré Stays - San Luis Obispo Vacation Rentals',
  description:
    'Vacation rentals in San Luis Obispo, California. Explore downtown SLO, Cal Poly, wine country, and the Central Coast beaches from professionally managed homes.',
  url: 'https://www.solmarestays.com/san-luis-obispo',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Luis Obispo',
    addressRegion: 'CA',
    postalCode: '93401',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.2828,
    longitude: -120.6596,
  },
};

const highlights = [
  {
    icon: Utensils,
    title: 'Downtown Dining Scene',
    description:
      'From farm-to-table cuisine to craft cocktails, Higuera Street is packed with restaurants that rival much larger cities. SLO punches well above its weight.',
  },
  {
    icon: GraduationCap,
    title: 'Cal Poly & Campus Events',
    description:
      'Home to California Polytechnic State University, SLO has a youthful energy and year-round campus events, performances, and sports.',
  },
  {
    icon: Wine,
    title: 'Wine Country Gateway',
    description:
      'Minutes from Edna Valley and an easy drive to Paso Robles. SLO is the perfect base for exploring over 250 wineries.',
  },
  {
    icon: Mountain,
    title: 'Hiking & Nine Morros',
    description:
      'Bishop Peak, Cerro San Luis, and Madonna Mountain offer stunning hikes with panoramic views of the coast and inland valleys.',
  },
  {
    icon: ShoppingBag,
    title: 'Thursday Night Farmers Market',
    description:
      'One of the most famous farmers markets in California. Every Thursday, Higuera Street transforms into a festival of food, music, and community.',
  },
  {
    icon: MapPin,
    title: 'Central to Everything',
    description:
      'SLO sits at the crossroads of the Central Coast. Beaches, wine country, Big Sur, and Hearst Castle are all within easy reach.',
  },
];

const SanLuisObispoPage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Show SLO-area properties, plus nearby Avila properties
  const sloProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        p.location.toLowerCase().includes('san luis') ||
        p.location.toLowerCase().includes('slo') ||
        p.location.toLowerCase().includes('monterey heights')
    );
  }, [properties]);

  // If no strict SLO match, show all properties as they're all in SLO County
  const displayProperties = sloProperties.length > 0 ? sloProperties : properties;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="San Luis Obispo Vacation Rentals"
        description="Book vacation rentals in San Luis Obispo, California. Explore downtown SLO, Cal Poly, wine country, and the Central Coast beaches. Professionally managed homes with best rate guarantee."
        schema={locationSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com' },
          { name: 'San Luis Obispo Vacation Rentals', url: 'https://www.solmarestays.com/san-luis-obispo' },
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
                San Luis Obispo Vacation Rentals
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Stay in one of California's happiest cities. Downtown dining, world-class wine country, and beach access
                in every direction — all from the heart of the Central Coast.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a href="#properties">View SLO Area Homes</a>
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
                  San Luis Obispo: The Happiest City in America
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    San Luis Obispo — or SLO, as locals call it — has been named one of the happiest cities in America,
                    and it does not take long to understand why. Nestled in the coastal hills between Los Angeles and San
                    Francisco, this small city of about 47,000 residents combines the cultural richness of a university
                    town with the relaxed pace of a Central Coast community. It is the kind of place where people come
                    for a visit and start planning their next trip before they leave.
                  </p>
                  <p>
                    The heart of San Luis Obispo is its vibrant downtown, centered on Higuera Street. This tree-lined
                    main street is filled with locally owned restaurants, boutiques, coffee shops, and wine bars. The
                    architecture is a charming mix of Spanish colonial, Victorian, and modern California styles, anchored
                    by the Mission San Luis Obispo de Tolosa, one of the original California missions founded in 1772.
                    San Luis Obispo Creek runs through downtown, crossed by pedestrian bridges and lined with pathways
                    that connect the mission to the rest of the city.
                  </p>
                  <p>
                    For travelers, San Luis Obispo is an ideal base for exploring the Central Coast. The city sits at the
                    intersection of Highway 101 and Highway 1, putting you within easy reach of Avila Beach (10 minutes),
                    Pismo Beach (15 minutes), Morro Bay (20 minutes), Paso Robles wine country (30 minutes), and even
                    Hearst Castle and Big Sur (60-90 minutes). Our San Luis Obispo vacation rentals let you enjoy the
                    best of the city while keeping the entire Central Coast at your doorstep.
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
                What Makes San Luis Obispo Special
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A walkable downtown, world-class wine, and outdoor adventures around every corner.
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
                  Downtown SLO: Dining, Culture & the Thursday Night Farmers Market
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    The dining scene in San Luis Obispo is exceptional for a city its size. Novo Restaurant & Lounge
                    serves global fusion cuisine on a beautiful creekside patio that is one of the most romantic dining
                    spots on the Central Coast. Ember, a farm-to-table restaurant specializing in wood-fired cooking,
                    consistently appears on regional best-of lists. Luna Red offers Spanish-inspired tapas and craft
                    cocktails in a historic adobe building. For casual fare, Firestone Grill's tri-tip sandwiches are a
                    local legend, and Big Sky Cafe serves creative California comfort food with a health-conscious twist.
                  </p>
                  <p>
                    The Thursday Night Farmers Market is SLO's signature event and one of the best farmers markets in
                    the Western United States. Every Thursday from approximately 6pm to 9pm, several blocks of Higuera
                    Street are closed to traffic and transformed into an outdoor festival. Local farmers sell fresh
                    produce, artisan bakers offer fresh bread and pastries, and food vendors line the street with
                    barbecue, tacos, crepes, and every type of cuisine you can imagine. Live music fills the air from
                    multiple stages, and the atmosphere is festive, family-friendly, and uniquely SLO. If your visit
                    coincides with a Thursday, do not miss it.
                  </p>
                  <p>
                    Beyond dining, downtown SLO has a thriving arts and culture scene. The San Luis Obispo Museum of Art,
                    the Fremont Theatre (a beautifully restored 1942 art deco movie palace), and the Performing Arts
                    Center at Cal Poly host events ranging from indie films to world-class concerts. The Bubblegum Alley
                    on Higuera Street — a narrow lane covered floor to ceiling with chewed gum — is a quirky, only-in-SLO
                    attraction that everyone photographs at least once.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Deep Content: Outdoors & Wine */}
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
                  Hiking, Wine Country & Outdoor Adventures
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    San Luis Obispo is surrounded by a chain of volcanic peaks known as the Nine Sisters or the Morros,
                    which stretch from Morro Bay to the city itself. Several of these peaks offer outstanding hiking
                    trails with panoramic views. Bishop Peak (1,559 feet) is the tallest and most popular, offering a
                    moderately challenging hike with sweeping views of the coast, the city, and the inland valleys. Cerro
                    San Luis (also known as Madonna Mountain) provides a gentler hike with equally impressive views,
                    including a lighted "M" on its face that is visible from town. Both trailheads are minutes from
                    downtown.
                  </p>
                  <p>
                    The wine country surrounding San Luis Obispo is world-class. The Edna Valley, just 10 minutes south
                    of downtown, is one of California's coolest wine-growing regions, producing exceptional chardonnay
                    and pinot noir. Wineries like Tolosa, Baileyana, and Edna Valley Vineyard offer tastings with
                    stunning valley views. The Edna Valley's cool maritime influence creates wines with bright acidity
                    and complex flavors that stand apart from the warmer regions to the north.
                  </p>
                  <p>
                    Paso Robles, 30-40 minutes north via Highway 101, is one of California's fastest-growing wine
                    regions with over 200 wineries and a charming downtown square. Known for bold Rhone varietals like
                    syrah and grenache, as well as powerful cabernet sauvignon and zinfandel, Paso Robles offers a more
                    rustic, agricultural wine country experience compared to Napa Valley — with prices to match. Many
                    guests plan day trips to Paso Robles and return to their San Luis Obispo vacation rental in the evening.
                  </p>
                  <p>
                    Cal Poly San Luis Obispo, California Polytechnic State University, adds a vibrant dimension to the
                    city. The campus itself is beautiful, set against the hills with gardens, organic farms, and
                    architectural landmarks. Cal Poly regularly hosts cultural events, sporting events, lectures, and
                    performances that are open to the public. Parents visiting students will find our SLO vacation rentals
                    far more comfortable and private than hotel rooms, especially during busy weekends like graduation,
                    parents' weekend, and homecoming.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Monterey Heights Feature */}
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
                  Our San Luis Obispo Neighborhood: Monterey Heights
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Our San Luis Obispo vacation rental is located in the desirable Monterey Heights neighborhood, a
                    quiet, residential area with easy access to both downtown SLO and the beach communities. Monterey
                    Heights is known for its tree-lined streets, friendly neighbors, and proximity to hiking trails
                    including the popular Cerro San Luis (Madonna Mountain) trail.
                  </p>
                  <p>
                    From Monterey Heights, you are a quick drive to downtown Higuera Street for dining and the Thursday
                    Night Farmers Market, 10-15 minutes to Avila Beach for sand and surf, and perfectly positioned to
                    explore wine country in the Edna Valley or Paso Robles. The neighborhood is peaceful and family-friendly,
                    offering the kind of relaxed home base that hotels simply cannot match.
                  </p>
                  <p>
                    Like all Solmaré Stays properties, our San Luis Obispo home is professionally managed to hotel-quality
                    standards. Expect a spotless home, premium linens, a fully equipped kitchen, and a digital guidebook
                    packed with our personal recommendations for the best restaurants, hikes, wineries, and hidden gems
                    in the area.
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
                San Luis Obispo Area Vacation Rentals
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professionally managed homes in SLO and surrounding communities.
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
                Frequently Asked Questions About San Luis Obispo
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
                Book Your San Luis Obispo Getaway
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Experience the happiest city in America. Book direct for the best rates — guaranteed.
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
              <Link to="/central-coast" className="hover:text-ocean transition-colors">
                Central Coast Vacation Rentals
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

export default SanLuisObispoPage;
