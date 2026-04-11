import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyMap } from '@/components/properties/PropertyMap';
import { useProperties } from '@/hooks/useProperties';
import { useAvailability } from '@/hooks/useAvailability';
import { useBooking } from '@/context/BookingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarTwin } from '@/components/ui/calendar-twin';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CollectionPage = () => {
  const [locationFilter, setLocationFilter] = useState<string>('all');
  // Use shared booking context
  const { checkIn, checkOut, guests, setDateRange, clearDates } = useBooking();

  // Sync sleepsFilter with guests from booking context on initial load
  const [sleepsFilter, setSleepsFilter] = useState<string>(
    guests > 1 ? guests.toString() : 'all'
  );
  // No price sorting by default
  const [priceSort, setPriceSort] = useState<string>('none');
  const [petFriendly, setPetFriendly] = useState<boolean>(false);

  const { data: properties = [], isLoading: isLoadingProperties, error } = useProperties();

  // Check availability when dates are selected
  const {
    availablePropertyIds,
    isCheckingAvailability
  } = useAvailability({
    properties,
    checkIn,
    checkOut,
    enabled: !!checkIn && !!checkOut,
  });

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      // Availability filter (when dates are selected)
      if (checkIn && checkOut && !availablePropertyIds.has(property.id)) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && property.location !== locationFilter) return false;

      // Sleeps filter (max occupancy)
      if (sleepsFilter !== 'all') {
        const requiredSleeps = parseInt(sleepsFilter);
        if (property.sleeps < requiredSleeps) return false;
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

    // Sort by price (only if selected)
    if (priceSort === 'low-high') {
      result = [...result].sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (priceSort === 'high-low') {
      result = [...result].sort((a, b) => b.startingPrice - a.startingPrice);
    }
    // If priceSort === 'none', no sorting is applied

    return result;
  }, [properties, checkIn, checkOut, availablePropertyIds, locationFilter, sleepsFilter, petFriendly, priceSort]);

  const locations = [...new Set(properties.map((p) => p.location))];
  const isLoading = isLoadingProperties || isCheckingAvailability;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Browse Our Vacation Rental Collection"
        description="Browse 12 vacation rentals in Avila Beach, Arroyo Grande, and San Luis Obispo. Studios to private estates sleeping 14. Pet-friendly options available. Book direct and save 15% vs. Airbnb — best rate guaranteed."
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Properties', url: 'https://www.solmarestays.com/collection' },
        ]}
      />
      <Header />
      <main className="pt-0">
        {/* Hero */}
        <section className="pt-24 md:pt-28 pb-8 md:pb-10 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
                The Solmaré Collection
              </h1>
              <p className="text-xl text-muted-foreground">
                A purposefully small portfolio of hand-selected estates, farmhouses, and beach bungalows. From the Avila shoreline to the valley vines, every stay is locally managed and meticulously prepared.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border bg-card">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Date Range Filter */}
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[260px] justify-start text-left font-normal',
                        !checkIn && !checkOut && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn && checkOut
                        ? `${format(checkIn, 'MMM d')} → ${format(checkOut, 'MMM d')}`
                        : checkIn
                          ? `${format(checkIn, 'MMM d')} → Select end`
                          : 'Select dates'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarTwin
                      value={{ from: checkIn, to: checkOut }}
                      onChange={(range) => {
                        setDateRange(range.from, range.to);
                      }}
                      onComplete={() => {
                        const trigger = document.querySelector('[data-state="open"]');
                        if (trigger) {
                          (trigger as HTMLElement).click();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {(checkIn || checkOut) && (
                  <Button variant="ghost" size="icon" onClick={clearDates} className="h-9 w-9">
                    <X className="h-4 w-4" />
                  </Button>
                )}

                {/* Availability loading indicator */}
                {isCheckingAvailability && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block h-8 w-px bg-border" />

              {/* Guests Filter - Updated label */}
              <Select value={sleepsFilter} onValueChange={setSleepsFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="# of Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all"># of Guests</SelectItem>
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

              {/* Price Sort - Default is now Starting Price */}
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Starting Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Starting Price</SelectItem>
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
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {/* Results count */}
            {!isLoading && !error && (
              <p className="text-muted-foreground mb-6">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                {checkIn && checkOut && (
                  <span className="ml-1">
                    for {format(checkIn, 'MMM d')} – {format(checkOut, 'MMM d')}
                  </span>
                )}
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
                  {checkIn && checkOut
                    ? 'No homes available for these dates. Try adjusting your search.'
                    : 'No properties match your filters. Try adjusting your search.'}
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
