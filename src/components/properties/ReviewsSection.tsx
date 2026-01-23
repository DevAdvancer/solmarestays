import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getReviewsForProperty } from '@/data/reviews';

interface ReviewsSectionProps {
  propertyName: string;
  propertyId: string;
  averageRating?: number | null;
}

export function ReviewsSection({ propertyName, propertyId, averageRating }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'rating-high' | 'rating-low'>('date');

  const allReviews = useMemo(() => getReviewsForProperty(propertyId), [propertyId]);

  const sortedReviews = useMemo(() => {
    const reviews = [...allReviews];
    switch (sortBy) {
      case 'rating-high':
        return reviews.sort((a, b) => b.rating - a.rating);
      case 'rating-low':
        return reviews.sort((a, b) => a.rating - b.rating);
      case 'date':
      default:
        return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [sortBy, allReviews]);

  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);
  const averageScore = averageRating ?? (allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      id="reviews"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
            Guest Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(averageScore)
                    ? 'fill-gold text-gold'
                    : 'text-muted-foreground/30'
                    }`}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">{averageScore.toFixed(1)}</span>
            <span className="text-muted-foreground">({allReviews.length} reviews)</span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-[180px]">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">{review.guestName}</p>
                <p className="text-sm text-muted-foreground">{formatDate(review.date)}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating
                      ? 'fill-gold text-gold'
                      : 'text-muted-foreground/30'
                      }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {allReviews.length > 3 && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="mt-4 gap-2"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          {showAll ? 'Show less' : `View all ${allReviews.length} reviews`}
        </Button>
      )}
    </motion.div>
  );
}
