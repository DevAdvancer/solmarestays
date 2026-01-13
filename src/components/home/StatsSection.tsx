import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: '100% Local', description: 'We Know This Coast By Heart' },
  { value: '10+', label: 'Properties' },
  { label: '5-Star Rated', description: 'On All Booking Platforms' },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Solmaré Stays offers curated, high-end vacation rentals along California's Central Coast—delivering elevated coastal stays with style, comfort, and personalized hospitality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center p-6"
            >
              {stat.value ? (
                <>
                  <span className="font-serif text-5xl lg:text-6xl font-semibold text-primary block mb-2">
                    {stat.value}
                  </span>
                  <span className="text-lg text-foreground font-medium">{stat.label}</span>
                </>
              ) : (
                <>
                  <span className="font-serif text-2xl lg:text-3xl font-semibold text-primary block mb-2">
                    {stat.label}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
