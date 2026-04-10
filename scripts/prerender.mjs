/**
 * Post-build SEO injection script.
 *
 * Generates static HTML for key routes by injecting proper meta tags,
 * schema markup, and crawlable content into the built index.html.
 * No browser required — pure Node.js string templating.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASE_URL = 'https://www.solmarestays.com';

// Read the built index.html as our template
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

/**
 * Page definitions with SEO data.
 * Each page gets its own title, description, schema, and crawlable body content.
 */
const PAGES = [
  {
    route: '/avila-beach',
    title: 'Avila Beach Vacation Rentals | Solmaré Stays',
    description: 'Browse luxury vacation rentals in Avila Beach, CA. Steps to the sand, ocean views, pet-friendly options. Book direct with Solmaré Stays for the best rates.',
    h1: 'Avila Beach Vacation Rentals',
    body: `<p>Discover Solmaré Stays' curated collection of vacation rentals in Avila Beach, California. Our properties are located just steps from the sand, offering ocean views, modern amenities, and the authentic Central Coast experience.</p>
<h2>Why Stay in Avila Beach?</h2>
<p>Avila Beach is a charming seaside village on California's Central Coast with 280+ sunny days per year. Walk to the pier, enjoy waterfront dining, explore the Bob Jones Trail, or visit nearby hot springs at Sycamore Mineral Springs.</p>
<h2>Our Avila Beach Properties</h2>
<ul>
<li><strong>Hummingbird House</strong> — 2BR/2BA with private rooftop terrace and panoramic ocean views</li>
<li><strong>La Casita</strong> — Luxury 2BR beach house with chef's kitchen, 1 minute from the sand</li>
<li><strong>The Coral House</strong> — Modern 1BR with bifold doors and ocean views</li>
<li><strong>Shoreline Suite</strong> — Spacious 1BR with full kitchen and balcony</li>
<li><strong>The Deckhouse</strong> — Historic beach cottage with King bed, sleeps 4</li>
<li><strong>Emberlight</strong> — Private fire pit bungalow, steps to the beach</li>
<li><strong>Casa Azul</strong> — Colorful King bed studio with vintage charm</li>
<li><strong>The Nest</strong> — Intimate couples retreat with King bed</li>
<li><strong>The Palm House</strong> — Pet-friendly studio with ocean peeks</li>
<li><strong>The Pine House</strong> — Pet-friendly cottage with balcony views</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>How far are your rentals from Avila Beach?</h3>
<p>Most of our Avila Beach properties are just 1-2 blocks from the sand — a 2-minute walk to the beach, pier, and promenade.</p>
<h3>Do you have pet-friendly rentals in Avila Beach?</h3>
<p>Yes! The Palm House and The Pine House are both pet-friendly. Dogs are welcome with advance notice.</p>
<h3>What is there to do in Avila Beach?</h3>
<p>Avila Beach offers beach activities, the Bob Jones Trail, Avila Beach Golf Resort, wine tasting at nearby wineries, kayaking, paddleboarding, and the famous Avila Beach Farmers Market on Fridays.</p>`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Solmaré Stays — Avila Beach Vacation Rentals",
      "description": "Luxury vacation rentals in Avila Beach, CA. Steps to the sand with ocean views.",
      "url": `${BASE_URL}/avila-beach`,
      "address": { "@type": "PostalAddress", "addressLocality": "Avila Beach", "addressRegion": "CA", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 35.1797, "longitude": -120.7331 }
    },
    faq: [
      { q: "How far are your rentals from Avila Beach?", a: "Most of our Avila Beach properties are just 1-2 blocks from the sand — a 2-minute walk to the beach, pier, and promenade." },
      { q: "Do you have pet-friendly rentals in Avila Beach?", a: "Yes! The Palm House and The Pine House are both pet-friendly. Dogs are welcome with advance notice." },
      { q: "What is there to do in Avila Beach?", a: "Avila Beach offers beach activities, the Bob Jones Trail, wine tasting, kayaking, paddleboarding, and the Avila Beach Farmers Market on Fridays." }
    ]
  },
  {
    route: '/pismo-beach',
    title: 'Pismo Beach Vacation Rentals | Solmaré Stays',
    description: 'Find luxury vacation rentals near Pismo Beach, CA. Ocean views, modern amenities, and steps to the sand. Book direct with Solmaré Stays.',
    h1: 'Pismo Beach Vacation Rentals',
    body: `<p>Experience California's Central Coast from Solmaré Stays' collection of vacation rentals near Pismo Beach. Our Avila Beach properties are just 5 minutes from Pismo Beach, offering easy access to both towns.</p>
<h2>About Pismo Beach</h2>
<p>Pismo Beach is a classic California beach town known for its iconic pier, Pismo Beach Premium Outlets, vibrant downtown, and stunning sunsets. Located just minutes from our Avila Beach properties.</p>`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Solmaré Stays — Pismo Beach Area Vacation Rentals",
      "url": `${BASE_URL}/pismo-beach`,
      "address": { "@type": "PostalAddress", "addressLocality": "Pismo Beach", "addressRegion": "CA", "addressCountry": "US" }
    }
  },
  {
    route: '/san-luis-obispo',
    title: 'San Luis Obispo Vacation Rentals | Solmaré Stays',
    description: 'Vacation rentals in San Luis Obispo, CA. Walk to Cal Poly, minutes from downtown SLO. Book direct with Solmaré Stays.',
    h1: 'San Luis Obispo Vacation Rentals',
    body: `<p>Stay in the heart of San Luis Obispo with Solmaré Stays. Our Monterey Heights Suite is a walkable distance from Cal Poly and minutes from downtown SLO's restaurants, shops, and Thursday night farmers market.</p>
<h2>Our SLO Property</h2>
<ul><li><strong>Monterey Heights Suite</strong> — Cal King bed, private patio, kitchenette, walk to Cal Poly campus</li></ul>`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Solmaré Stays — San Luis Obispo Vacation Rentals",
      "url": `${BASE_URL}/san-luis-obispo`,
      "address": { "@type": "PostalAddress", "addressLocality": "San Luis Obispo", "addressRegion": "CA", "addressCountry": "US" }
    }
  },
  {
    route: '/central-coast',
    title: 'Central Coast California Vacation Rentals | Solmaré Stays',
    description: 'Luxury vacation rentals on California\'s Central Coast. Avila Beach, Pismo Beach, San Luis Obispo, and Arroyo Grande. Book direct for the best rates.',
    h1: 'Central Coast California Vacation Rentals',
    body: `<p>Solmaré Stays manages 12 premium vacation rentals across California's Central Coast, from beachfront bungalows in Avila Beach to a 7-acre wine country estate in Arroyo Grande.</p>
<h2>Our Locations</h2>
<ul>
<li><a href="/avila-beach">Avila Beach</a> — 10 properties, steps to the sand</li>
<li><a href="/san-luis-obispo">San Luis Obispo</a> — Walk to Cal Poly</li>
<li><a href="/pismo-beach">Pismo Beach</a> — Minutes from the pier</li>
<li>Arroyo Grande — Wine Country Estate with pool, hot tub, 5 casitas</li>
</ul>`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Solmaré Stays — Central Coast Vacation Rentals",
      "url": `${BASE_URL}/central-coast`,
      "address": { "@type": "PostalAddress", "addressRegion": "CA", "addressCountry": "US" }
    }
  },
  {
    route: '/collection',
    title: 'Browse All Properties | Solmaré Stays',
    description: 'Browse all 12 vacation rental properties managed by Solmaré Stays. Avila Beach, Pismo Beach, SLO, and wine country. Filter by location, guests, and dates.',
    h1: 'Our Vacation Rental Collection',
    body: `<p>Browse Solmaré Stays' curated collection of 12 vacation rentals across California's Central Coast. From intimate beach studios to a 7-acre wine country estate, find your perfect stay.</p>`
  },
  {
    route: '/pet-friendly',
    title: 'Pet-Friendly Vacation Rentals in Avila Beach | Solmaré Stays',
    description: 'Pet-friendly vacation rentals in Avila Beach, CA. Bring your dog to the beach! The Palm House and Pine House welcome pets. Book direct.',
    h1: 'Pet-Friendly Vacation Rentals',
    body: `<p>Traveling with your dog? Solmaré Stays offers pet-friendly vacation rentals in Avila Beach. Our pet-friendly properties welcome well-behaved dogs so your whole family can enjoy the Central Coast together.</p>
<h2>Pet-Friendly Properties</h2>
<ul>
<li><strong>The Palm House</strong> — King studio with ocean peeks and private balcony. Pet fee applies.</li>
<li><strong>The Pine House</strong> — Queen studio with balcony views. Pet fee applies.</li>
<li><strong>Wine Country Estate</strong> — 7-acre estate with room to roam. Dogs welcome with approval.</li>
</ul>`
  },
  {
    route: '/group-stays',
    title: 'Group Vacation Rentals in Avila Beach | Solmaré Stays',
    description: 'Plan a group trip to Avila Beach. Book multiple bungalows together or rent the entire Wine Country Estate for up to 14 guests. Weddings, reunions, retreats.',
    h1: 'Group Stays & Private Compound Rentals',
    body: `<p>Planning a group trip, family reunion, wedding, or corporate retreat on the Central Coast? Solmaré Stays offers unique group accommodation options.</p>
<h2>Options for Groups</h2>
<ul>
<li><strong>Wine Country Estate</strong> — Private 7-acre estate with 5 casitas, pool, hot tub, bocce court. Sleeps 14.</li>
<li><strong>Las Casitas Avila Compound</strong> — Book multiple bungalows in our Avila Beach compound for a private group experience.</li>
</ul>`
  },
  {
    route: '/philosophy',
    title: 'Our Philosophy | Solmaré Stays',
    description: 'Learn about Solmaré Stays\' approach to luxury vacation rental hospitality on California\'s Central Coast. Elevated stays, local expertise, 5-star service.',
    h1: 'Our Philosophy',
    body: `<p>At Solmaré Stays, we believe vacation rentals should feel like more than just a place to sleep. Every property in our collection is hand-selected, professionally designed, and maintained to hotel-quality standards — with the warmth and privacy of a home.</p>`
  },
  {
    route: '/management',
    title: 'Vacation Rental Property Management | Avila Beach & Central Coast | Solmaré Stays',
    description: 'Professional vacation rental management in Avila Beach, Pismo Beach, and SLO County. Maximize revenue with Solmaré Stays\' full-service property management.',
    h1: 'Vacation Rental Property Management',
    body: `<p>Solmaré Stays provides full-service vacation rental management for homeowners on California's Central Coast. We handle everything — from listing optimization and dynamic pricing to guest communication, cleaning, and maintenance — so you can earn more while doing less.</p>
<h2>Why Partner with Solmaré Stays?</h2>
<ul>
<li>9.7/10 average guest rating across 2,377+ reviews</li>
<li>Professional photography and listing optimization</li>
<li>Dynamic pricing powered by PriceLabs</li>
<li>24/7 local guest support team</li>
<li>Hotel-quality cleaning and property inspections</li>
</ul>`
  },
  {
    route: '/experiences',
    title: 'Guest Experiences | Central Coast Activities | Solmaré Stays',
    description: 'Discover the best experiences on California\'s Central Coast. Wine tasting, beach activities, hiking, dining, and more — curated by Solmaré Stays.',
    h1: 'Central Coast Guest Experiences',
    body: `<p>Make the most of your Central Coast vacation with our curated guide to local experiences. From wine tasting and beach adventures to hiking and dining, we'll help you discover the best of Avila Beach and beyond.</p>`
  },
  {
    route: '/contact',
    title: 'Contact Solmaré Stays | Avila Beach Vacation Rentals',
    description: 'Get in touch with Solmaré Stays for vacation rental inquiries, property management questions, or group booking requests. We respond within the hour.',
    h1: 'Contact Us',
    body: `<p>Have questions about our vacation rentals or interested in property management services? We'd love to hear from you. Our local team typically responds within the hour.</p>`
  },
  {
    route: '/blog',
    title: 'Blog | Avila Beach & Central Coast Travel Guide | Solmaré Stays',
    description: 'Travel tips, local guides, and insider recommendations for Avila Beach, Pismo Beach, and California\'s Central Coast from Solmaré Stays.',
    h1: 'Solmaré Stays Blog',
    body: `<p>Your guide to California's Central Coast. Discover travel tips, local recommendations, seasonal events, and insider knowledge from our team in Avila Beach.</p>`
  },
  {
    route: '/terms',
    title: 'Terms of Service | Solmaré Stays',
    description: 'Terms and conditions for booking vacation rentals with Solmaré Stays.',
    h1: 'Terms of Service',
    body: ''
  },
  {
    route: '/privacy',
    title: 'Privacy Policy | Solmaré Stays',
    description: 'Privacy policy for Solmaré Stays vacation rental bookings and website.',
    h1: 'Privacy Policy',
    body: ''
  }
];

function generatePage(page) {
  let html = template;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${page.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${BASE_URL}${page.route}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${BASE_URL}${page.route}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  // Add JSON-LD schema before </head>
  const schemas = [];

  // Page-specific schema
  if (page.schema) {
    schemas.push(page.schema);
  }

  // FAQ schema
  if (page.faq && page.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  // BreadcrumbList
  const pageName = page.h1 || page.title.split('|')[0].trim();
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": pageName, "item": `${BASE_URL}${page.route}` }
    ]
  });

  if (schemas.length > 0) {
    const schemaScripts = schemas
      .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n  ');
    html = html.replace('</head>', `  ${schemaScripts}\n</head>`);
  }

  // Replace noscript content with page-specific content
  if (page.h1 || page.body) {
    const noscriptContent = `<noscript>
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: system-ui, sans-serif; color: #1a1a1a;">
      <h1>${page.h1 || ''}</h1>
      ${page.body || ''}
      <p><a href="${BASE_URL}">← Back to Solmaré Stays</a></p>
    </div>
  </noscript>`;
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptContent);
  }

  return html;
}

// Generate all pages
let count = 0;
for (const page of PAGES) {
  const html = generatePage(page);
  const outputDir = join(DIST, page.route);
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'index.html');
  writeFileSync(outputPath, html, 'utf-8');
  console.log(`  ${page.route} -> ${outputPath} (${(html.length / 1024).toFixed(0)}KB)`);
  count++;
}

console.log(`\nGenerated ${count}/${PAGES.length} SEO pages successfully.`);
