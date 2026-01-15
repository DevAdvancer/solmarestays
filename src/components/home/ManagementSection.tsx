import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Camera, DollarSign, MessageSquare, Sparkles, Wrench, FileText, Palette, Phone } from 'lucide-react';
import avilaBeachImage from '@/assets/avila-beach.jpg';

const managementSteps = [
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'We capture your property at its best with professional photography and create compelling listings that attract high-quality guests.',
    number: '01',
  },
  {
    icon: DollarSign,
    title: 'Dynamic Pricing',
    description: 'Our advanced pricing algorithms adjust nightly rates based on demand, seasonality, and local events to maximize your revenue.',
    number: '02',
  },
  {
    icon: MessageSquare,
    title: 'Guest Communication',
    description: '24/7 guest support from booking to checkout. We handle all inquiries, concerns, and ensure 5-star experiences.',
    number: '03',
  },
  {
    icon: Sparkles,
    title: 'Professional Cleaning',
    description: 'Meticulous cleaning between every stay with hotel-quality linens and amenities to maintain your property\'s premium feel.',
    number: '04',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Inspections',
    description: 'Regular property inspections and coordinated maintenance to protect your investment and prevent issues.',
    number: '05',
  },
  {
    icon: FileText,
    title: 'Financial Reporting',
    description: 'Transparent monthly statements and real-time dashboards so you always know how your property is performing.',
    number: '06',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description: 'Expert staging and design consultation to ensure your property photographs beautifully and guests feel at home.',
    number: '07',
  },
  {
    icon: Phone,
    title: '24/7 Emergency Response',
    description: 'Round-the-clock emergency support for both guests and properties. Peace of mind, always.',
    number: '08',
  },
];

interface StackingCardProps {
  step: typeof managementSteps[0];
  index: number;
  totalCards: number;
  scrollYProgress: any;
}

function StackingCard({ step, index, totalCards, scrollYProgress }: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate the range for this card
  const startRange = index / totalCards;
  const endRange = (index + 1) / totalCards;
  
  // Transform values for stacking effect
  const scale = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [1, 0.95]
  );
  
  const y = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, -20]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [startRange, endRange, endRange + 0.1],
    [1, 1, index === totalCards - 1 ? 1 : 0.6]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        scale,
        y,
        opacity,
        zIndex: totalCards - index,
      }}
      className="sticky top-24 mb-8"
    >
      <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-500 group">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Number & Icon */}
          <div className="md:w-1/4 bg-primary p-8 flex flex-col items-center justify-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
            <span className="font-serif text-6xl md:text-7xl font-bold text-gold/30 absolute top-4 left-4">
              {step.number}
            </span>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-20 h-20 rounded-2xl bg-gold/20 flex items-center justify-center relative z-10"
            >
              <step.icon className="w-10 h-10 text-gold" />
            </motion.div>
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-3/4 p-8 md:p-10 flex flex-col justify-center">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
            
            {/* Decorative line */}
            <div className="mt-6 flex items-center gap-3">
              <motion.div 
                className="h-1 bg-gradient-to-r from-gold to-gold/30 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <div className="w-2 h-2 rounded-full bg-gold/50" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ManagementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1]);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <img
          src={avilaBeachImage}
          alt="Avila Beach background"
          className="w-full h-[120%] object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
          style={{ opacity: backgroundOpacity }}
        />
        <div className="absolute inset-0 bg-background/85" />
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-40 left-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl z-0"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-48 h-48 rounded-full bg-ocean/5 blur-3xl z-0"
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-primary/5 blur-2xl z-0"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md py-12 md:py-16 border-b border-border/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4"
            >
              Our Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground"
            >
              How We Manage Our Work
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {managementSteps.map((step, index) => (
            <StackingCard
              key={index}
              step={step}
              index={index}
              totalCards={managementSteps.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom spacer for scroll effect */}
      <div className="h-32" />
    </section>
  );
}
