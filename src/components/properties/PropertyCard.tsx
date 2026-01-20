import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group property-card"
    >
      <Link to={`/property/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-soft group-hover:shadow-elevated transition-shadow duration-500">
          <motion.img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover property-card-image"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Tag */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm text-white font-semibold bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              From ${property.startingPrice}/night
            </span>
          </div>

          {/* View Details CTA */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-white font-medium flex items-center gap-2">
              View Details
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
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
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(property.averageReviewRating!)
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
