import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// Using existing images as placeholders for partners
import img1 from '@/assets/hero-1.jpg';
import img2 from '@/assets/hero-2.jpg';
import img3 from '@/assets/hero-3.jpg';

const partners = [
  {
    name: "Rod & Hammer's California Whiskey",
    image: img1,
    category: "Spirits",
  },
  {
    name: "Inspired Dining Events",
    image: img2,
    category: "Private Chef",
  },
  {
    name: "Central Coast Bike Rental",
    image: img3,
    category: "Adventure",
  },
];

export function ExperienceSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const heading = data?.heading || "Experience the Central Coast<br />with Our Local Partners";
  const subtitle = data?.subtitle || "Handpicked local businesses that bring our guests closer to the coast — from craft spirits and beach gear to local eats and adventures.";

  const mergedPartners = data?.partners?.map((p: any) => {
    // Simple matching logic for images
    let image = img1;
    const lowerName = p.name.toLowerCase();
    if (lowerName.includes('wine') || lowerName.includes('roasting') || lowerName.includes('dining') || lowerName.includes('chef')) image = img2;
    else if (lowerName.includes('bike') || lowerName.includes('adventure')) image = img3;
    else if (lowerName.includes('whiskey') || lowerName.includes('spirits')) image = img1;

    return {
      name: p.name,
      category: p.category,
      image: image
    };
  }) || partners;

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, '<br />') }}
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mergedPartners.map((partner: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay Gradient (optional, for text visibility) */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Bottom White Bar - Visible on Hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-between z-10">
                <div className="pr-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {partner.category}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
