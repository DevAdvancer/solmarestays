import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import avilaImg from '/home/avila.webp';
import sloImg from '/home/san-luis.webp';
import pismoImg from '/home/pismo-beach.webp';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useProperties } from '@/hooks/useProperties';
import { PropertyMap } from '@/components/properties/PropertyMap';

const locations = [
  {
    id: 'avila',
    name: 'Avila Beach',
    image: avilaImg,
    imagePosition: 'center 30%',
    description: 'A coastal sanctuary known for its calm waters, sunny micro-climate, and walkable beachfront promenade. The sunniest spot on the Central Coast.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Avila+Beach,+CA',
  },
  {
    id: 'ag',
    name: 'Arroyo Grande',
    image: pismoImg,
    imagePosition: 'center 40%',
    description: 'A charming village nestled between the coast and rolling hills. Award-winning wineries, scenic trails, and a historic downtown.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Arroyo+Grande,+CA',
  },
  {
    id: 'slo',
    name: 'San Luis Obispo',
    image: sloImg,
    imagePosition: 'center bottom',
    description: 'Where historic charm meets modern sophistication. World-class vineyards and a vibrant downtown nestled in the coastal foothills.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=San+Luis+Obispo,+CA',
  },
];

export function LocationSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const { data: properties = [] } = useProperties();

  // Merge Sanity data with hardcoded images/links
  // If Sanity data exists, find the matching location by ID or Name to apply the image
  // Fallback to default 'locations' if no data
  const mergedLocations = useMemo(() => {
    if (!data?.locations || data.locations.length === 0) return locations;

    return data.locations.map((loc: any) => {
      // Find matching hardcoded location to get the image and mapLink
      // Matching by name is safest if IDs aren't consistent
      const match = locations.find(l => l.name === loc.name || l.id === loc.name.toLowerCase().replace(' ', ''));
      return {
        id: match?.id || 'unknown',
        name: loc.name, // Use name from Sanity
        description: loc.description, // Use description from Sanity
        image: match?.image || avilaImg,
        imagePosition: match?.imagePosition || 'center bottom',
        mapLink: loc.mapLink || match?.mapLink
      };
    });
  }, [data]);

  const activeLocation = mergedLocations[activeLocationIndex] || mergedLocations[0];

  const filteredProperties = useMemo(() => {
    if (!activeLocation) return [];
    return properties.filter(p => p.location.includes(activeLocation.name));
  }, [properties, activeLocation?.name]);

  if (!activeLocation) return null;

  return (
    <section ref={ref} className="relative bg-background overflow-hidden">
      {/* Full Screen Image Background with Transition */}
      <div className="relative h-[75vh] min-h-[550px] max-h-[750px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeLocation.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={activeLocation.image}
            alt={activeLocation.name}
            style={{ objectPosition: activeLocation.imagePosition || 'center bottom' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />

        {/* Glass Content Box */}
        <div className="absolute bottom-0 right-0 w-full md:w-[700px] lg:w-[800px] bg-white/10 backdrop-blur-md border-t border-l border-white/15 p-6 md:p-8 lg:p-10 rounded-tl-[3rem] shadow-2xl z-10 transition-all duration-500">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="font-serif text-3xl md:text-4xl font-light text-white mb-6 text-right whitespace-nowrap"
              dangerouslySetInnerHTML={{ __html: data?.heading || "Where you can find us" }}
            />

            {/* Buttons Row */}
            <div className="flex flex-wrap justify-end gap-2 md:gap-3 mb-6">
              {mergedLocations.map((loc: any, index: number) => (
                <button
                  key={loc.id + index}
                  onClick={() => setActiveLocationIndex(index)}
                  onMouseEnter={() => setActiveLocationIndex(index)}
                  className={cn(
                    "rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover-3d",
                    index === activeLocationIndex
                      ? "bg-white text-foreground shadow-medium"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="text-right mb-6">
              <motion.div
                key={activeLocation.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  {activeLocation.description}
                </p>
              </motion.div>
            </div>

            {/* Map Container - Floating 3D Look */}
            <div className="relative w-full h-[250px] rounded-2xl overflow-hidden shadow-elevated bg-secondary/30 group hover:scale-[1.01] transition-transform duration-500 isolate">
              <motion.div
                key={activeLocation.id} // Re-mount map when location changes to force re-center
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <PropertyMap properties={filteredProperties} height="100%" />
              </motion.div>

              {/* External Link Overlay */}
              <a
                href={activeLocation.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:scale-110 transition-transform text-foreground hover:text-primary z-[1001]"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
