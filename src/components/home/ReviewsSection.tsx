import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';

const reviews = [
  {
    id: 1,
    name: 'Tamara',
    date: 'April 2026',
    property: 'Hummingbird House',
    rating: 5,
    text: 'We loved our stay at the Hummingbird House!! The house was immaculate and was exactly how it was in the photos. Our favorite part was the very open family room with the accordion style glass doors that open up to the most gorgeous ocean view.',
  },
  {
    id: 2,
    name: 'Emily',
    date: 'March 2026',
    property: 'The Coral House',
    rating: 5,
    text: 'A great location — multiple different restaurants within a block or two, one block from the beach boardwalk and close to the Bob Jones trail. The bikes were great to ride down to the different piers and beaches.',
  },
  {
    id: 3,
    name: 'Jasmin',
    date: 'March 2026',
    property: 'The Deckhouse',
    rating: 5,
    text: 'This was the perfect spot for my fiancé and I. We loved how clean it was and how it had everything we needed inside plus more. Overall it was very quiet, comfortable, convenient, and in a beautiful area.',
  },
  {
    id: 4,
    name: 'Kristine',
    date: 'March 2026',
    property: 'Hummingbird House',
    rating: 5,
    text: 'The Hummingbird House was absolutely perfect and even more beautiful than what I expected from the photos! The location is quiet and peaceful, but walkable to many fun spots in Avila. The property management team was incredibly responsive.',
  },
  {
    id: 5,
    name: 'Salvatore',
    date: 'March 2026',
    property: 'The Palm House',
    rating: 5,
    text: 'We had a great experience with this host! There was an unexpected repair issue with our original booking, but the host handled it perfectly. They communicated the situation immediately and seamlessly moved us to another beautiful property.',
  },
  {
    id: 6,
    name: 'Melanie',
    date: 'April 2026',
    property: 'Hummingbird House',
    rating: 5,
    text: 'Such a beautiful place! It is well laid out, spacious, and the views are fantastic. The furniture and linens are top notch, including the kitchen and all of the appliances. Super clean. We enjoyed our stay very much!',
  },
  {
    id: 7,
    name: 'Catherine',
    date: 'March 2026',
    property: 'Casa Azul',
    rating: 5,
    text: 'Great location! Kyle and team were really responsive as well as proactive. Nice to have a dedicated parking spot. The bungalow is just two blocks from the beach and was clean, cozy, and well-appointed.',
  },
  {
    id: 8,
    name: 'Mark',
    date: 'March 2026',
    property: 'Hummingbird House',
    rating: 5,
    text: 'This place was breathtaking! Beautiful views, exceptional decor and design, and comfortable furnishings. Wish we could have stayed longer!',
  },
  {
    id: 9,
    name: 'Sydney',
    date: 'April 2026',
    property: 'The Coral House',
    rating: 5,
    text: 'Well-appointed, comfortable, conveniently located, and a great home base for our SLO area vacation. We enjoyed morning walks to the beach, afternoons on the deck, and evening streaming on the big screen.',
  },
];

export function ReviewsSection({ data }: { data?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { data: properties = [] } = useProperties();

  const heading = data?.heading || "What Our Guests Say";
  const subtitle = data?.subtitle || "Real reviews from real stays on California's Central Coast.";

  const displayReviews = data?.reviews?.map((r: any, i: number) => ({
    id: i,
    name: r.name,
    date: r.date,
    property: r.property,
    rating: r.rating || 5,
    text: r.text
  })) || reviews;

  // Show 3 at a time on desktop, 1 on mobile
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayReviews.length / itemsPerPage);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const currentReviews = displayReviews.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  // Find property slug by matching name
  const getPropertySlug = (propertyName: string) => {
    const match = properties.find(p =>
      p.name.toLowerCase().includes(propertyName.toLowerCase()) ||
      propertyName.toLowerCase().includes(p.name.toLowerCase())
    );
    return match ? `/property/${match.slug}` : '/collection';
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section ref={ref} className="section-padding bg-secondary/50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto font-light">
            {subtitle}
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {currentReviews.map((review: any, index: number) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  className="bg-card rounded-xl p-6 shadow-soft border border-border/30 hover:shadow-medium transition-shadow duration-300 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground/20'}`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-foreground text-sm leading-relaxed mb-5 font-light flex-grow">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-medium text-foreground text-sm">{review.name}</p>
                    <Link
                      to={getPropertySlug(review.property)}
                      className="text-xs text-primary hover:text-primary/80 transition-colors hover:underline"
                    >
                      {review.property} • {review.date}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-soft hover:shadow-medium transition-all text-foreground"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-soft hover:shadow-medium transition-all text-foreground"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
