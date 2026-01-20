import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  const siteTitle = 'Solmaré Stays';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = 'Refined vacation rentals on California\'s Central Coast. Experience elevated hospitality in Avila Beach, Pismo Beach, and San Luis Obispo.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
