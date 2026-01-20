import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Paul',
    date: 'March 2025',
    property: 'Coral House',
    rating: 5,
    text: 'Such a great place to stay! Kyle was an excellent host that helped us out with everything we might need to enjoy our trip to Avila. Would definitely stay here again.',
  },
  {
    id: 2,
    name: 'Chasity',
    date: 'Feb 2025',
    property: 'Pine House',
    rating: 5,
    text: 'Beautiful stay! 30 second walk to the beach! Super clean and plenty of amenities for a few nights. I will definitely be going back and Kyle was a great host!',
  },
  {
    id: 3,
    name: 'Sarah',
    date: 'Jan 2025',
    property: 'Ocean View Retreat',
    rating: 5,
    text: 'The perfect getaway! The property was immaculate, the views were breathtaking, and the attention to detail made us feel right at home. We can\'t wait to return!',
  },
];

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Guest Reviews
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Hear what our guests have to say about their coastal getaways with Solmaré Stays.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center mb-6">
                <Quote className="w-5 h-5 text-ocean" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground leading-relaxed mb-6 font-light">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.property} • {review.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
