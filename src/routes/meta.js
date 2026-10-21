/**
 * Per-route SEO metadata — title, meta description and canonical path.
 * Wording is derived from existing site copy; nothing new is claimed here.
 */
import { PATHS } from './paths'

/**
 * Canonical origin of the site. Override with VITE_SITE_URL at build time —
 * never hard-code a domain in components.
 */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://yourdomain.com'
).replace(/\/+$/, '')

export const PAGE_META = {
  [PATHS.HOME]: {
    title: 'Orion Oil | Premium Recycled Base Oils & Industrial Fuels, Pune',
    description:
      'Orion Oil — Premium base oils and industrial fuels refined from 100% recycled feedstocks in Pune, Maharashtra. Group I equivalent quality. Zero-waste circular economy. EPR compliant.',
  },
  [PATHS.ABOUT]: {
    title: 'About Us | Orion Oil',
    description:
      'The Circular Economy, Engineered for Excellence. Our mission, our vision and our refining facility in MIDC Bhosari, Pune.',
  },
  [PATHS.PRODUCTS]: {
    title: 'Our Products | Orion Oil',
    description:
      'Premium-grade base oils and industrial fuels refined from 100% recycled feedstocks — SN-150, SN-300, Industrial LDO and bitumen.',
  },
  [PATHS.TECHNOLOGY]: {
    title: 'Our Technology | Orion Oil',
    description:
      'Advanced Vacuum Distillation for Zero-Degradation Refining. Deep-vacuum batch distillation, dual-stage thermic fluid heating and zero-waste refining.',
  },
  [PATHS.QUALITY]: {
    title: 'Quality and Sustainability | Orion Oil',
    description:
      'Uncompromising Standards. Zero-Waste Commitment. Every batch is tested by accredited third-party inspection laboratories.',
  },
  [PATHS.INDUSTRIES]: {
    title: 'Industries We Serve | Orion Oil',
    description:
      'Delivering Performance. Powering Industries. Your Growth, Our Commitment. Base oils and industrial fuels for lubricant, hydraulic, gear, boiler and road construction industries.',
  },
  [PATHS.CONTACT]: {
    title: 'Contact Us | Orion Oil',
    description:
      'Get in touch with Orion Oil. S-32, MIDC Bhosari, Pune 411026, Maharashtra. Request a quote for bulk base oils, LDO or bitumen.',
  },
}

/** Metadata used for unknown URLs (404). */
export const NOT_FOUND_META = {
  title: 'Page not found | Orion Oil',
  description:
    'The page you are looking for doesn’t exist or has been moved.',
}

/** Canonical URL for a route path. */
export function canonicalUrl(pathname) {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  return `${SITE_URL}${path}`
}
