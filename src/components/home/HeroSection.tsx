import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarTwin } from '@/components/ui/calendar-twin';
import { useBooking } from '@/context/BookingContext';
import { cn } from '@/lib/utils';

import heroImage1 from '/home/home-12.webp'
import heroImage2 from '/home/home-29.webp'
import heroImage3 from '/home/home-09.webp'

const defaultSlides = [
  { image: heroImage1, alt: 'Luxury coastal living room' },
  { image: heroImage2, alt: 'California Central Coast pier' },
  { image: heroImage3, alt: 'Coastal bedroom with ocean view' },
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function HeroSection({ data }: { data?: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const { checkIn, checkOut, guests, setDateRange, setGuests } = useBooking();

  // Use data from Sanity if available, otherwise fallback to defaults
  const slides = defaultSlides; // Keeping slides static for now as Sanity image handling requires a builder
  const heading = data?.title || "Where the Sun Meets<br />the Sea in Style";
  const subheading = data?.subtitle || "Curated Boutique Management & Elevated Stays on the Central Coast.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSearch = () => {
    navigate('/collection');
  };

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full Screen Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Split Layout Container */}
        <div className="relative z-20 h-full container mx-auto px-4 md:px-8 lg:px-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr] gap-8 lg:gap-16 w-full items-center">

            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white"
            >
              <h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-4 tracking-tight"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
              <p className="text-white/90 text-lg md:text-xl font-light tracking-wide mb-8 max-w-lg">
                {subheading}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 rounded-lg px-8 h-12 text-base font-medium transition-all"
                  asChild
                >
                  <Link to="/collection">Explore Properties</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:text-white hover:bg-white/30 px-8 h-12 text-base font-medium transition-all bg-white/20 border border-white/40"
                  asChild
                >
                  <Link to="/why-choose-us">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right: Floating Booking Widget (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="hidden lg:block w-full lg:w-auto"
            >
              <div className="bg-white rounded-2xl shadow-elevated p-5">
                <h3 className="font-serif text-lg font-medium text-foreground mb-5">
                  Find Your Perfect Stay
                </h3>

                <div className="space-y-4">
                  {/* Date Range Picker */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Dates
                    </label>
                    <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            'w-full flex items-center gap-2 p-3 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-left',
                            (checkIn || checkOut) && 'text-foreground'
                          )}
                        >
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className={cn('text-sm', !(checkIn || checkOut) && 'text-muted-foreground')}>
                            {checkIn && checkOut
                              ? `${format(checkIn, 'MMM d')} → ${format(checkOut, 'MMM d')}`
                              : checkIn
                                ? `${format(checkIn, 'MMM d')} → Select end`
                                : 'Select dates'}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarTwin
                          value={{ from: checkIn, to: checkOut }}
                          onChange={(range) => {
                            setDateRange(range.from, range.to);
                          }}
                          onComplete={() => {
                            setDatePopoverOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests Dropdown */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Guests
                    </label>
                    <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
                      <PopoverTrigger asChild>
                        <button className="w-full flex items-center justify-between gap-2 p-3 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{guests} Guest{guests > 1 ? 's' : ''}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2" align="start">
                        <div className="space-y-1">
                          {guestOptions.map((num) => (
                            <button
                              key={num}
                              onClick={() => {
                                setGuests(num);
                                setGuestPopoverOpen(false);
                              }}
                              className={cn(
                                'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                                guests === num
                                  ? 'bg-primary text-primary-foreground'
                                  : 'hover:bg-secondary'
                              )}
                            >
                              {num} Guest{num > 1 ? 's' : ''}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Search Button */}
                  <Button
                    size="lg"
                    className="w-full bg-foreground text-white hover:bg-foreground/90 rounded-lg h-12 text-base font-medium mt-2"
                    onClick={handleSearch}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Mobile Sticky Book Now Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-white/20 lg:hidden pb-safe">
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 h-12 shadow-lg bg-primary text-primary-foreground font-semibold text-lg"
              onClick={handleSearch}
            >
              Book Now
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 border border-black/5 active:scale-95 transition-transform hover:bg-white/80 shrink-0">
                  <Calendar className="w-6 h-6 text-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 mb-4" align="end" side="top">
                <CalendarTwin
                  value={{ from: checkIn, to: checkOut }}
                  onChange={(range) => setDateRange(range.from, range.to)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Navigation Controls - Minimal (Desktop Only) */}
        <div className="absolute bottom-10 left-12 z-20 hidden lg:flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators - Subtle */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-3'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>


    </>
  );
}
