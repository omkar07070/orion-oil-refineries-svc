/**
 * Central path constants — every internal link in the site imports from here.
 * Never hard-code a route string in a component.
 */
export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  TECHNOLOGY: '/technology',
  QUALITY: '/quality',
  INDUSTRIES: '/industries',
  FACILITY: '/facility',
  CONTACT: '/contact',
}

/** Query parameter names used by the contact page. */
export const QUERY = {
  TOPIC: 'topic',
  PRODUCT: 'product',
}

/** Topic value for a quote request. */
export const TOPIC_QUOTE = 'quote'

/** Anchor id of the "Our Facility" block inside the About page. */
export const FACILITY_ANCHOR = 'facility'

/**
 * Build a contact-page href, optionally carrying the quote topic and a product id.
 * @param {{ topic?: string, product?: string }} params
 * @returns {string}
 */
export function contactHref({ topic, product } = {}) {
  const params = new URLSearchParams()
  if (topic) params.set(QUERY.TOPIC, topic)
  if (product) params.set(QUERY.PRODUCT, product)
  const qs = params.toString()
  return qs ? `${PATHS.CONTACT}?${qs}` : PATHS.CONTACT
}

/** Href for a quote request, optionally pre-selecting a product. */
export function quoteHref(product) {
  return contactHref({ topic: TOPIC_QUOTE, product })
}

/** Stable anchors for the product cards on the products page. */
export const PRODUCT_ANCHORS = {
  sn150: 'sn-150',
  sn300: 'sn-300',
  ldo: 'industrial-ldo',
  bitumen: 'asphalt-bitumen',
}

/**
 * Requirement value shown in the contact form's "Requirement" select,
 * keyed by product id. Mirrors quoteForm.requirementOptions in data/content.js.
 */
export const PRODUCT_REQUIREMENTS = {
  sn150: 'Base Oil SN150',
  sn300: 'Base Oil SN300',
  ldo: 'LDO',
  bitumen: 'Bitumen',
}

/**
 * Canonical, indexable routes — used to build sitemap.xml.
 * Redirect routes and the 404 page are deliberately excluded.
 */
export const SITEMAP_PATHS = [
  PATHS.HOME,
  PATHS.ABOUT,
  PATHS.PRODUCTS,
  PATHS.TECHNOLOGY,
  PATHS.QUALITY,
  PATHS.INDUSTRIES,
  PATHS.CONTACT,
]

/**
 * Legacy / alternative URLs that should redirect to a canonical route.
 * The "Our Facility" page is a section of the About page today.
 */
export const REDIRECTS = [
  { from: 'home', to: PATHS.HOME },
  { from: 'index', to: PATHS.HOME },
  { from: 'about-us', to: PATHS.ABOUT },
  { from: 'product', to: PATHS.PRODUCTS },
  { from: 'our-products', to: PATHS.PRODUCTS },
  { from: 'technology-page', to: PATHS.TECHNOLOGY },
  { from: 'quality-and-sustainability', to: PATHS.QUALITY },
  { from: 'industry', to: PATHS.INDUSTRIES },
  { from: 'industries-we-serve', to: PATHS.INDUSTRIES },
  { from: 'contact-us', to: PATHS.CONTACT },
  { from: 'our-facility', to: `${PATHS.ABOUT}#${FACILITY_ANCHOR}` },
]
