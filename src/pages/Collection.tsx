import { motion } from 'framer-motion';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { properties } from '@/data/properties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CollectionPage = () => {
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sleepsFilter, setSleepsFilter] = useState<string>('all');

  const filteredProperties = properties.filter((property) => {
    if (locationFilter !== 'all' && property.location !== locationFilter) return false;
    if (typeFilter !== 'all' && !property.unitType.toLowerCase().includes(typeFilter.toLowerCase())) return false;
    if (sleepsFilter !== 'all') {
      const sleeps = parseInt(sleepsFilter);
      if (property.sleeps < sleeps) return false;
    }
    return true;
  });

  const locations = [...new Set(properties.map((p) => p.location))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
                Discover Coastal Elegance
              </h1>
              <p className="text-xl text-muted-foreground">
                A handpicked selection of boutique stays along California's Central Coast.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-end">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Unit Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="casita">Casita</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sleepsFilter} onValueChange={setSleepsFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sleeps" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="2">2+ Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                  <SelectItem value="6">6+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No properties match your filters. Try adjusting your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage;
