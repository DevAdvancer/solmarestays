import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    number: '01',
    title: 'Curated Coastal Stays',
    description: 'Where every property is carefully selected for its design, location, and comfort—offering a boutique-level experience with all the style and space of a private home.',
  },
  {
    number: '02',
    title: 'Effortless Arrival',
    description: 'Where self-check-in, clear communication, and personalized welcome info ensure your stay begins smoothly—from the moment you book to the moment you arrive.',
  },
  {
    number: '03',
    title: 'Impeccable Standards',
    description: 'Where spotless sanitation, premium linens, and thoughtful amenities reflect our commitment to luxury, comfort, and care in every detail.',
  },
  {
    number: '04',
    title: 'Insider Access',
    description: 'Where tailored local recommendations connect you with the best of the Central Coast—from hidden beaches and wine tasting to farm-to-table dining and scenic hikes.',
  },
];

export function ManagementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-secondary relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Content - Sticky */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
                How we manage our work?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We are a dedicated team of hospitality professionals committed to delivering elevated vacation experiences along California’s Central Coast. Specializing in luxury short-term rentals, we manage high-end properties with an emphasis on design, cleanliness, and guest satisfaction. Our work goes beyond traditional property management—we curate every stay with thoughtful touches, local expertise, and meticulous care. From listing creation to guest communication and on-the-ground operations, we ensure every home is presented at its best and every guest feels at home.
              </p>
              <Button variant="outline" size="lg" asChild className="mb-8 lg:mb-0">
                <Link to="/why-choose-us">About Us</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Features Grid - Stacking Cards */}
          <div className="relative flex flex-col gap-8 pb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card p-8 md:p-12 rounded-3xl shadow-lg border border-border/50 sticky top-24 lg:top-32 min-h-[350px] flex flex-col justify-center"
              >
                <div className="flex flex-col gap-6">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-serif text-xl font-semibold shrink-0">
                      {feature.number}
                    </span>
                    <div>
                        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {feature.description}
                        </p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
