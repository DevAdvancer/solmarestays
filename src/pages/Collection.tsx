import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { format, addDays, isSameDay, isWithinInterval } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyMap } from '@/components/properties/PropertyMap';
import { useProperties } from '@/hooks/useProperties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CollectionPage = () => {
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sleepsFilter, setSleepsFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<string>('none');
  const [petFriendly, setPetFriendly] = useState<boolean>(false);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const { data: properties = [], isLoading, error } = useProperties();

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      // Location filter
      if (locationFilter !== 'all' && property.location !== locationFilter) return false;

      // Sleeps filter
      if (sleepsFilter !== 'all') {
        const sleeps = parseInt(sleepsFilter);
        if (property.sleeps < sleeps) return false;
      }

      // Pet-friendly filter
      if (petFriendly) {
        const hasPetAmenity = property.amenities.some(
          (amenity) => amenity.toLowerCase().includes('pet') || amenity.toLowerCase().includes('dog')
        );
        if (!hasPetAmenity) return false;
      }

      return true;
    });

    // Sort by price
    if (priceSort === 'low-high') {
      result = [...result].sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (priceSort === 'high-low') {
      result = [...result].sort((a, b) => b.startingPrice - a.startingPrice);
    }

    return result;
  }, [properties, locationFilter, sleepsFilter, petFriendly, priceSort]);

  const locations = [...new Set(properties.map((p) => p.location))];

  // Clear date filters
  const clearDates = () => {
    setCheckIn(undefined);
    setCheckOut(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Collection"
        description="Browse our curated collection of luxury vacation rentals in Avila Beach and Pismo Beach. Find the perfect home for your coastal retreat."
      />
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
        <section className="py-6 border-b border-border bg-card">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Date Filters */}
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[140px] justify-start text-left font-normal',
                        !checkIn && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, 'MMM d') : 'Check-in'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={(date) => {
                        setCheckIn(date);
                        if (date && (!checkOut || checkOut <= date)) {
                          setCheckOut(addDays(date, 1));
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <span className="text-muted-foreground">→</span>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[140px] justify-start text-left font-normal',
                        !checkOut && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, 'MMM d') : 'Check-out'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date < (checkIn ? addDays(checkIn, 1) : new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {(checkIn || checkOut) && (
                  <Button variant="ghost" size="icon" onClick={clearDates} className="h-9 w-9">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block h-8 w-px bg-border" />

              {/* Sleeps Filter */}
              <Select value={sleepsFilter} onValueChange={setSleepsFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sleeps" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guests</SelectItem>
                  <SelectItem value="2">2+ Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                  <SelectItem value="6">6+ Guests</SelectItem>
                  <SelectItem value="8">8+ Guests</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Sort */}
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Default</SelectItem>
                  <SelectItem value="low-high">Price: Low → High</SelectItem>
                  <SelectItem value="high-low">Price: High → Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Pet-Friendly Toggle */}
              <div className="flex items-center gap-2 ml-auto">
                <Switch
                  id="pet-friendly"
                  checked={petFriendly}
                  onCheckedChange={setPetFriendly}
                />
                <Label htmlFor="pet-friendly" className="text-sm cursor-pointer">
                  Pet-Friendly
                </Label>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {/* Results count */}
            {!isLoading && !error && (
              <p className="text-muted-foreground mb-6">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] rounded-xl bg-muted mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Unable to load properties. Please try again later.
                </p>
              </div>
            ) : filteredProperties.length > 0 ? (
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

        {/* Map Section */}
        {!isLoading && !error && filteredProperties.length > 0 && (
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10"
              >
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  Explore Our Properties
                </h2>
                <p className="text-muted-foreground text-lg">
                  Click on a pin to view property details.
                </p>
              </motion.div>
              <PropertyMap properties={filteredProperties} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage;
