/**
 * Build public/sitemap.xml from the central route paths.
 * Run: npm run build:sitemap
 *
 * The site origin comes from VITE_SITE_URL — no domain is hard-coded.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SITEMAP_PATHS } from '../src/routes/paths.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap.xml')

const SITE_URL = (
  process.env.VITE_SITE_URL || 'https://yourdomain.com'
).replace(/\/+$/, '')

/** Per-route sitemap hints. Keys must exist in SITEMAP_PATHS. */
const ROUTE_HINTS = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/about': { changefreq: 'monthly', priority: '0.8' },
  '/products': { changefreq: 'monthly', priority: '0.9' },
  '/technology': { changefreq: 'monthly', priority: '0.7' },
  '/quality': { changefreq: 'monthly', priority: '0.7' },
  '/industries': { changefreq: 'monthly', priority: '0.8' },
  '/contact': { changefreq: 'monthly', priority: '0.8' },
}

const urls = SITEMAP_PATHS.map((routePath) => {
  const hint = ROUTE_HINTS[routePath] || { changefreq: 'monthly', priority: '0.5' }
  const loc = routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <changefreq>${hint.changefreq}</changefreq>`,
    `    <priority>${hint.priority}</priority>`,
    '  </url>',
  ].join('\n')
})

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(OUTPUT_FILE, xml, 'utf8')
console.log(`Sitemap written (${SITEMAP_PATHS.length} routes): ${OUTPUT_FILE}`)
