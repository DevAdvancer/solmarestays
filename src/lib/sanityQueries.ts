/**
 * GROQ queries for fetching content from Sanity
 * GROQ (Graph-Relational Object Queries) is Sanity's query language
 */

/**
 * Fetch a page by its slug
 * Returns the page document with all its sections
 */
export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      ...
    }
  }
`;

/**
 * Fetch all pages
 * Useful for generating navigation or sitemap
 */
export const allPagesQuery = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

/**
 * Fetch site settings
 * Returns the single site settings document
 */
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    tagline,
    footerText,
    contactInfo,
    socialLinks
  }
`;

/**
 * Fetch FAQ items
 * Can be filtered by category if needed
 */
export const faqItemsQuery = `
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;
