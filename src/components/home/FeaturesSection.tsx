import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    number: '1',
    title: 'Curated Coastal Stays',
    description: 'Where every property is carefully selected for its design, location, and comfort—offering a boutique-level experience with all the style and space of a private home.',
  },
  {
    number: '2',
    title: 'Effortless Arrival',
    description: 'Where self-check-in, clear communication, and personalized welcome info ensure your stay begins smoothly—from the moment you book to the moment you arrive.',
  },
  {
    number: '3',
    title: 'Impeccable Standards',
    description: 'Where spotless sanitation, premium linens, and thoughtful amenities reflect our commitment to luxury, comfort, and care in every detail.',
  },
  {
    number: '4',
    title: 'Insider Access',
    description: 'Where tailored local recommendations connect you with the best of the Central Coast—from hidden beaches and wine tasting to farm-to-table dining and scenic hikes.',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              How we manage our work?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We are a dedicated team of hospitality professionals committed to delivering elevated vacation experiences along California's Central Coast. Specializing in luxury short-term rentals, we manage high-end properties with an emphasis on design, cleanliness, and guest satisfaction. Our work goes beyond traditional property management—we curate every stay with thoughtful touches, local expertise, and meticulous care.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/why-choose-us">About Us</Link>
            </Button>
          </motion.div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold mb-4">
                  {feature.number}
                </span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
