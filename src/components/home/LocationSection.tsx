import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import avilaBeachImage from '@/assets/avila-beach.jpg';

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Where you can find us
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-ocean" />
              <span className="font-serif text-xl text-foreground">Avila Beach</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span className="font-serif text-xl text-foreground">San Luis Obispo</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-elevated"
          >
            <img
              src={avilaBeachImage}
              alt="Avila Beach sunset"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Avila Beach: A Hidden Gem on the Central Coast
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Avila Beach offers a relaxed, upscale escape with year-round sunshine, oceanfront dining, and a laid-back vibe. Just minutes from San Luis Obispo, it's perfect for beach days, wine tasting, and sunset strolls along the shore. Whether you're here to unwind or explore, Avila delivers coastal charm with a refined touch.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
