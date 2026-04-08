import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  {
    value: '2,400+',
    title: 'Five-Star Guest Reviews',
    description: 'Across Airbnb, Vrbo & Direct',
  },
  {
    title: 'Locally Owned & Operated',
    description: 'Central Coast Based',
  },
  {
    title: 'Boutique Collection',
    description: 'Intentionally Limited Homes',
  },
  {
    title: 'High-Touch Guest Care',
    description: 'Direct Support, No Call Centers',
  },
];

export function StatsSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const introText = data?.introText || "Solmaré Stays is a premier collection of high-end vacation rentals along California's Central Coast. We specialize in curated hospitality, blending sophisticated design with the effortless ease of coastal living.";

  const displayStats = data?.stats?.map((s: any) => ({
    title: s.title,
    description: s.description
  })) || stats;

  return (
    <section ref={ref} className="py-24 bg-[#f8f7f5] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Centered Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
            {introText}
          </p>
        </motion.div>

        {/* Horizontal Stats Row - No Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-border/40 pt-12">
          {displayStats.map((stat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              {/* Value (if present) */}
              {stat.value && (
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-1 leading-none">
                  {stat.value}
                </p>
              )}

              {/* Bold Title */}
              <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 leading-tight">
                {stat.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground font-light">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
