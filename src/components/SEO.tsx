import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_URL = 'https://www.solmarestays.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Solmaré Stays',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Refined vacation rentals on California's Central Coast",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Avila Beach',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Avila Beach' },
    { '@type': 'City', name: 'Pismo Beach' },
    { '@type': 'City', name: 'San Luis Obispo' },
    { '@type': 'City', name: 'Arroyo Grande' },
    { '@type': 'City', name: 'Shell Beach' },
    { '@type': 'City', name: 'Grover Beach' },
  ],
  sameAs: [
    'https://www.instagram.com/solmarestays',
    'https://www.facebook.com/solmarestays',
    'https://www.tiktok.com/@solmarestays',
  ],
};

const lodgingBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Solmaré Stays',
  url: SITE_URL,
  description:
    "Premium vacation rental management on California's Central Coast. 12 curated properties in Avila Beach, Pismo Beach, and San Luis Obispo.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Avila Beach',
    addressRegion: 'CA',
    postalCode: '93424',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.7',
    ratingCount: '2429',
    bestRating: '10',
    worstRating: '1',
  },
  priceRange: '$140 - $10,000',
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Solmaré Stays',
  url: SITE_URL,
  description:
    "Refined vacation rentals on California's Central Coast. Experience elevated hospitality in Avila Beach, Pismo Beach, and San Luis Obispo.",
  publisher: {
    '@type': 'Organization',
    name: 'Solmaré Stays',
  },
};

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function SEO({ title, description, image, type = 'website', schema, breadcrumbs }: SEOProps) {
  const location = useLocation();
  const siteTitle = 'Solmaré Stays';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = 'Refined vacation rentals in Avila Beach, Pismo Beach & SLO. 2,400+ five-star reviews. Book direct for the best rates.';

  // Construct canonical URL safely
  const canonicalUrl = `${SITE_URL}${location.pathname}`;

  const isHomepage = location.pathname === '/' || location.pathname === '';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Organization Schema — always present */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* LodgingBusiness Schema — always present */}
      <script type="application/ld+json">
        {JSON.stringify(lodgingBusinessSchema)}
      </script>

      {/* WebSite Schema — homepage only */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(webSiteSchema)}
        </script>
      )}

      {/* BreadcrumbList Schema — when breadcrumbs prop provided */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
        </script>
      )}

      {/* Page-specific Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
