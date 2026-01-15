import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import avilaBeachImage from '@/assets/avila-beach.jpg';
import { MapPin } from 'lucide-react';

const locations = [
  {
    name: 'Avila Beach',
    color: 'bg-ocean',
    description: 'Avila Beach offers a relaxed, upscale escape with year-round sunshine, oceanfront dining, and a laid-back vibe. Just minutes from San Luis Obispo, it\'s perfect for beach days, wine tasting, and sunset strolls along the shore.',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25884.25447087949!2d-120.75!3d35.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ec48e7b76e3d1d%3A0x8c8c8c8c8c8c8c8c!2sAvila%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
    coordinates: { lat: 35.18, lng: -120.73 },
  },
  {
    name: 'San Luis Obispo',
    color: 'bg-gold',
    description: 'San Luis Obispo is the heart of California\'s Central Coast. A vibrant downtown, renowned wineries, and access to stunning natural landscapes make it an ideal base for exploring the region.',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25884.25447087949!2d-120.66!3d35.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf523a871483d%3A0x7c8c8c8c8c8c8c8c!2sSan%20Luis%20Obispo%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
    coordinates: { lat: 35.28, lng: -120.66 },
  },
];

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-background overflow-hidden">
      {/* Full Screen Image Background */}
      <div className="relative h-[90vh] min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={avilaBeachImage}
          alt="California Central Coast"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
              {/* Left Side - Title & Location Cards */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-8 leading-tight">
                  Where you can<br />find us
                </h2>
                
                {/* Location Cards */}
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                      className="group relative"
                      onMouseEnter={() => setHoveredLocation(index)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    >
                      <div className="bg-white rounded-xl p-5 shadow-elevated cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`w-4 h-4 rounded-full ${location.color} flex-shrink-0`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="font-serif text-xl font-semibold text-foreground">
                                {location.name}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 group-hover:line-clamp-none transition-all">
                              {location.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Map Preview on Hover */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={hoveredLocation === index ? { opacity: 1, height: 200 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden mt-4 rounded-lg"
                        >
                          <iframe
                            src={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=13&output=embed`}
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Right Side - Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden lg:block"
              >
                <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/90">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    A Hidden Gem on the Central Coast
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're here to unwind or explore, the Central Coast delivers coastal 
                    charm with a refined touch. From world-class wineries to pristine beaches, 
                    discover why this is California's best-kept secret.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-20 h-20 bg-gold/20 rounded-full blur-xl hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-40 right-1/4 w-32 h-32 bg-ocean/20 rounded-full blur-2xl hidden lg:block"
        />
      </div>
    </section>
  );
}
