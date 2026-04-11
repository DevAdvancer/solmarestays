import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Sparkles, ShieldCheck, Star } from 'lucide-react';

const pillars = [
  {
    icon: MapPin,
    title: 'Rooted in the Central Coast',
    description: 'We live here, operate here, and know every property personally. No remote management. No middlemen.',
  },
  {
    icon: Sparkles,
    title: 'Designed for Real Comfort',
    description: 'Every home is curated for the way guests actually use a space — not staged for photos and forgotten.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountable at Every Step',
    description: 'From booking to checkout, every detail is owned by someone on our team.',
  },
  {
    icon: Star,
    title: 'Built for Guests Who Come Back',
    description: "Our standard isn't a checklist. It's the reason our guests book again.",
  },
];

export function ManagementSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const heading = data?.heading || "THE SOLMARÉ STANDARD";

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

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 auto-rows-fr">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center flex flex-col"
            >
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light flex-1">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
