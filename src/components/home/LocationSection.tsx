import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import avilaImg from '@/assets/avila-beach.jpg';
import sloImg from '@/assets/hero-2.jpg';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const locations = [
  {
    id: 'avila',
    name: 'Avila Beach',
    image: avilaImg,
    description: 'A relaxed, upscale escape with year-round sunshine and oceanfront dining.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Avila+Beach,+CA',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25884.25447087949!2d-120.75!3d35.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ec48e7b76e3d1d%3A0x8c8c8c8c8c8c8c8c!2sAvila%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
  },
  {
    id: 'slo',
    name: 'San Luis Obispo',
    image: sloImg,
    description: 'The vibrant heart of the Central Coast, known for wineries and downtown charm.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=San+Luis+Obispo,+CA',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25884.25447087949!2d-120.66!3d35.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf523a871483d%3A0x7c8c8c8c8c8c8c8c!2sSan%20Luis%20Obispo%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
  },
  {
    id: 'pismo',
    name: 'Pismo Beach',
    image: avilaImg, // Will be replaced with Kyle's image when provided
    description: 'A classic California beach town with stunning sunsets, fresh seafood, and coastal adventures.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Pismo+Beach,+CA',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25884.25447087949!2d-120.64!3d35.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ec4319abe8f8d5%3A0x8c8c8c8c8c8c8c8c!2sPismo%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
  },
];

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const activeLocation = locations[activeLocationIndex];

  return (
    <section ref={ref} className="relative bg-background overflow-hidden">
      {/* Full Screen Image Background with Transition */}
      <div className="relative h-screen min-h-[700px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeLocation.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={activeLocation.image}
            alt={activeLocation.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />

        {/* Glass Content Box */}
        <div className="absolute bottom-0 right-0 w-full md:w-[600px] lg:w-[650px] bg-white/85 backdrop-blur-md border-t border-l border-white/40 p-8 md:p-12 lg:p-16 rounded-tl-[4rem] shadow-elevated z-10 transition-all duration-500">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 text-right">
              Where you can<br />find us
            </h2>

            {/* Buttons Row */}
            <div className="flex flex-wrap justify-end gap-2 md:gap-3 mb-8">
              {locations.map((loc, index) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocationIndex(index)}
                  onMouseEnter={() => setActiveLocationIndex(index)}
                  className={cn(
                    "rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover-3d",
                    index === activeLocationIndex
                      ? "bg-primary text-white shadow-medium"
                      : "bg-white/50 text-foreground hover:bg-white/80"
                  )}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="text-right mb-8">
              <motion.div
                key={activeLocation.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                  {activeLocation.description}
                </p>
              </motion.div>
            </div>

            {/* Map Container - Floating 3D Look */}
            <div className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-elevated bg-secondary/30 group hover:scale-[1.01] transition-transform duration-500">
              <motion.div
                 key={activeLocation.mapEmbed}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.6 }}
                 className="w-full h-full"
              >
                <iframe
                  src={activeLocation.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* External Link Overlay */}
              <a
                href={activeLocation.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:scale-110 transition-transform text-foreground hover:text-primary"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-8 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-end gap-2 font-medium">
                  <MapPin className="w-3 h-3" /> California Central Coast
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
