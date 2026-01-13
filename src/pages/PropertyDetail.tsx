import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { getPropertyBySlug, properties } from '@/data/properties';
import { MapPin, Users, BedDouble, Bath, Check, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/properties/PropertyCard';

const PropertyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = getPropertyBySlug(slug || '');

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Property Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/collection">View All Properties</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherProperties = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-card/95 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-2xl shadow-elevated"
              >
                <Link 
                  to="/collection" 
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Collection
                </Link>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  {property.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    {property.bedrooms > 0 ? `${property.bedrooms} Bedroom${property.bedrooms > 1 ? 's' : ''}` : 'Studio'}
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    {property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Sleeps {property.sleeps}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    About This Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {property.description}
                  </p>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-ocean" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Location
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Located in {property.location}, California's Central Coast. Close to beaches, 
                    wine tasting, hiking trails, and local dining. Perfect for exploring the 
                    best of SLO County.
                  </p>
                </motion.div>
              </div>

              {/* Booking Widget */}
              <div className="lg:col-span-1">
                <BookingWidget property={property} />
              </div>
            </div>
          </div>
        </section>

        {/* Other Properties */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherProperties.map((prop, index) => (
                <PropertyCard key={prop.id} property={prop} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
