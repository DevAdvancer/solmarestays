import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function StatsSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const introText = data?.introText || "Solmaré Stays is a curated collection of high-end vacation rentals along California's Central Coast, where refined design meets effortless coastal living. Each home is thoughtfully prepared to deliver a seamless, elevated stay from arrival to departure.";

  return (
    <section ref={ref} className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Centered Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
            {introText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
