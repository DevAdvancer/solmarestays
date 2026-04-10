import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchCalendar } from '@/services/hostaway';
import { Property } from '@/data/properties';
import { eachDayOfInterval, isSameDay } from 'date-fns';

interface UseAvailabilityOptions {
  properties: Property[];
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  enabled?: boolean;
}

interface UseAvailabilityReturn {
  /** IDs of properties that are available for the selected dates */
  availablePropertyIds: Set<string>;
  /** Whether availability is being checked */
  isCheckingAvailability: boolean;
  /** Error during availability check */
  error: Error | null;
}

/**
 * Hook to check availability for multiple properties based on selected dates
 * Returns a Set of property IDs that are available for booking
 */
export function useAvailability({
  properties,
  checkIn,
  checkOut,
  enabled = true,
}: UseAvailabilityOptions): UseAvailabilityReturn {
  // Only fetch when both dates are selected
  const shouldFetch = enabled && !!checkIn && !!checkOut && properties.length > 0;

  const {
    data: availabilityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['availability', checkIn?.toISOString(), checkOut?.toISOString(), properties.map(p => p.id)],
    queryFn: async () => {
      if (!checkIn || !checkOut) return {};

      // Fetch calendar for each property in parallel
      const results = await Promise.allSettled(
        properties.map(async (property) => {
          try {
            const calendarDays = await fetchCalendar(
              property.hostawayListingId,
              checkIn,
              checkOut,
              false // Don't need reservation details
            );

            // Check if ALL days in the range are available
            const daysInRange = eachDayOfInterval({ start: checkIn, end: checkOut });

            // For check-out day, we don't need it to be available (guests leave that day)
            const daysToCheck = daysInRange.slice(0, -1); // Exclude last day (check-out)

            const allDaysAvailable = daysToCheck.every((day) => {
              const calendarDay = calendarDays.find((cd) => {
                // Parse YYYY-MM-DD as local date to prevent timezone shifts
                const [year, month, date] = cd.date.split('-').map(Number);
                return isSameDay(new Date(year, month - 1, date), day);
              });
              // If no data for this day, assume unavailable to be safe
              if (!calendarDay) return false;
              return calendarDay.isAvailable === 1 && calendarDay.status === 'available';
            });

            return { propertyId: property.id, available: allDaysAvailable };
          } catch {
            // If fetch fails for a property, assume unavailable to be safe
            return { propertyId: property.id, available: false };
          }
        })
      );

      // Build map of property ID to availability
      const availabilityMap: Record<string, boolean> = {};
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          availabilityMap[result.value.propertyId] = result.value.available;
        }
      });

      return availabilityMap;
    },
    enabled: shouldFetch,
    staleTime: 2 * 60 * 1000, // Consider fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  const availablePropertyIds = useMemo(() => {
    if (!availabilityData) {
      // If no availability data fetched yet (no dates selected), all are "available"
      return new Set(properties.map((p) => p.id));
    }

    return new Set(
      Object.entries(availabilityData)
        .filter(([, isAvailable]) => isAvailable)
        .map(([id]) => id)
    );
  }, [availabilityData, properties]);

  return {
    availablePropertyIds,
    isCheckingAvailability: isLoading,
    error: error as Error | null,
  };
}
