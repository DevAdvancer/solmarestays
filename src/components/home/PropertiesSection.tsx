import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { properties } from '@/data/properties';

export function PropertiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Show first 4 properties on homepage
  const featuredProperties = properties.slice(0, 4);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A handpicked selection of boutique stays along California's Central Coast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/collection">View All Properties</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
