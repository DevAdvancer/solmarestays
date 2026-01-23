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
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    initialData: () => {
      try {
        const cached = localStorage.getItem('solmare_properties_cache_v2');
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          // Use cache if less than 24 hours old
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            return data;
          }
        }
      } catch (e) {
        console.warn('Failed to load properties from cache:', e);
      }
      return undefined;
    }
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
    const targets = [
      'Hummingbird House',
      'The Coral House',
      'La Casita',
      'bungalow-1-1021'
    ];

    const selected: Property[] = [];
    const usedIds = new Set<string>();

    // 1. Try to find specific target properties
    targets.forEach(target => {
      // Case-insensitive, partial match on Name OR Slug
      const prop = properties.find(p =>
        p.name.toLowerCase().includes(target.toLowerCase()) ||
        p.slug.toLowerCase().includes(target.toLowerCase())
      );

      if (prop && !usedIds.has(prop.id)) {
        selected.push(prop);
        usedIds.add(prop.id);
      }
    });

    // 2. Fill remaining slots up to 4 with other available properties
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
