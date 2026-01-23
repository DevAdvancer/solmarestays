import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  index?: number;
  maskPrice?: boolean;
}

export function PropertyCard({ property, index = 0, maskPrice = false }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group property-card"
    >
      <Link to={`/property/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-soft group-hover:shadow-medium transition-shadow duration-300">
          <motion.img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover property-card-image"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Tag */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-xs text-white font-medium bg-foreground/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {maskPrice ? '$XXX' : `$${property.startingPrice}`}/night
            </span>
          </div>

          {/* View Details CTA */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-white text-sm font-medium">
              View Details
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {property.name}
          </h3>
          {property.averageReviewRating && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.round(property.averageReviewRating!)
                      ? 'fill-gold text-gold'
                      : 'text-muted-foreground/30'
                      }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                {property.averageReviewRating.toFixed(1)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5 group-hover:text-ocean transition-colors">
              <MapPin className="w-4 h-4" />
              {property.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Sleeps {property.sleeps}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{property.unitType}</p>
        </div>
      </Link>
    </motion.article>
  );
}
