import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Dog, Heart, MapPin, TreePine, Coffee, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const petFaqs = [
  {
    question: 'Can I bring my dog to your Avila Beach vacation rentals?',
    answer:
      'Yes! We welcome well-behaved dogs at select properties, including The Palm House and The Pine House. Both homes are located steps from the beach and are set up with pet-friendly touches to make your furry companion feel right at home.',
  },
  {
    question: 'Is there a pet fee?',
    answer:
      'Yes, a modest pet fee is added to cover the additional deep cleaning required after pet stays. The exact amount varies by property and is disclosed during the booking process. This ensures our homes remain spotless for every guest, including those with allergies.',
  },
  {
    question: 'Are there size or breed restrictions?',
    answer:
      'We generally welcome dogs of all sizes at our pet-friendly properties. However, we ask that all dogs be house-trained, non-destructive, and comfortable in a vacation home environment. Please contact us if you have questions about a specific breed or situation.',
  },
  {
    question: 'Are there dog-friendly beaches near Avila Beach?',
    answer:
      'Absolutely. Avila Beach Dog Beach (at the far west end of the main beach) allows off-leash dogs and is a local favorite. You can also walk the paved Bob Jones Trail with your pup or explore the scenic trails around Ontario Ridge. Several outdoor restaurant patios in town are dog-friendly as well.',
  },
  {
    question: 'What pet amenities are provided?',
    answer:
      'Our pet-friendly homes include water bowls, pet waste bags, and recommendations for local pet-friendly restaurants and activities. We want your dog to have as great a vacation as you do.',
  },
  {
    question: 'Can I bring a cat or other pet?',
    answer:
      'Currently, our pet-friendly policy applies to dogs only. If you have a specific request for another type of pet, please reach out to us directly and we will do our best to accommodate you.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: petFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const dogActivities = [
  {
    icon: Dog,
    title: 'Avila Beach Dog Beach',
    description:
      'The western end of Avila Beach is an off-leash paradise where your pup can splash in the waves and play in the sand. This designated dog-friendly area is one of the most beloved spots on the Central Coast for four-legged visitors.',
  },
  {
    icon: TreePine,
    title: 'Bob Jones Trail',
    description:
      'This scenic paved trail winds through lush creek-side foliage from Ontario Road to Avila Beach. Perfect for morning walks or evening strolls with your dog on-leash, the 2.8-mile trail is flat, shaded, and beautiful year-round.',
  },
  {
    icon: Heart,
    title: 'Avila Valley Barn',
    description:
      'A local favorite just minutes from Avila Beach, this farm stand and petting zoo welcomes leashed dogs on the outdoor grounds. Pick up fresh produce, grab a famous milkshake, and let the family (pup included) enjoy the farm atmosphere.',
  },
  {
    icon: Coffee,
    title: 'Pet-Friendly Dining',
    description:
      'Several Avila Beach restaurants offer dog-friendly outdoor patios, including the Custom House, Blue Moon Over Avila, and the Avila Beach Golf Resort restaurant. Enjoy fresh seafood and sunset views with your companion by your side.',
  },
];

function FAQItem({ faq, index }: { faq: typeof petFaqs[0]; index: number }) {
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

const PetFriendlyPage = () => {
  const { data: properties = [], isLoading } = useProperties();
  const activitiesRef = useRef(null);

  const petFriendlyProperties = properties.filter((property) =>
    property.amenities.some(
      (amenity) =>
        amenity.toLowerCase().includes('pet') || amenity.toLowerCase().includes('dog')
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pet-Friendly Vacation Rentals in Avila Beach"
        description="Bring your dog to the beach. Our pet-friendly Avila Beach vacation rentals welcome four-legged family members with open arms. Book a dog-friendly coastal getaway today."
        schema={faqSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Collection', url: 'https://www.solmarestays.com/collection' },
          { name: 'Pet-Friendly Rentals', url: 'https://www.solmarestays.com/pet-friendly' },
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
                <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center">
                  <Dog className="w-6 h-6 text-white" />
                </div>
                <span className="text-ocean font-medium text-sm tracking-wide uppercase">
                  Pet-Friendly Stays
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Pet-Friendly Vacation Rentals in Avila Beach
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Your dog deserves a vacation too. Our select pet-friendly rentals on California's
                Central Coast let you bring the whole family — four-legged members included — for a
                truly unforgettable beach getaway.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="xl" asChild>
                  <a href="#pet-properties">View Pet-Friendly Homes</a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask About Pet Policies
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
                  Why Avila Beach Is the Perfect Dog-Friendly Destination
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Planning a vacation shouldn't mean leaving your best friend behind. Avila Beach
                    is one of the most dog-friendly destinations on California's Central Coast, with
                    a dedicated off-leash dog beach, miles of scenic trails, and a welcoming
                    community that treats dogs like the VIPs they are.
                  </p>
                  <p>
                    At Solmaré Stays, we understand that pets are family. That's why we offer
                    carefully selected pet-friendly vacation rentals that welcome your dog with the
                    same warmth and attention to detail we bring to every guest experience. Our
                    pet-friendly homes are located within walking distance of the beach, local
                    parks, and outdoor dining — so you and your pup can enjoy every moment of your
                    Central Coast retreat together.
                  </p>
                  <p>
                    Whether you're looking for a cozy bungalow for a couple and their dog or a
                    larger home for a family trip, our{' '}
                    <Link to="/collection" className="text-ocean hover:underline">
                      curated collection
                    </Link>{' '}
                    has a pet-friendly option that fits your needs. Each home is professionally
                    cleaned to our rigorous 50-point standard after every stay, ensuring a fresh
                    and allergen-free environment for all guests.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pet-Friendly Properties */}
        <section id="pet-properties" className="section-padding bg-secondary scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Our Pet-Friendly Homes
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These properties welcome well-behaved dogs so your whole family can enjoy the coast
                together.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] rounded-xl bg-muted mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : petFriendlyProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {petFriendlyProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Pet-friendly properties are loading. Please check back shortly.
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

        {/* Pet Policies */}
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
                  Our Pet Policy
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    We want your stay to be stress-free for both you and your pet. Here's what to
                    know before booking a pet-friendly Avila Beach rental with Solmaré Stays:
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Dogs are welcome</strong> at designated pet-friendly properties.
                      Currently, The Palm House and The Pine House accept dogs of all sizes.
                    </li>
                    <li>
                      <strong>A pet fee applies</strong> to cover the enhanced deep cleaning
                      required after pet stays. This fee is clearly disclosed at booking time.
                    </li>
                    <li>
                      <strong>Dogs must be house-trained</strong> and well-behaved. We ask that
                      pets not be left unattended in the home for extended periods.
                    </li>
                    <li>
                      <strong>Pet amenities provided:</strong> water bowls, waste bags, and a
                      local guide to dog-friendly spots around Avila Beach.
                    </li>
                    <li>
                      <strong>Guests are responsible</strong> for any pet-related damage. A
                      refundable damage deposit may apply.
                    </li>
                  </ul>
                  <p>
                    Have specific questions about bringing your pet? Our team is happy to help.{' '}
                    <Link to="/contact" className="text-ocean hover:underline">
                      Contact us
                    </Link>{' '}
                    and we'll make sure your dog's vacation is as well-planned as yours.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dog-Friendly Activities */}
        <section ref={activitiesRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Dog-Friendly Activities in Avila Beach
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From off-leash beaches to scenic trails and pet-friendly patios, Avila Beach has
                everything your dog could dream of.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dogActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-soft border border-border/30"
                >
                  <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center mb-6">
                    <activity.icon className="w-7 h-7 text-white" />
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

        {/* Tips Section */}
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
                  Tips for Traveling with Pets to the Central Coast
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    A pet-friendly vacation on the Central Coast is easier than you might think.
                    Here are a few tips to help you and your dog make the most of your trip:
                  </p>
                  <ol className="space-y-3">
                    <li>
                      <strong>Book early.</strong> Pet-friendly vacation rentals in Avila Beach are
                      in high demand, especially during summer months and holiday weekends. Reserve
                      your stay well in advance to secure the best dates.
                    </li>
                    <li>
                      <strong>Pack the essentials.</strong> Bring your dog's food, leash, favorite
                      toys, and any medications. While we provide water bowls and waste bags,
                      having familiar items from home helps your pet settle in faster.
                    </li>
                    <li>
                      <strong>Know the local rules.</strong> Avila Beach Dog Beach (at the west end
                      of the main beach) allows off-leash dogs, but dogs must be leashed on the
                      main beach area. The Bob Jones Trail also requires leashes.
                    </li>
                    <li>
                      <strong>Plan for the weather.</strong> Central Coast weather is generally
                      mild, but summer days can get warm. Bring extra water for your pup and
                      plan beach time for mornings or late afternoons when the sand is cooler.
                    </li>
                    <li>
                      <strong>Scout vet services.</strong> The Central Coast has excellent
                      veterinary clinics in nearby San Luis Obispo and Pismo Beach. Save a local
                      vet's number in your phone, just in case.
                    </li>
                    <li>
                      <strong>Explore beyond the beach.</strong> Take your dog on a wine country
                      drive (many Edna Valley tasting rooms have dog-friendly patios), visit Avila
                      Valley Barn, or hike the trails at Montana de Oro State Park.
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
                Everything you need to know about bringing your pet to Avila Beach.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {petFaqs.map((faq, index) => (
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
                Book Your Pet-Friendly Getaway
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                The coast is calling — for both of you. Browse our pet-friendly rentals, book
                direct for the best rates, and start planning an Avila Beach vacation the whole
                family can enjoy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/collection">Browse The Collection</Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contact" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Us
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

export default PetFriendlyPage;
