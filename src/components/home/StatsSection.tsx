import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, MapPin, Home, Award } from 'lucide-react';

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ from, to, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (value) => setDisplayValue(value));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

const stats = [
  { 
    icon: MapPin,
    value: 100, 
    suffix: '%',
    label: 'Local', 
    description: 'We Know This Coast By Heart',
    hasCounter: true,
  },
  { 
    icon: Home,
    value: 10, 
    suffix: '+',
    label: 'Properties',
    description: 'Curated Coastal Rentals',
    hasCounter: true,
  },
  { 
    icon: Star,
    value: 5, 
    suffix: '-Star',
    label: 'Rated', 
    description: 'On All Booking Platforms',
    hasCounter: true,
  },
  { 
    icon: Award,
    value: 500, 
    suffix: '+',
    label: 'Happy Guests', 
    description: 'And Counting',
    hasCounter: true,
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-secondary relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-96 h-96 bg-ocean/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Solmaré Stays offers curated, high-end vacation rentals along California's Central Coast—delivering elevated coastal stays with style, comfort, and personalized hospitality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-elevated transition-all duration-500 text-center h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ocean/10 mb-4 group-hover:bg-ocean/20 transition-colors"
                >
                  <stat.icon className="w-7 h-7 text-ocean" />
                </motion.div>
                
                {/* Counter */}
                <div className="font-serif text-4xl lg:text-5xl font-semibold text-primary mb-2">
                  {stat.hasCounter ? (
                    <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.value}{stat.suffix}</span>
                  )}
                </div>
                
                {/* Label */}
                <div className="text-lg font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ocean/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
