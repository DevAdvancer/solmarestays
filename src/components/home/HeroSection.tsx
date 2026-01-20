import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import heroImage1 from '@/assets/hero-1.jpg';
import heroImage2 from '@/assets/hero-2.jpg';
import heroImage3 from '@/assets/hero-3.jpg';

const slides = [
  { image: heroImage1, alt: 'Luxury coastal living room' },
  { image: heroImage2, alt: 'California Central Coast pier' },
  { image: heroImage3, alt: 'Coastal bedroom with ocean view' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full Screen Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
              <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            {/* Side Fades */}
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black/30 via-black/10 to-transparent pointer-events-none" />

            {/* Optional overlay to ensure text contrast if needed, strictly not needed with white box but good for depth */}
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Box - Floating Glass Card */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-20 md:left-20 z-20 md:max-w-xl lg:max-w-2xl bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-elevated border border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-[1.1] mb-4 tracking-tight">
            Solmaré Stays
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light tracking-wide mb-8">
            Where the Sun Meets the Sea in Style
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 rounded-md px-8 h-12 text-sm font-medium transition-all"
              asChild
            >
              <Link to="/collection">Explore Properties</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-foreground border-input hover:bg-accent hover:text-accent-foreground rounded-md px-8 h-12 text-sm font-medium transition-all"
              asChild
            >
              <Link to="/why-choose-us">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls - Custom Positioning */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators - Centered Bottom or near controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
              index === currentSlide ? 'bg-white w-10' : 'bg-white/50 w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
