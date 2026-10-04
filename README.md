# Orion Oil Website

A professional, multi-page corporate website for **Orion Oil and Gas** — a Pune, Maharashtra-based company that refines premium base oils and industrial fuels from 100% recycled feedstocks using advanced deep-vacuum batch distillation technology.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite 5) |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Routing | React Router DOM 6 |
| Language | JavaScript (ES2022) |

---

## Folder Structure

```
orion-oil-website/
├── public/
│   └── favicon.svg              # Site favicon (OO monogram in gold)
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx          # Sticky header with animated mobile nav
│   │   ├── Footer.jsx          # Site footer
│   │   ├── WhatsAppButton.jsx   # Fixed floating WhatsApp CTA
│   │   ├── PageHeader.jsx       # Reusable page hero header
│   │   ├── SectionHeader.jsx   # Centered section title + subtitle
│   │   ├── AnimateOnScroll.jsx  # IntersectionObserver fade/slide-in wrapper
│   │   ├── AnimatedCounter.jsx  # Scroll-triggered number counter
│   │   ├── FeatureCard.jsx      # Icon + title + description card
│   │   ├── ProductCard.jsx      # Product display card with actions
│   │   ├── IndustryCard.jsx      # Industry served card
│   │   ├── ProcessStep.jsx       # Numbered refining process step
│   │   ├── TechPillar.jsx        # Technology pillar with bullet points
│   │   └── QuoteModal.jsx        # Full quote request form modal
│   ├── pages/                  # Route-level page components
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # About Us page
│   │   ├── Products.jsx        # Products page
│   │   ├── Technology.jsx      # Technology page
│   │   ├── Quality.jsx         # Quality & Sustainability page
│   │   ├── Industries.jsx      # Industries We Serve page
│   │   └── Contact.jsx         # Contact Us page
│   ├── data/
│   │   └── content.js          # ⚠️ SINGLE SOURCE OF TRUTH for all site copy
│   ├── App.jsx                 # Router setup with Header/Footer/WhatsAppButton
│   ├── main.jsx                # React root mount
│   └── index.css               # Tailwind directives + custom utilities
├── index.html                   # Vite entry point
├── package.json
├── vite.config.js
├── tailwind.config.js           # Extended with orion color palette
├── postcss.config.js
└── README.md
```

---

## How to Run Locally

### Install dependencies

```bash
npm install
```

### Development server (with hot reload)

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production build

```bash
npm run build
```

Output lands in `dist/` — ready to serve from any static host (Vercel, Netlify, Cloudflare Pages, etc.)

### Preview production build locally

```bash
npm run preview
```

---

## Editing Site Content

**All site copy lives in a single file.** Open `src/data/content.js`.

### What to edit in `content.js`

| Item | Where to edit |
|------|--------------|
| Company name, tagline | `COMPANY_NAME`, `footer.brand` |
| WhatsApp number | `WHATSAPP_NUMBER` (international, no spaces) |
| Pre-filled WhatsApp message | `WHATSAPP_MESSAGE` |
| Google Form URL (future) | `GOOGLE_FORM_URL` |
| Contact details (address, email, phone) | `contact` object |
| GST number | `GST_NUMBER` |
| Navigation links | `navLinks` array |
| All page copy (hero, about, products, etc.) | Individual page data objects (`homePage`, `aboutPage`, etc.) |
| Quote form fields and options | `quoteForm` object |

---

## Adding Real Content

### Spec PDF Downloads
The "View Specs" buttons currently link to placeholder paths like `/docs/base-oil-sn150-specs.pdf`. To make them functional:

1. Create a `public/docs/` folder
2. Place your PDF files there (e.g. `public/docs/base-oil-sn150-specs.pdf`)
3. Update the `specsPdf` field in the product data in `src/data/content.js`

### Product and Hero Photography
All product images and hero photography use placeholder SVG illustrations. To replace them with real photography:

1. Add your images to `public/images/`
2. Create a reusable `Image` component or replace the placeholder `<div>` elements in each page/component
3. Consider lazy-loading large images with `loading="lazy"`

### Google Form URL
When the Google Form for quote requests is ready:

1. Copy the form's `formAction` URL
2. Update `GOOGLE_FORM_URL` in `src/data/content.js`
3. Update the `handleSubmit` function in `QuoteModal.jsx` to POST to that URL instead of opening WhatsApp

---

## Animation & Motion

### Approach

Framer Motion powers all animations. Three main patterns are used:

1. **`AnimateOnScroll`** — Wraps any content in an `IntersectionObserver`. When the element enters the viewport, it fades in and slides up. Used on most content sections.

2. **`AnimatedCounter`** — Counts up from 0 to a target value when scrolled into view. Used on stat blocks (e.g. "100% Recovery"). Parses numeric prefixes/suffixes intelligently.

3. **Direct Framer Motion props** — Cards and buttons use `whileHover`, `whileTap` for hover/tap micro-interactions directly.

### Mobile Nav

The hamburger menu is a full-height right-side drawer with:
- Backdrop overlay with tap-to-close
- Staggered link entrance animation (each link delays 70ms after the previous)
- Body scroll lock while open (via `.nav-open` CSS class)
- Animated hamburger → X transition on the toggle button

### Disable Animations

Users who prefer reduced motion will have all animations automatically skipped. This is handled in `src/index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

To disable globally without user preference, remove Framer Motion imports and replace `motion.*` components with plain `<div>` elements.

---

## Mobile Responsiveness

| Breakpoint | Behavior |
|-----------|----------|
| `< 640px` (sm) | Single-column layouts, hamburger nav, stacked cards |
| `640–1024px` (md) | 2-column grids where appropriate |
| `> 1024px` (lg) | Full desktop nav, horizontal layouts |

### Mobile-specific considerations

- All interactive elements have a minimum tap target of **44×44px** (Apple HIG / WCAG recommendation)
- The floating WhatsApp button is positioned `bottom-6 right-6` — it does not overlap the mobile nav toggle
- Hover-only states (`:hover` without `:focus`) are avoided for mobile-compatible interactions
- No horizontal overflow — all layouts use `overflow-x: hidden` on body via the `.nav-open` class during scroll lock

---

## Known Limitations & TODOs

- **[HIGH] Quote form** currently opens WhatsApp with pre-filled message text. Should be replaced with actual Google Form POST or a backend endpoint once the Google Form URL is finalized.

- **[HIGH] Spec PDFs** are placeholder links (`/docs/...`). Place real PDF files in `public/docs/` and update paths in `content.js`.

- **[MEDIUM] Product photography** uses CSS gradient placeholders. Replace with real product images for production.

- **[MEDIUM] Hero section** uses a decorative SVG circle. Replace with a hero photograph of the Orion Oil facility once available.

- **[LOW] Contact modal** in Footer shows contact details via `alert()`. Should be upgraded to a proper modal component for production.

- **[LOW] NABL / TPI laboratory** details are hardcoded in content. Consider moving to `content.js` if they change in future.

- **[LOW] No 404 page** — add a `NotFound` component and catch-all route (`<Route path="*" element={<NotFound />} />`).

- **[LOW] No sitemap.xml or robots.txt** — add these to `public/` for SEO if deploying to a domain.

- **[LOW] Favicon** is a simple OO monogram. Replace with a proper brand mark when available.

---

## Deployment

The `dist/` folder produced by `npm run build` is a fully static bundle. Deploy to any static host:

```bash
# Vercel
vercel dist/

# Netlify
netlify deploy --dir=dist --prod

# Cloudflare Pages
wrangler pages deploy dist/
```
