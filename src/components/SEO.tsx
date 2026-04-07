import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
}

export function SEO({ title, description, image, type = 'website', schema }: SEOProps) {
  const location = useLocation();
  const siteTitle = 'Solmaré Stays';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = 'Refined vacation rentals on California\'s Central Coast. Experience elevated hospitality in Avila Beach, Pismo Beach, and San Luis Obispo.';
  const siteUrl = 'https://www.solmarestays.com';

  // Construct canonical URL safely
  const canonicalUrl = `${siteUrl}${location.pathname}`;

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

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
