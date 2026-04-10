/**
 * Post-build prerendering script.
 *
 * Spins up a local server from dist/, visits each route with Puppeteer,
 * and saves the fully-rendered HTML back to dist/ so crawlers get real content.
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const ROUTES = [
  '/',
  '/collection',
  '/philosophy',
  '/management',
  '/experiences',
  '/contact',
  '/pet-friendly',
  '/group-stays',
  '/avila-beach',
  '/pismo-beach',
  '/san-luis-obispo',
  '/central-coast',
  '/terms',
  '/privacy',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
};

// Simple static file server from dist/
function createStaticServer() {
  return createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

    // SPA fallback: if file doesn't exist, serve index.html
    if (!existsSync(filePath)) {
      filePath = join(DIST, 'index.html');
    } else {
      // If it's a directory, try index.html inside it
      try {
        const stat = readFileSync(filePath);
      } catch {
        filePath = join(DIST, 'index.html');
      }
    }

    // If path has no extension, it's a route — serve index.html
    if (!extname(filePath)) {
      filePath = join(DIST, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerender() {
  const server = createStaticServer();
  const PORT = 4173;

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    console.log(`Prerendering: ${route}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait a bit more for any lazy rendering
      await page.waitForSelector('#root', { timeout: 5000 });

      // Give React a moment to hydrate
      await new Promise(r => setTimeout(r, 1000));

      let html = await page.content();

      // Remove any Vite HMR / dev scripts that shouldn't be in production
      html = html.replace(/<script[^>]*data-vite[^>]*>[\s\S]*?<\/script>/g, '');

      // Determine output path
      const outputDir = route === '/'
        ? DIST
        : join(DIST, route);

      mkdirSync(outputDir, { recursive: true });
      const outputPath = join(outputDir, 'index.html');
      writeFileSync(outputPath, html, 'utf-8');

      console.log(`  -> Saved: ${outputPath}`);
      successCount++;
    } catch (err) {
      console.error(`  -> FAILED: ${route}`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerendered ${successCount}/${ROUTES.length} routes successfully.`);

  if (successCount < ROUTES.length) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.warn('\n⚠ Prerender skipped:', err.message);
  console.warn('  This is expected in CI/Vercel — prerender locally with: npm run build');
  console.warn('  The site still works as a SPA without prerendered files.\n');
  // Don't exit with error — let the build succeed
  process.exit(0);
});
