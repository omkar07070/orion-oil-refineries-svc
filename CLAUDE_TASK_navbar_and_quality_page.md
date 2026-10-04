# Claude Code Task Brief — Orion Oil Website
### Fix Header/Navbar + Build Quality Assurance & Sustainability Commitment Sections

You are working inside an existing React 18 + Vite + Tailwind CSS + Framer Motion + React Router codebase for **Orion Oil and Gas**, a Pune-based B2B industrial oil refining company. Before writing any code, **read `src/data/content.js` (or wherever it lives in this repo) in full** — it is the single source of truth for all copy, links, and structured data. Do not hardcode strings that already exist in that file; import and use them.

Also locate and read the existing `Header`/`Navbar` component and the `Quality` page component before editing anything, so your changes match the project's existing patterns (component structure, Tailwind conventions, animation utilities like `AnimateOnScroll`, `AnimatedCounter`, etc.).

---

## Design system (must stay consistent)

- **Background / primary:** Ink / Dark Navy `#0B0F14`
- **Accent:** Gold `#C6912F` — used for CTAs, highlights, active nav states, the flame motif
- Tone: dark, professional, industrial. No playful colors, no light-mode inconsistency.
- Use the project's existing font stack and spacing scale — don't introduce new ones.
- Reuse existing motion patterns (Framer Motion variants already used elsewhere in the app) rather than inventing new animation styles.

---

## TASK 1 — Fix the Header / Navbar

The navbar is currently inconsistent with the approved spec. Rebuild it to match **exactly** the following, driven entirely by the `navLinks` array already exported from `content.js`:

```js
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'Quality', href: '/quality' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact Us', href: '/contact' },
]
```

### Requirements

1. **Fixed top header**, full width, sits above all page content (`position: fixed` or `sticky`, with a backdrop blur/solid navy background on scroll so content doesn't show through).
2. **Left side:** Orion Oil logo (flame/drop icon + wordmark), links to `/`.
3. **Center/right side (desktop ≥1024px):** render the seven `navLinks` in order, left to right, as horizontal text links.
   - Active route gets the gold accent color and/or an underline indicator.
   - Inactive links are light/neutral, transitioning to gold on hover (smooth color transition, ~150–200ms).
   - Use React Router's `NavLink` (or equivalent) so active state is automatic — don't hand-roll active-state logic if `NavLink` is available in this codebase.
4. **Far right (desktop):** a distinct **"Request for Quote"** CTA button — gold filled or gold-bordered, clearly visually separated from the nav links (it is an action, not a nav item). Clicking it opens the existing `QuoteModal` component. Do **not** treat it as an 8th nav link — it must be visually distinct (button styling: padding, rounded corners, weight) and positioned at the top-right corner of the header, as specified.
5. **Mobile (< 1024px):**
   - Hamburger icon replaces the inline nav links.
   - Tapping it opens a mobile menu (slide-down or slide-in drawer, animated with Framer Motion) listing all seven `navLinks` stacked vertically, in the same order.
   - The "Request for Quote" CTA also appears in the mobile menu, styled as a full-width button, placed at the bottom of the link list (or top — pick one, but be consistent and make it prominent).
   - Menu closes on link click and on outside click/Escape.
6. **Accessibility:** semantic `<nav>` element, `aria-label` on the nav, `aria-expanded`/`aria-controls` on the hamburger button, keyboard-navigable (Tab order, Enter/Space triggers), focus-visible states on all interactive elements, sufficient color contrast against the navy background.
7. **No dead links, no typos, no reordering.** The order and labels must match `navLinks` verbatim — if you need to change copy, change it in `content.js`, not by hardcoding it in the component.

### Acceptance checklist for Task 1
- [ ] Nav renders all 7 links from `navLinks`, in order, correct labels/hrefs
- [ ] "Request for Quote" is a visually distinct button, top-right on desktop, opens `QuoteModal`
- [ ] Active page is visually indicated in gold
- [ ] Mobile hamburger menu works, animated, includes all links + CTA
- [ ] Fully responsive from 320px to 1920px+ with no overlap/clipping/text wrap issues
- [ ] Keyboard accessible + passes basic a11y checks (labels, focus states, contrast)

---

## TASK 2 & 3 — Rebuild the `/quality` page: Quality Assurance + Sustainability Commitment

The `/quality` route already has a data object `qualityPage` in `content.js` with everything you need — do not invent new copy. Build (or refactor) two clearly separated, well-designed, fully responsive sections on this page, in this order:

### Section A — Quality Assurance
Bind to `qualityPage.qualityAssurance`:
- Section heading built from `title` + `titleAccent` (gold accent word), plus `subtitle`.
- `description` paragraph.
- The four `points` (bold label + text) — present as a clean checklist/feature-list layout (icon + bold lead-in + supporting text), not a wall of text. Use a responsive grid: 1 column on mobile, 2 columns on tablet/desktop.
- The `equipment` array (Gas Chromatography, FTIR, AAS, Elemental Analysis) — present as a card grid (icon or number + name + description), responsive: 1 col mobile → 2 col tablet → 4 col desktop.
- Also render `testParameters` (from the top level of `qualityPage`) as a **responsive table** of Property vs. ASTM Standard. On mobile, convert the table to a stacked card/list format (property label + standard value) rather than letting an HTML table overflow/scroll awkwardly — this is a common responsive-table pattern; use it here.

### Section B — Sustainability Commitment
Bind to `qualityPage.sustainability`:
- Section heading from `title` + `titleAccent` + `subtitle`.
- `description` paragraph.
- The five `points` — same bold-label + text pattern as above, responsive grid (1 col mobile, 2 col desktop).
- The `stats` array (100% Waste Oil Recovered, 0 kg Waste to Landfill, Net-Zero by 2070) — display using the existing `AnimatedCounter` component where the value is numeric/percentage-like, in a horizontal stat bar that stacks vertically on mobile.
- Also render `environmentalImpact` (from the top level of `qualityPage`) as a second stat/impact row directly under or beside the sustainability stats — same responsive stat-bar treatment, visually distinguished (e.g., a subtly different card background or divider) from the primary sustainability stats so the two data sets don't blur together.

### Shared requirements for both sections
- Use the page's `pageHeader` (`title`, `titleAccent`, `subtitle`) at the top of the page as the hero/header for `/quality`, before Section A.
- Visually separate Section A and Section B clearly (distinct background shade, divider, or spacing break) so a scanning visitor immediately understands "this part is about testing/QA" vs. "this part is about sustainability" — while keeping both inside the ink-navy/gold design system.
- Use `AnimateOnScroll` (or the project's existing scroll-reveal pattern) to fade/slide each block in as the user scrolls — consistent with how other pages in this site already animate content.
- Every list/grid must reflow correctly at common breakpoints: 320–375px (small mobile), 768px (tablet), 1024px+ (desktop), 1440px+ (large desktop). No horizontal scroll, no clipped text, no overlapping cards at any width.
- Maintain heading hierarchy (one `h1` for the page, `h2` for each major section, `h3` for sub-items) for SEO/accessibility.
- Images/icons: use whatever icon library is already used elsewhere in the project (check imports in existing components) rather than introducing a new dependency.

### Acceptance checklist for Tasks 2 & 3
- [ ] `/quality` page header renders from `qualityPage.pageHeader`
- [ ] Quality Assurance section: description, 4 points, 4-equipment grid, and the ASTM test-parameters table (responsive → stacked on mobile) all present and bound to `content.js`
- [ ] Sustainability Commitment section: description, 5 points, sustainability stats (animated counters), and environmental-impact stats all present and bound to `content.js`
- [ ] Sections are visually distinct from each other but consistent with the site's navy/gold theme
- [ ] Scroll-reveal animations match the rest of the site
- [ ] Fully responsive, no layout breakage from 320px to 1920px+
- [ ] No hardcoded copy — everything sourced from `content.js`

---

## General engineering constraints

- Don't break any other route/page while making these changes — run through `/`, `/about`, `/products`, `/technology`, `/industries`, `/contact` after your edits to confirm the new Header still renders correctly everywhere.
- Keep component and prop naming consistent with the rest of the codebase.
- Prefer editing existing components over creating parallel/duplicate ones, unless the existing `Quality` page component is a single monolithic file — in that case, feel free to split it into smaller subcomponents (e.g., `QualityAssuranceSection.jsx`, `SustainabilityCommitmentSection.jsx`) for readability, and import them into the page.
- After implementation, briefly summarize what files you changed/created and flag any assumptions you had to make (e.g., icon library choice, exact stat layout) so they can be reviewed.
