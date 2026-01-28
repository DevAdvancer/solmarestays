import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '/home/home-29.webp';

export function CTASection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const heading = data?.heading || "Your Central Coast Story Starts Here.";
  const btnText = data?.buttonText || "Browse Properties";
  const btnLink = data?.buttonLink || "/collection";
  const secBtnText = data?.secondButtonText || "Get in touch";
  const secBtnLink = data?.secondButtonLink || "/contact";

  return (
    <section ref={ref} className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Full-width Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="California Central Coast lifestyle"
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center min-h-[500px] md:min-h-[600px]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-8 leading-tight"
            >
              {heading}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 rounded-lg px-8 h-12 text-base font-medium"
                asChild
              >
                <Link to={btnLink}>{btnText}</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:text-white hover:bg-white/10 rounded-lg px-8 h-12 text-base font-medium border border-white/40"
                asChild
              >
                <Link to={secBtnLink}>{secBtnText}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
