import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReviews } from '@/hooks/useReviews';
import { HostawayReview } from '@/types/hostaway';

interface ReviewsSectionProps {
  propertyName: string;
  propertyId: string;
  averageRating?: number | null;
}

export function ReviewsSection({ propertyName, propertyId, averageRating }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'rating-high' | 'rating-low'>('date');

  const { data: rawReviews = [], isLoading, error } = useReviews(propertyId);

  // Filter reviews for this specific property and handle new data structure
  const allReviews = useMemo(() => {
    // Debug logging requested by user
    console.log('ReviewsSection Debug:', {
      propertyName,
      propertyId,
      rawReviewsCount: rawReviews.length,
      sampleReview: rawReviews[0],
      filteredCount: rawReviews.filter(r => String(r.listingMapId) === propertyId).length
    });

    return rawReviews.filter(
      r => String(r.listingMapId) === propertyId && Number(r.rating) > 0
    );
  }, [rawReviews, propertyId, propertyName]);

  const sortedReviews = useMemo(() => {
    const reviews = [...allReviews];
    switch (sortBy) {
      case 'rating-high':
        return reviews.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'rating-low':
        return reviews.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case 'date':
      default:
        // Sort by newest first (descending date)
        return reviews.sort((a, b) => {
          const dateA = new Date(a.submittedAt).getTime();
          const dateB = new Date(b.submittedAt).getTime();
          return dateB - dateA;
        });
    }
  }, [sortBy, allReviews]);

  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  // Use the averageRating prop from Hostaway property data (authoritative)
  // Only calculate from fetched reviews as fallback if prop not provided
  const averageScore = averageRating
    ? averageRating
    : (allReviews.length > 0
      ? (allReviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / allReviews.length)
      : 0);

  // For star display (out of 5)
  // Hostaway returns ratings out of 10, so we divide by 2
  const averageStars = averageScore / 2;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="py-8 space-y-4 animate-pulse">
        <div className="h-8 bg-secondary rounded w-1/4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-secondary rounded-xl p-6 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  // If error or no reviews, we can hide the section or show a message.
  // Showing nothing if no reviews is often cleaner.
  if (error || allReviews.length === 0) {
    return null;
  }

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
                  className={`w-5 h-5 ${star <= Math.round(averageStars)
                    ? 'fill-gold text-gold'
                    : 'text-muted-foreground/30'
                    }`}
                />
              ))}
            </div>
            {/* Display score out of 5 */}
            <span className="font-semibold text-foreground">{averageStars.toFixed(1)}</span>
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
                <p className="font-medium text-foreground">{review.reviewerName || review.guestName}</p>
                <p className="text-sm text-muted-foreground">{formatDate(review.submittedAt)}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= (review.rating / 2)
                      ? 'fill-gold text-gold'
                      : 'text-muted-foreground/30'
                      }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{review.publicReview}</p>
            {review.revieweeResponse && (
              <div className="mt-4 pl-4 border-l-2 border-primary/20">
                <p className="text-sm font-medium text-foreground mb-1">Response from Host:</p>
                <p className="text-sm text-muted-foreground">{review.revieweeResponse}</p>
              </div>
            )}
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

