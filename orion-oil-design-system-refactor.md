# Prompt for Claude Code — Match the Real Figma Design System

## Important context on the uploaded .fig file
The `.fig` file you have is the **generic "Relume Figma Kit (v3.7) Community"** —
the raw component library Orion Oil's site was built from, not the finished,
customized Orion Oil design itself. It's a huge multi-industry kit (SaaS,
restaurants, fitness, real estate, etc.) with no Orion-specific colors or
copy in it. The *actual* Orion Oil layout and palette live in the page
screenshots embedded in the original brief doc (`orion-oil-content.md` /
the DOCX) — those are genuine exports from the customized Figma file.

So: don't try to pull colors out of the raw `.fig` kit. Below is the **exact
color palette extracted by sampling pixels directly from the real Orion Oil
page screenshots**, which is far more accurate than eyeballing a generic kit.

## Extracted color palette (use these exact values)

```js
// tailwind.config.js — theme.extend.colors
colors: {
  ink: {
    DEFAULT: '#0B0F14',   // primary near-black background (sampled from hero/section bg)
    soft:    '#12171C',   // slightly lighter panel/card black
    border:  '#22282F',   // subtle borders/dividers on dark sections
  },
  gold: {
    DEFAULT: '#C6912F',   // primary brand gold (buttons, accents, icons)
    light:   '#D9A83D',   // hover state / lighter highlight
    dark:    '#A8791F',   // pressed state / deep accent
  },
  paper: {
    DEFAULT: '#FFFFFF',   // white sections
    muted:   '#F5F5F3',   // very light gray alternate section bg
  },
  slate: {
    DEFAULT: '#9CA3AF',   // muted body text on dark backgrounds
    dark:    '#374151',   // muted body text on light backgrounds
  },
}
```

These were sampled directly from the hero, Quality & Sustainability, and
Contact Us screenshots — the gold clusters consistently around `#C0-D9` in R,
`#8B-A8` in G, `#2E-4D` in B, and the background black consistently sampled
at `#080B0E`–`#12171C` depending on panel depth. Use `ink.DEFAULT` as the
main background, `ink.soft` for cards/raised panels sitting on it, and
`gold.DEFAULT` as the one accent color everywhere else (icons, button fills,
underlines, active nav state, stat numbers).

## Typography & component conventions to match
Looking at the real screenshots, replicate these exact patterns:
- **Nav bar:** dark/near-black background, white nav links, gold pill-shaped
  "Request Quote" button on the far right, logo on the far left with a small
  gold flame/drop icon mark before the wordmark
- **Hero:** large bold headline in white, with the second line/key phrase in
  gold; sub-headline in muted gray; two buttons side by side — solid gold
  primary + outlined white/transparent secondary
- **Stat/feature row:** small dark cards in a horizontal row, gold icon in a
  circle at the top, bold white number/label, muted gray caption underneath
- **Section headings:** small gold all-caps eyebrow label above a larger
  white (or black, on light sections) heading — this pattern repeats on
  every interior page ("QUALITY ASSURANCE", "INDUSTRIES WE SERVE", etc.)
- **Cards (industries, products):** rounded corners (~12px), image on top,
  dark panel below with white heading + muted gray description, subtle
  border (`ink.border`) rather than a drop shadow, since the design leans
  flat/dark rather than skeuomorphic
- **Icon treatment:** thin-line icons inside a circular or squircle outline
  in gold — not filled solid icons
- **Buttons:** fully rounded (pill) on primary CTAs; sharper rounded corners
  (~8px) on secondary/outline buttons
- **Tables** (Key Test Parameters): dark header row, alternating subtle row
  shading, gold text for column headers

## What to change in the existing refactored codebase
1. Update `tailwind.config.js` with the exact color tokens above — replace
   any approximate black/gold values currently in use.
2. Audit every component for color drift (e.g. `bg-black` → `bg-ink`,
   `text-yellow-500` or similar generic Tailwind color → `text-gold`) so the
   whole site uses the design-token names consistently instead of raw
   Tailwind palette classes.
3. Apply the section-heading eyebrow pattern (`<span class="text-gold
   uppercase tracking-wide text-sm font-semibold">`) consistently across
   every page — check this matches on About, Technology, Quality &
   Sustainability, Industries, and Contact, not just Home.
4. Standardize card corner radius, border treatment, and icon style (gold
   outline, not solid fill) across ProductCard, IndustryCard, and any
   stat/feature card components so they're visually identical in style.
5. Confirm the primary CTA button pattern (solid gold pill) and secondary
   button pattern (outlined) are both implemented as shared `<Button
   variant="primary" | "secondary" />` components rather than duplicated
   ad-hoc styles per page.

## Real photography
A `pics` folder plan with exact filenames, per-slot purpose, and suggested
free-stock search terms is provided separately (`pics-folder-manifest.md`
and the empty `public/images/...` folder structure) — use that to replace
the current `<ImagePlaceholder />` components once real photos are dropped
in, matching each documented filename exactly so no code changes are needed
later.

Apply this full color/typography/component audit now across every page and
component in the codebase.
