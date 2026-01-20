import { useQuery } from '@tanstack/react-query';
import { fetchListings } from '@/services/hostaway';
import { Property } from '@/data/properties';

/**
 * Hook to fetch all properties from Hostaway API
 */
export function useProperties() {
  return useQuery<Property[], Error>({
    queryKey: ['properties'],
    queryFn: fetchListings,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
}

/**
 * Hook to get a single property by slug
 * Uses the properties list and filters by slug
 */
export function usePropertyBySlug(slug: string) {
  const { data: properties, ...rest } = useProperties();

  const property = properties?.find((p) => p.slug === slug);

  return {
    ...rest,
    data: property,
  };
}

/**
 * Hook to get featured properties (first 4)
 */
export function useFeaturedProperties() {
  const { data: properties, ...rest } = useProperties();

  const featured = properties ? (() => {
    // Strategy: Pick 1 from each unique location to ensure diversity
    // This ensures Avila Beach, San Luis Obispo, and Pismo Beach all get representation if available
    const uniqueLocations = Array.from(new Set(properties.map(p => p.location)));
    const selected: typeof properties = [];
    const usedIds = new Set<string>();

    // 1. Pick one from each location
    uniqueLocations.forEach(loc => {
      const prop = properties.find(p => p.location === loc);
      if (prop) {
        selected.push(prop);
        usedIds.add(prop.id);
      }
    });

    // 2. Fill remaining slots up to 4 with other properties
    for (const prop of properties) {
      if (selected.length >= 4) break;
      if (!usedIds.has(prop.id)) {
        selected.push(prop);
        usedIds.add(prop.id);
      }
    }

    return selected;
  })() : undefined;

  return {
    ...rest,
    data: featured,
  };
}
