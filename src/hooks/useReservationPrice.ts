import { useQuery } from '@tanstack/react-query';
import { calculateReservationPrice } from '@/services/hostaway';
import { useEffect, useState } from 'react';

interface UseReservationPriceProps {
  listingId: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  enabled?: boolean;
}

export function useReservationPrice({
  listingId,
  checkIn,
  checkOut,
  guests,
  enabled = true
}: UseReservationPriceProps) {
  const [debouncedParams, setDebouncedParams] = useState({ checkIn, checkOut, guests });

  // Debounce API calls to avoid hitting rate limits while user selects dates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams({ checkIn, checkOut, guests });
    }, 500);
    return () => clearTimeout(timer);
  }, [checkIn, checkOut, guests]);

  const isValidRange = debouncedParams.checkIn && debouncedParams.checkOut && debouncedParams.guests > 0;

  return useQuery({
    queryKey: ['price-calculation', listingId, debouncedParams.checkIn?.toISOString(), debouncedParams.checkOut?.toISOString(), debouncedParams.guests],
    queryFn: () => calculateReservationPrice(
      listingId,
      debouncedParams.checkIn!,
      debouncedParams.checkOut!,
      debouncedParams.guests
    ),
    enabled: !!listingId && isValidRange && enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
