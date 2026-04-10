/**
 * Dynamic sitemap generator for Solmaré Stays
 * Runs as a postbuild script to generate dist/sitemap.xml and public/sitemap.xml
 *
 * Fetches property listings from Hostaway API and blog posts from Sanity,
 * combines them with static routes, and writes a complete sitemap.
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://www.solmarestays.com';

// Load .env manually (no dotenv dependency required)
function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  }
  return env;
}

const env = loadEnv();

const HOSTAWAY_API_URL = env.VITE_HOSTAWAY_API_URL || process.env.VITE_HOSTAWAY_API_URL || 'https://api.hostaway.com/v1';
const HOSTAWAY_API_TOKEN = env.VITE_HOSTAWAY_API_TOKEN || process.env.VITE_HOSTAWAY_API_TOKEN;

const SANITY_PROJECT_ID = env.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'ubjffxhw';
const SANITY_DATASET = env.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';

// Static routes with their priorities and change frequencies
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/collection', changefreq: 'weekly', priority: '0.9' },
  { path: '/philosophy', changefreq: 'monthly', priority: '0.7' },
  { path: '/management', changefreq: 'monthly', priority: '0.8' },
  { path: '/experiences', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
];

// Location pages
const LOCATION_ROUTES = [
  { path: '/avila-beach', changefreq: 'weekly', priority: '0.9' },
  { path: '/pismo-beach', changefreq: 'weekly', priority: '0.9' },
  { path: '/san-luis-obispo', changefreq: 'weekly', priority: '0.9' },
  { path: '/central-coast', changefreq: 'weekly', priority: '0.9' },
];

// Filter pages
const FILTER_ROUTES = [
  { path: '/pet-friendly', changefreq: 'weekly', priority: '0.8' },
  { path: '/group-stays', changefreq: 'weekly', priority: '0.8' },
];

// Legal pages
const LEGAL_ROUTES = [
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
];

function buildUrlEntry(loc, changefreq, priority, lastmod) {
  let xml = `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n`;
  if (lastmod) {
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>`;
  return xml;
}

async function fetchPropertyIds() {
  if (!HOSTAWAY_API_TOKEN) {
    console.warn('Warning: VITE_HOSTAWAY_API_TOKEN not set. Skipping Hostaway property fetch.');
    return [];
  }

  try {
    const response = await fetch(`${HOSTAWAY_API_URL}/listings`, {
      headers: {
        Authorization: `Bearer ${HOSTAWAY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Warning: Hostaway API returned ${response.status}. Skipping property fetch.`);
      return [];
    }

    const data = await response.json();
    if (data.status === 'success' && Array.isArray(data.result)) {
      return data.result
        .filter((listing) => listing.isActive !== 0)
        .map((listing) => listing.name.split('|')[0].trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
        );
    }

    console.warn('Warning: Unexpected Hostaway API response format.');
    return [];
  } catch (err) {
    console.warn('Warning: Failed to fetch from Hostaway API:', err.message);
    return [];
  }
}

async function fetchBlogSlugs() {
  try {
    const sanity = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: '2023-05-03',
      useCdn: true,
    });

    const posts = await sanity.fetch(`
      *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt
      }
    `);

    return Array.isArray(posts) ? posts : [];
  } catch (err) {
    console.warn('Warning: Failed to fetch blog posts from Sanity:', err.message);
    return [];
  }
}

async function generateSitemap() {
  console.log('Generating sitemap...');

  // Fetch dynamic data in parallel
  const [propertyIds, blogPosts] = await Promise.all([
    fetchPropertyIds(),
    fetchBlogSlugs(),
  ]);

  const today = new Date().toISOString().split('T')[0];
  const entries = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    entries.push(buildUrlEntry(route.path, route.changefreq, route.priority));
  }

  // Property pages
  if (propertyIds.length > 0) {
    entries.push('  <!-- Properties -->');
    for (const id of propertyIds) {
      entries.push(buildUrlEntry(`/property/${id}`, 'weekly', '0.8'));
    }
  }

  // Location pages
  entries.push('  <!-- Location Pages -->');
  for (const route of LOCATION_ROUTES) {
    entries.push(buildUrlEntry(route.path, route.changefreq, route.priority));
  }

  // Filter pages
  entries.push('  <!-- Filter Pages -->');
  for (const route of FILTER_ROUTES) {
    entries.push(buildUrlEntry(route.path, route.changefreq, route.priority));
  }

  // Blog posts
  if (blogPosts.length > 0) {
    entries.push('  <!-- Blog Posts -->');
    for (const post of blogPosts) {
      const lastmod = post.publishedAt ? post.publishedAt.split('T')[0] : today;
      entries.push(buildUrlEntry(`/blog/${post.slug}`, 'monthly', '0.7', lastmod));
    }
  }

  // Legal pages
  entries.push('  <!-- Legal -->');
  for (const route of LEGAL_ROUTES) {
    entries.push(buildUrlEntry(route.path, route.changefreq, route.priority));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  // Write to dist/ (production build output)
  const distDir = path.join(ROOT, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
    console.log(`  Written to dist/sitemap.xml`);
  }

  // Write to public/ (source, for dev server)
  const publicDir = path.join(ROOT, 'public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`  Written to public/sitemap.xml`);
  }

  console.log(`Sitemap generated with ${propertyIds.length} properties and ${blogPosts.length} blog posts.`);
}

generateSitemap().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
