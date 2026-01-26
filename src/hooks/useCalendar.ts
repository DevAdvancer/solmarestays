import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { startOfMonth, endOfMonth, addMonths, isSameDay, format } from 'date-fns';
import { fetchCalendar, getUnavailableDates } from '@/services/hostaway';
import { HostawayCalendarDay } from '@/types/hostaway';

interface UseCalendarOptions {
  /** Number of months ahead to fetch (default: 6) */
  monthsAhead?: number;
  /** Include reservation details in response */
  includeResources?: boolean;
  /** Whether the query is enabled */
  enabled?: boolean;
}

interface UseCalendarReturn {
  /** Raw calendar days data from the API */
  calendarDays: HostawayCalendarDay[];
  /** Array of dates that are not available */
  unavailableDates: Date[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Check if a specific date is available */
  isDateAvailable: (date: Date) => boolean;
  /** Get price for a specific date */
  getPriceForDate: (date: Date) => number | null;
  /** Get calendar day data for a specific date */
  getCalendarDay: (date: Date) => HostawayCalendarDay | undefined;
  /** Refetch calendar data */
  refetch: () => void;
}

/**
 * Hook to fetch and manage calendar availability data from Hostaway
 * @param listingId - The Hostaway listing ID
 * @param options - Optional configuration
 */
export function useCalendar(
  listingId: string | undefined,
  options: UseCalendarOptions = {}
): UseCalendarReturn {
  const {
    monthsAhead = 6,
    includeResources = false,
    enabled = true,
  } = options;

  // Calculate date range: from start of current month to end of monthsAhead
  const dateRange = useMemo(() => {
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(addMonths(new Date(), monthsAhead));
    return { startDate, endDate };
  }, [monthsAhead]);

  const {
    data: calendarDays = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['calendar', listingId, dateRange.startDate.toISOString(), dateRange.endDate.toISOString()],
    queryFn: () => fetchCalendar(
      listingId!,
      dateRange.startDate,
      dateRange.endDate,
      includeResources
    ),
    enabled: !!listingId && enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in garbage collection for 30 minutes
  });

  // Compute unavailable dates
  const unavailableDates = useMemo(
    () => getUnavailableDates(calendarDays),
    [calendarDays]
  );

  // Helper to find calendar day by date
  const getCalendarDay = useMemo(() => {
    return (date: Date): HostawayCalendarDay | undefined => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return calendarDays.find((day) => day.date === dateStr);
    };
  }, [calendarDays]);

  // Helper to check if a date is available
  const isDateAvailable = useMemo(() => {
    return (date: Date): boolean => {
      const calendarDay = getCalendarDay(date);
      if (!calendarDay) return true; // If no data, assume available
      return calendarDay.isAvailable === 1 && calendarDay.status === 'available';
    };
  }, [getCalendarDay]);

  // Helper to get price for a date
  const getPriceForDate = useMemo(() => {
    return (date: Date): number | null => {
      const calendarDay = getCalendarDay(date);
      return calendarDay?.price ?? null;
    };
  }, [getCalendarDay]);

  return {
    calendarDays,
    unavailableDates,
    isLoading,
    error: error as Error | null,
    isDateAvailable,
    getPriceForDate,
    getCalendarDay,
    refetch: () => refetch(),
  };
}
