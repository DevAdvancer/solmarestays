import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group property-card"
    >
      <Link to={`/property/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover property-card-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm text-white font-medium bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
              From ${property.startingPrice}/night
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
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
