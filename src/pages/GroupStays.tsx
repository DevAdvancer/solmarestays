import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Users, Wine, Sun, Utensils, TreePine, MessageCircle, ChevronDown, ChevronUp, Home, Calendar } from 'lucide-react';

const groupFaqs = [
  {
    question: 'How many guests can your largest property accommodate?',
    answer:
      'Our largest property, Casitas Estate, sleeps up to 14 guests comfortably across multiple bedrooms. It is ideal for family reunions, wedding parties, and corporate retreats. For smaller groups, Hummingbird House sleeps 5 and La Casita sleeps 6.',
  },
  {
    question: 'Can we book multiple properties for a larger group?',
    answer:
      'Absolutely. Many of our guests book two or more of our bungalows or homes for groups of 10 to 20+ people. Our properties are located in close proximity to each other in Avila Beach and Pismo Beach, so your group can stay together while enjoying private accommodations. Contact us to coordinate a multi-property booking.',
  },
  {
    question: 'Is there a group discount for booking multiple properties?',
    answer:
      'We offer special rates for groups booking multiple properties or extended stays. Contact us directly to discuss your group size, dates, and needs, and we will put together a custom package with the best available pricing.',
  },
  {
    question: 'Are your properties good for weddings or events?',
    answer:
      'Several of our properties, especially Casitas Estate with its spacious layout and outdoor areas, are popular with wedding parties and small events. While large events cannot be hosted on-site, our homes make excellent bases for wedding weekends, rehearsal dinners, and pre/post-ceremony gatherings. We can recommend local venues for the ceremony itself.',
  },
  {
    question: 'What amenities are available for groups?',
    answer:
      'Our properties come equipped with full kitchens, spacious living areas, outdoor spaces, Wi-Fi, smart TVs, and everything you need for a comfortable group stay. Larger properties like Casitas Estate feature multiple bathrooms, ample parking, and generous common areas designed for group gatherings.',
  },
  {
    question: 'How far in advance should we book for a group trip?',
    answer:
      'For group bookings, especially during peak season (June through September) and holiday weekends, we recommend booking 3 to 6 months in advance. Popular properties and multi-property combinations fill up quickly. Contact us early to lock in your preferred dates.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groupFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const groupActivities = [
  {
    icon: Wine,
    title: 'Wine Country Tours',
    description:
      'The Central Coast is home to world-class wine regions. Book a group tour through Edna Valley or Paso Robles wine country, with over 200 wineries to explore. Many offer private tastings and group packages perfect for celebrations.',
  },
  {
    icon: Sun,
    title: 'Beach Days',
    description:
      'Avila Beach and Pismo Beach offer miles of pristine coastline for your group. Set up for a beach bonfire, try paddleboarding together, or simply enjoy the California sun. Our local guides can arrange beach gear rentals for groups of any size.',
  },
  {
    icon: Utensils,
    title: 'Group Dining',
    description:
      'From farm-to-table restaurants in San Luis Obispo to waterfront dining in Avila Beach, the Central Coast culinary scene caters to groups. We can recommend restaurants that accommodate large parties and even arrange private chef experiences at your rental.',
  },
  {
    icon: TreePine,
    title: 'Outdoor Adventures',
    description:
      'Hike the Bob Jones Trail together, explore the tide pools at Montana de Oro, or kayak in the bay as a group. The Central Coast is an outdoor playground with activities for every fitness level and interest.',
  },
];

function FAQItem({ faq, index }: { faq: typeof groupFaqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
      >
        <h3 className="font-serif text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </motion.div>
  );
}

const GROUP_PROPERTY_NAMES = [
  'la casita',
  'hummingbird',
  'casitas estate',
];

const GroupStaysPage = () => {
  const { data: properties = [], isLoading } = useProperties();

  const groupProperties = useMemo(() => {
    return properties.filter((property) =>
      GROUP_PROPERTY_NAMES.some((name) => property.name.toLowerCase().includes(name))
    );
  }, [properties]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Group Vacation Rentals on California's Central Coast"
        description="Plan the perfect group getaway to Avila Beach. Our vacation rentals sleep 5 to 14+ guests, with options to book multiple properties for larger groups. Ideal for reunions, weddings, and retreats."
        schema={faqSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Collection', url: 'https://www.solmarestays.com/collection' },
          { name: 'Group Stays', url: 'https://www.solmarestays.com/group-stays' },
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
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-ocean" />
                </div>
                <span className="text-ocean font-medium text-sm tracking-wide uppercase">
                  Group Getaways
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Group Vacation Rentals on California's Central Coast
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Whether it's a family reunion, a friend getaway, a wedding weekend, or a corporate
                retreat — our curated properties provide the space, comfort, and location to bring
                your group together on the coast.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="xl" asChild>
                  <a href="#group-properties">View Group-Friendly Homes</a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Plan Your Group Trip
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro Content */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  The Central Coast: Your Group's Next Destination
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Planning a group vacation is one of the most rewarding — and challenging —
                    things you can do. Finding a destination that offers enough space, the right
                    activities, and accommodations everyone will love? That's where Solmare Stays
                    comes in.
                  </p>
                  <p>
                    Located in{' '}
                    <Link to="/collection" className="text-ocean hover:underline">
                      Avila Beach, Pismo Beach, and the surrounding Central Coast
                    </Link>
                    , our vacation rentals are designed for groups who want more than a hotel room.
                    Full kitchens for group meals, spacious living areas for gathering, outdoor
                    spaces for relaxation, and prime locations steps from the beach — our homes
                    give your group the freedom and flexibility that hotels simply can't match.
                  </p>
                  <p>
                    From intimate getaways of 5 guests to large reunions of 14 or more, we have
                    properties that fit. And for the biggest gatherings, you can book multiple
                    nearby properties to create a private compound experience for your group.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Group-Friendly Properties */}
        <section id="group-properties" className="section-padding bg-secondary scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Our Best Homes for Groups
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Spacious layouts, full kitchens, and room for everyone. These properties are ideal
                for group vacations on the Central Coast.
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
            ) : groupProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Group-friendly properties are loading. Please check back shortly.
                </p>
              </div>
            )}

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/collection">Browse All Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Multi-Property Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ocean/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Home className="w-10 h-10 text-ocean mb-3" />
                    <span className="font-serif text-3xl font-semibold text-foreground">11+</span>
                    <span className="text-muted-foreground text-sm mt-1">Properties</span>
                  </div>
                  <div className="bg-ocean/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Users className="w-10 h-10 text-ocean mb-3" />
                    <span className="font-serif text-3xl font-semibold text-foreground">20+</span>
                    <span className="text-muted-foreground text-sm mt-1">Max Guests</span>
                  </div>
                  <div className="bg-ocean/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center col-span-2">
                    <Calendar className="w-10 h-10 text-ocean mb-3" />
                    <span className="font-serif text-2xl font-semibold text-foreground">Custom Group Packages</span>
                    <span className="text-muted-foreground text-sm mt-1">Tailored to your needs</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2"
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Book Multiple Properties for Larger Groups
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Need space for more than 14 guests? No problem. Our portfolio of 11+ homes
                    across Avila Beach and the Central Coast means you can book several properties
                    in close proximity to create a private group compound experience.
                  </p>
                  <p>
                    Imagine your family reunion spread across three neighboring bungalows — each
                    family has their own private space, but everyone gathers for evening barbecues
                    and beach days. Or picture a corporate retreat where teams have their own homes
                    but come together for workshops and dinners.
                  </p>
                  <p>
                    We coordinate multi-property bookings regularly and can help you choose the
                    right combination of homes based on your group size, budget, and preferred
                    location.{' '}
                    <Link to="/contact" className="text-ocean hover:underline">
                      Contact us
                    </Link>{' '}
                    to start planning.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Group Activities */}
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
                Group Activities on the Central Coast
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From wine tours to beach bonfires, the Central Coast offers unforgettable
                experiences for groups of every kind.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {groupActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-soft border border-border/30"
                >
                  <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center mb-6">
                    <activity.icon className="w-7 h-7 text-ocean" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Tips */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  Tips for Planning a Group Trip to the Central Coast
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Organizing a group vacation doesn't have to be stressful. Here's our insider
                    advice for making it seamless:
                  </p>
                  <ol className="space-y-3">
                    <li>
                      <strong>Appoint a trip coordinator.</strong> Having one person manage the
                      booking, collect deposits, and communicate with our team streamlines
                      everything. We're happy to work directly with your coordinator to ensure
                      every detail is covered.
                    </li>
                    <li>
                      <strong>Book early for peak season.</strong> Summer weekends and holidays
                      (Memorial Day, Labor Day, Thanksgiving) book months in advance. For the
                      best selection of group-friendly properties, plan 3 to 6 months ahead.
                    </li>
                    <li>
                      <strong>Consider a midweek stay.</strong> Weekday rates are often more
                      favorable, and you'll find more availability. A Tuesday-through-Thursday
                      getaway can save your group significantly while avoiding weekend crowds.
                    </li>
                    <li>
                      <strong>Plan group meals in your rental.</strong> Our homes have full
                      kitchens, making it easy (and budget-friendly) to cook together. Local
                      markets and farm stands provide fresh, local ingredients. Assign different
                      households to different nights for a rotating dinner experience.
                    </li>
                    <li>
                      <strong>Mix group time with free time.</strong> The best group vacations
                      balance structured activities (a wine tour, a beach bonfire) with downtime
                      where people can do their own thing. Our properties provide plenty of space
                      for both.
                    </li>
                    <li>
                      <strong>Ask about our{' '}
                      <Link to="/experiences" className="text-ocean hover:underline">
                        guest experiences
                      </Link>
                      .</strong> We can help arrange local activities, restaurant recommendations,
                      and curated itineraries tailored to your group's interests and size.
                    </li>
                  </ol>
                </div>
              </motion.div>
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
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Common questions about planning a group vacation on the Central Coast.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {groupFaqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                Ready to Plan Your Group Getaway?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Tell us about your group, your dates, and your vision. We'll help you find the
                perfect combination of homes for an unforgettable Central Coast experience.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Us for Group Rates
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/collection">Browse The Collection</Link>
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

export default GroupStaysPage;
