import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const standards = [
  {
    title: 'Professionally Managed Homes',
    description: 'Every Solmaré property is locally managed with consistent standards and hands-on oversight.',
  },
  {
    title: 'Designed for Real Stays',
    description: 'Our homes are curated for comfort, flow, and repeat visits—not high-volume turnover.',
  },
  {
    title: 'Care Without Compromise',
    description: 'From guest communication to property care, every stay is handled with accountability and attention.',
  },
];

export function ManagementSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const heading = data?.heading || "THE SOLMARÉ STANDARD";
  const displayStandards = data?.features?.map((f: any) => ({
    title: f.title,
    description: f.description
  })) || standards;

  return (
    <section ref={ref} className="section-padding bg-secondary relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            {heading}
          </h2>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {displayStandards.map((standard: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4 leading-tight">
                {standard.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                {standard.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
