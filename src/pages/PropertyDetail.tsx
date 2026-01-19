import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { ImageGallery } from '@/components/properties/ImageGallery';
import { usePropertyBySlug, useProperties } from '@/hooks/useProperties';
import { MapPin, Users, BedDouble, Bath, Check, ChevronLeft, Star, Wifi, Car, Coffee, Clock, ExternalLink, Book, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PropertyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading, error } = usePropertyBySlug(slug || '');
  const { data: allProperties = [] } = useProperties();
  const amenitiesRef = useRef(null);
  const isAmenitiesInView = useInView(amenitiesRef, { once: true, margin: '-100px' });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 md:pt-36">
          <section className="py-4 bg-secondary">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            </div>
          </section>
          <section className="py-6">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl bg-muted animate-pulse" />
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="h-10 bg-muted rounded w-1/3 mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Unable to Load Property
            </h1>
            <p className="text-muted-foreground mb-8">
              There was an error loading this property. Please try again later.
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

  // Property not found
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

  const otherProperties = allProperties.filter((p) => p.id !== property.id).slice(0, 3);

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return Wifi;
    if (lower.includes('parking') || lower.includes('car')) return Car;
    if (lower.includes('coffee') || lower.includes('kitchen')) return Coffee;
    return Check;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-36">
        {/* Back Navigation */}
        <section className="py-4 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <Link
              to="/collection"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Collection
            </Link>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-6">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <ImageGallery images={property.images} />
          </div>
        </section>

        {/* Property Header */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
            >
              <div>
                {property.averageReviewRating && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(property.averageReviewRating!) ? 'fill-current' : 'opacity-30'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {property.averageReviewRating.toFixed(1)} rating
                    </span>
                  </div>
                )}
                <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                  {property.name}
                </h1>
                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
                  >
                    <MapPin className="w-4 h-4 text-ocean" />
                    {property.location}
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
                  >
                    <BedDouble className="w-4 h-4 text-ocean" />
                    {property.bedrooms > 0 ? `${property.bedrooms} Bedroom${property.bedrooms > 1 ? 's' : ''}` : 'Studio'}
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
                  >
                    <Bath className="w-4 h-4 text-ocean" />
                    {property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
                  >
                    <Users className="w-4 h-4 text-ocean" />
                    Sleeps {property.sleeps}
                  </motion.span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="font-serif text-3xl font-semibold text-primary">
                  ${property.startingPrice}
                  <span className="text-base font-normal text-muted-foreground">/night</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
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
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                    {property.description}
                  </p>
                </motion.div>

                {/* Amenities */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-3 text-foreground bg-secondary p-4 rounded-xl hover:bg-secondary/80 transition-colors cursor-default"
                        >
                          <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-ocean" />
                          </div>
                          <span className="font-medium">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* House Rules */}
                {property.houseRules && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      House Rules
                    </h2>
                    <div className="bg-secondary rounded-xl p-6">
                      {/* Check-in/out times */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                          <Clock className="w-4 h-4 text-ocean" />
                          <span className="text-sm">
                            Check-in: {property.checkInTimeStart}:00 - {property.checkInTimeEnd}:00
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                          <Clock className="w-4 h-4 text-ocean" />
                          <span className="text-sm">Check-out: {property.checkOutTime}:00</span>
                        </div>
                      </div>

                      {/* House Rules Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <FileText className="w-4 h-4" />
                            View All House Rules
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl">House Rules</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-3 mt-4">
                            {property.houseRules
                              .split('\n')
                              .filter((line) => line.trim())
                              .map((rule, index) => {
                                const isHeader = rule.includes(':') && !rule.startsWith('-') && rule.indexOf(':') < 30;
                                return (
                                  <div
                                    key={index}
                                    className={`p-4 rounded-xl border border-border ${
                                      isHeader ? 'bg-primary/5 font-semibold' : 'bg-card'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      {!isHeader && (
                                        <div className="w-6 h-6 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                          <Check className="w-3 h-3 text-ocean" />
                                        </div>
                                      )}
                                      <span className={isHeader ? 'text-primary' : 'text-foreground'}>
                                        {rule.replace(/^[-•]\s*/, '').trim()}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </motion.div>
                )}

                {/* External Booking Links
                {(property.airbnbListingUrl || property.vrboListingUrl) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Book on Other Platforms
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {property.airbnbListingUrl && (
                        <Button variant="outline" asChild className="gap-2">
                          <a href={property.airbnbListingUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View on Airbnb
                          </a>
                        </Button>
                      )}
                      {property.vrboListingUrl && (
                        <Button variant="outline" asChild className="gap-2">
                          <a href={property.vrboListingUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View on Vrbo
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )} */}

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Location
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    {property.address}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Located in {property.location}, California's Central Coast. Close to beaches,
                    wine tasting, hiking trails, and local dining.
                  </p>
                  <div className="rounded-xl overflow-hidden h-[300px] shadow-soft">
                    <iframe
                      src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Booking Widget */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <BookingWidget property={property} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Properties */}
        {otherProperties.length > 0 && (
          <section className="section-padding bg-secondary">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl font-semibold text-foreground mb-8 text-center"
              >
                You May Also Like
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherProperties.map((prop, index) => (
                  <PropertyCard key={prop.id} property={prop} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
