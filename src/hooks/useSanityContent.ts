import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '@/lib/sanity.client';
import {
    pageBySlugQuery,
    allPagesQuery,
    siteSettingsQuery,
    faqItemsQuery,
} from '@/lib/sanityQueries';

/**
 * Fetch a page by slug
 * @param slug - Page slug (e.g., "philosophy", "management")
 */
export function usePage(slug: string) {
    return useQuery({
        queryKey: ['sanity', 'page', slug],
        queryFn: () => sanityClient.fetch(pageBySlugQuery, { slug }),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Fetch all pages
 * Useful for navigation
 */
export function useAllPages() {
    return useQuery({
        queryKey: ['sanity', 'pages'],
        queryFn: () => sanityClient.fetch(allPagesQuery),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
}

/**
 * Fetch site settings
 * Contains global site configuration
 */
export function useSiteSettings() {
    return useQuery({
        queryKey: ['sanity', 'siteSettings'],
        queryFn: () => sanityClient.fetch(siteSettingsQuery),
        staleTime: 1000 * 60 * 15, // 15 minutes
    });
}

/**
 * Fetch FAQ items
 */
export function useFAQs() {
    return useQuery({
        queryKey: ['sanity', 'faqs'],
        queryFn: () => sanityClient.fetch(faqItemsQuery),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
