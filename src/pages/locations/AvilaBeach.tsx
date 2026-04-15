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
  MapPin, Sun, Wine, Utensils, Waves, TreePine, Heart,
  ChevronDown, ChevronUp, MessageCircle, Star, ShieldCheck, Clock
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is the best time to visit Avila Beach?',
    answer: 'Avila Beach is a year-round destination, but the warmest and sunniest months are June through October when temperatures average 75-85 degrees Fahrenheit. Avila Beach is famously one of the sunniest spots on the Central Coast, sheltered from the fog that blankets neighboring towns. Spring (March-May) offers wildflower blooms and fewer crowds, while fall (September-November) delivers warm days, thinner crowds, and harvest season at local wineries.',
  },
  {
    question: 'How far is Avila Beach from Pismo Beach?',
    answer: 'Avila Beach is just 5-10 minutes south of Pismo Beach by car (roughly 5 miles via US-101). The two towns are close enough that many guests staying in Avila Beach visit Pismo Beach for dinner, shopping at the Premium Outlets, or walks on the pier. Shell Beach sits between the two towns and is equally accessible.',
  },
  {
    question: 'Is Avila Beach walkable?',
    answer: 'Absolutely. Avila Beach is one of the most walkable beach towns on the Central Coast. From most of our vacation rentals, you can walk to the beach, restaurants, shops, the pier, and the Avila Beach Promenade within minutes. The Bob Jones Trail also provides a scenic paved path for walking and biking from downtown Avila Beach into the valley.',
  },
  {
    question: 'Are there pet-friendly vacation rentals in Avila Beach?',
    answer: 'Yes, several of our Avila Beach vacation rentals welcome dogs. Each pet-friendly listing is clearly marked in our collection. Avila Beach itself is a wonderful destination for dogs, with a dog-friendly beach area and the Bob Jones Trail for scenic walks. Be sure to check the specific property listing for pet policies and any associated fees.',
  },
  {
    question: 'What is there to do in Avila Beach?',
    answer: 'Avila Beach offers an incredible range of activities. Enjoy the beach and calm waters ideal for swimming, kayaking, and paddleboarding. Walk or bike the Bob Jones Trail, visit Avila Valley Barn for fresh produce and animal encounters, explore the local wineries in the Avila Beach wine region, soak at Sycamore Mineral Springs, catch live music on the promenade, or take a short drive to Point San Luis Lighthouse. The Friday night farmers market is a local favorite.',
  },
  {
    question: 'How do I check in to a Solmaré Stays vacation rental?',
    answer: 'We offer completely self-service check-in with smart locks. After booking, you will receive a unique access code and detailed check-in instructions, including a digital guidebook for your specific property. No need to coordinate key pickups or meet anyone. Our team is available 24/7 by phone or text if you need anything during your stay.',
  },
  {
    question: 'Why should I book direct instead of through Airbnb or Vrbo?',
    answer: 'Booking direct with Solmaré Stays guarantees the best available rate. Third-party platforms charge service fees that inflate the price by 10-15%. When you book direct on our website, you skip those fees entirely and get our best-rate guarantee, plus direct communication with our local team from the moment you book.',
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
  '@type': 'VacationRental',
  name: 'Solmaré Stays - Avila Beach Vacation Rentals',
  description:
    'Premium vacation rentals in Avila Beach, California. Walk to the beach, downtown restaurants, and local wineries. Professionally managed homes with hotel-quality standards.',
  url: 'https://www.solmarestays.com/avila-beach',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Avila Beach',
    addressRegion: 'CA',
    postalCode: '93424',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.1797,
    longitude: -120.7311,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.7',
    ratingCount: '2429',
    bestRating: '10',
    worstRating: '1',
  },
};

const highlights = [
  {
    icon: Waves,
    title: 'Steps from the Beach',
    description:
      'Our Avila Beach properties are a short walk from the sand. Wake up, grab your coffee, and be at the water in minutes.',
  },
  {
    icon: Wine,
    title: 'Wine Country Access',
    description:
      'Over a dozen tasting rooms are within a 5-minute drive, including award-winning wineries like Kelsey See Canyon and Alapay Cellars.',
  },
  {
    icon: Utensils,
    title: 'Walkable Dining',
    description:
      'From fresh seafood at Custom House to tacos at Marisol, Avila Beach has restaurants for every mood, all within walking distance.',
  },
  {
    icon: Sun,
    title: 'Sunniest Spot on the Coast',
    description:
      'Protected by surrounding hills, Avila Beach enjoys more sunshine than any neighboring town, even when Pismo is fogged in.',
  },
  {
    icon: TreePine,
    title: 'Trails & Outdoors',
    description:
      'The Bob Jones Trail, Point San Luis Lighthouse hike, and Pecho Coast Trail are all accessible from town for every fitness level.',
  },
  {
    icon: Heart,
    title: 'Family & Dog Friendly',
    description:
      'Calm waves, a large sandy beach, a playground, and dog-friendly areas make Avila Beach the ideal destination for families and pet owners.',
  },
];

const AvilaBeachPage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const avilaProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        p.location.toLowerCase().includes('avila') ||
        p.location.toLowerCase().includes('san luis obispo') === false &&
          p.location.toLowerCase().includes('arroyo') === false &&
          p.location.toLowerCase().includes('grover') === false &&
          p.location.toLowerCase().includes('pismo') === false &&
          p.location.toLowerCase().includes('shell') === false
    );
  }, [properties]);

  // More targeted filter: just Avila Beach properties
  const strictAvilaProperties = useMemo(() => {
    return properties.filter((p) => p.location.toLowerCase().includes('avila'));
  }, [properties]);

  const displayProperties = strictAvilaProperties.length > 0 ? strictAvilaProperties : avilaProperties;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Avila Beach Vacation Rentals"
        description="Book the best Avila Beach vacation rentals. Walk to the beach, restaurants, and wineries. Professionally managed homes with hotel-quality standards on California's Central Coast. Best rate guaranteed when you book direct."
        schema={locationSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com' },
          { name: 'Avila Beach Vacation Rentals', url: 'https://www.solmarestays.com/avila-beach' },
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
                Avila Beach Vacation Rentals
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Stay steps from the sand in one of California's sunniest beach towns. Our handpicked Avila Beach
                vacation homes combine coastal charm with modern luxury, all professionally managed to hotel-quality
                standards.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a href="#properties">View Avila Beach Homes</a>
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

        {/* Introduction - Rich SEO Content */}
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
                  Why Avila Beach Is the Central Coast's Best-Kept Secret
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Tucked into a sheltered cove along California's Central Coast, Avila Beach is a small-town gem that
                    delivers everything you want from a California beach vacation without the crowds of Santa Barbara or
                    the traffic of Malibu. With a population of just over 1,600 residents, Avila Beach has the intimate,
                    welcoming feel of a town that has not been overrun by tourism, yet it offers world-class dining, wine
                    tasting, outdoor recreation, and one of the most beautiful stretches of sand on the Pacific Coast.
                  </p>
                  <p>
                    What makes Avila Beach truly special is its microclimate. Surrounded by coastal hills that block the
                    marine layer, Avila Beach enjoys significantly more sunshine than neighboring Pismo Beach, Morro Bay,
                    or San Luis Obispo. While fog might blanket the coast, Avila is often bathed in warm, golden
                    sunlight. This makes it an exceptional destination year-round, not just in the peak summer months.
                    Guests who have stayed in other Central Coast towns are often stunned by how much warmer and sunnier
                    Avila Beach is, even on the same day.
                  </p>
                  <p>
                    Our Avila Beach vacation rentals put you in the heart of the action. Most of our homes are within
                    walking distance of the beach, the promenade, downtown restaurants, and local shops. You will not
                    need your car once you arrive. Spend your mornings on the beach, your afternoons exploring the Bob
                    Jones Trail or tasting wine at one of a dozen nearby vineyards, and your evenings dining on fresh
                    seafood while watching the sun set over the Pacific.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Area Highlights Grid */}
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
                What Makes Avila Beach Special
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A walkable beach town with big personality and small-town charm.
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

        {/* Deep Content: The Beach & Downtown */}
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
                  The Beach, the Promenade & Downtown Avila
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Avila Beach's main beach is a wide, south-facing crescent of sand that stretches along the waterfront.
                    The calm, protected waters make it ideal for swimming, especially for families with young children who
                    want gentler waves than what you will find at Pismo or Morro Bay. Kayaking, stand-up paddleboarding,
                    and even open-water swimming are popular here thanks to the sheltered bay.
                  </p>
                  <p>
                    The Avila Beach Promenade runs along the waterfront and is the social heart of the town. On any given
                    evening, you will find live music, locals gathering at waterfront restaurants, and families strolling
                    along the path. The promenade connects the pier to the east end of the beach, making it easy to explore
                    the entire waterfront on foot. The Avila Beach Pier itself is a popular spot for fishing, crabbing, and
                    simply watching the sunset.
                  </p>
                  <p>
                    Downtown Avila Beach is compact but packed with character. Front Street is lined with restaurants,
                    ice cream shops, surf shops, and boutiques. Custom House serves excellent seafood with ocean views.
                    Marisol offers upscale Mexican cuisine right on the promenade. The Gardens of Avila restaurant at
                    Sycamore Mineral Springs provides a fine-dining experience surrounded by gardens. For casual bites,
                    Fat Cats Cafe, Mr. Rick's, and the Avila Beach Golf Resort round out the options.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Deep Content: Wineries & Outdoors */}
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
                  Wine Tasting, Hot Springs & Outdoor Adventures
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Avila Beach sits at the gateway to one of California's most exciting wine regions. The San Luis
                    Obispo Coast AVA includes over a dozen tasting rooms within a few minutes' drive of downtown Avila.
                    Kelsey See Canyon Vineyards, Alapay Cellars, Sinor-LaVallee, Peloton Cellars, and many more offer
                    tastings in relaxed, unpretentious settings. Unlike Napa or Paso Robles, you will not fight crowds or
                    need reservations weeks in advance. Many tasting rooms are tucked into the rolling hills of See Canyon
                    Road, where you can sip world-class pinot noir and chardonnay while overlooking apple orchards and the
                    Pacific.
                  </p>
                  <p>
                    For a truly unique experience, Sycamore Mineral Springs Resort offers private hot tubs fed by natural
                    mineral springs on a hillside overlooking the valley. You can book a private tub by the hour, day or
                    night, and soak under the oaks and stars. It is one of the most relaxing experiences on the entire
                    Central Coast and a favorite of returning guests.
                  </p>
                  <p>
                    The Bob Jones Trail is a paved, easy trail that runs from downtown Avila Beach through a beautiful
                    creek-side canyon for about three miles. It is perfect for walking, jogging, or biking and is accessible
                    for all fitness levels, including strollers and wheelchairs. At the inland end, you will find Avila
                    Valley Barn, a charming farm stand with fresh produce, hay rides, a petting zoo, and homemade pie that
                    is worth the trip on its own.
                  </p>
                  <p>
                    For more adventurous hikers, the Pecho Coast Trail leads from the edge of Avila Beach to the Point San
                    Luis Lighthouse, a beautifully restored 1890 lighthouse perched on the cliffs above the ocean. Guided
                    hikes and trolley tours are available on select days, offering panoramic views of the coastline and
                    frequent wildlife sightings including sea otters, harbor seals, and migrating whales.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Farmers Market & Events */}
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
                  The Avila Beach Farmers Market & Local Events
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    Every Friday evening from April through September, the Avila Beach Farmers Market and Fish &amp; Farm
                    Festival takes over the promenade. Local farms, fishermen, and food vendors set up along the waterfront
                    while live music fills the air. It is a beloved community tradition and one of the best ways to
                    experience the town like a local. Pick up fresh strawberries from a local farm, grab fish tacos from a
                    vendor, and enjoy dinner on the beach as the sun goes down.
                  </p>
                  <p>
                    Avila Beach also hosts several annual events that draw visitors from across the state. The Avila Beach
                    Blues Festival, the Avila Beach Octoberfest, and the Fourth of July celebration on the beach are just a
                    few of the highlights. Throughout the summer, the Avila Beach Community Foundation hosts free concerts
                    on the promenade, making Friday evenings in Avila Beach one of the best experiences on the Central
                    Coast.
                  </p>
                  <p>
                    Beyond the beach, the nearby town of San Luis Obispo (a 15-minute drive) offers its own legendary
                    Thursday Night Farmers Market on Higuera Street, a vibrant downtown with excellent shopping and dining,
                    and easy access to Cal Poly campus events. Pismo Beach and its boardwalk are just 10 minutes south,
                    giving you access to even more dining, the Pismo Beach pier, Dinosaur Caves Park, and the famous
                    Oceano Dunes.
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
                Our Avila Beach Vacation Rentals
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Each home is professionally managed, impeccably clean, and thoughtfully designed for your comfort.
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
                Why Book Your Avila Beach Rental with Solmaré Stays
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We are not a faceless booking platform. We are a local team that lives on the Central Coast and manages
                every property ourselves.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: 'Best Rate Guarantee',
                  description:
                    'Book direct and skip the 10-15% service fees charged by Airbnb and Vrbo. Our direct rates are always the lowest available.',
                },
                {
                  icon: ShieldCheck,
                  title: '50-Point Clean Standard',
                  description:
                    'Every home undergoes a rigorous 50-point inspection before your arrival. We document and verify every detail so you arrive to a spotless home.',
                },
                {
                  icon: Clock,
                  title: '24/7 Local Support',
                  description:
                    'Our team lives in the area and is available around the clock. Need a restaurant recommendation at 8pm or help with the hot tub at midnight? We are a text away.',
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

        {/* Nearby Destinations */}
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
                  Explore the Central Coast from Avila Beach
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    One of the biggest advantages of staying in Avila Beach is its central location along California's
                    Central Coast. You are perfectly positioned to explore some of the most beautiful and exciting
                    destinations in the state without long drives.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Pismo Beach</strong> (10 min) — The boardwalk, pier, Dinosaur Caves Park, and Oceano Dunes.{' '}
                      <Link to="/pismo-beach" className="text-ocean hover:underline">
                        Learn more about Pismo Beach
                      </Link>
                      .
                    </li>
                    <li>
                      <strong>San Luis Obispo</strong> (15 min) — Historic downtown, Thursday Night Farmers Market, Cal
                      Poly, and Higuera Street dining.{' '}
                      <Link to="/san-luis-obispo" className="text-ocean hover:underline">
                        Learn more about San Luis Obispo
                      </Link>
                      .
                    </li>
                    <li>
                      <strong>Paso Robles Wine Country</strong> (45 min) — Over 200 wineries, charming downtown square,
                      and world-class Rhone-style wines.
                    </li>
                    <li>
                      <strong>Morro Bay</strong> (30 min) — Morro Rock, the Embarcadero, sea otters, and excellent
                      seafood.
                    </li>
                    <li>
                      <strong>Hearst Castle & Big Sur</strong> (1-1.5 hrs) — One of America's most iconic drives along
                      Highway 1 with stops at Ragged Point, Elephant Seal rookery, and the castle itself.
                    </li>
                  </ul>
                </div>
              </motion.div>
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
                Frequently Asked Questions About Avila Beach Vacation Rentals
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

            {/* FAQ Schema */}
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
                Book Your Avila Beach Vacation Rental
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Skip the service fees. Book direct for the best rates on the Central Coast's sunniest beach town.
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
              <Link to="/central-coast" className="hover:text-ocean transition-colors">
                Central Coast Vacation Rentals
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

export default AvilaBeachPage;
