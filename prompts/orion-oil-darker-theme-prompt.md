# Prompt for Claude Code — Darken the theme & take creative freedom

Before changing anything, look at the current UI as a whole — every page, every
component, the current color tokens in `tailwind.config.js`, and how the
black/gold palette is currently being applied. Get a real feel for the mood
of the brand (premium, industrial, engineering-grade, trustworthy) before
touching code.

## The core ask
Push the overall theme **darker and richer** — the current near-black
(`#0B0F14`) and card tone (`#12171C`) should read as the definite dominant
mood of the site, not just the hero section. Audit every page and section —
including ones that may have drifted lighter or inconsistent — and bring
them all in line with a confident, deep, premium dark theme. Gold stays the
one accent color that pops against it.

Specifically look for and fix:
- Any section still using plain white/light-gray backgrounds where a dark
  panel would feel more premium and consistent (it's fine to keep occasional
  contrast breaks if they serve real visual rhythm — use your judgment on
  where a light section still earns its place vs. where it's just leftover
  from the earlier build)
- Flat single-color backgrounds that could instead use subtle depth — soft
  radial gradients, faint noise/grain texture, subtle vignette, or layered
  panel tones (ink → ink-soft → ink-border) so the darkness doesn't feel
  flat or dead
- Text contrast — as backgrounds get darker, double check every text color
  still passes comfortable readability (body text, muted captions, table
  text, form placeholder text)
- Card and section borders — make sure dark-on-dark panels still read as
  distinct layers (subtle border or elevation, not just color-on-color)

## You have creative freedom here
Don't just mechanically swap colors. You understand the current UI, the
brand, and the design system doc already in this project — use that
judgment. Where you see an opportunity to make the site feel more premium,
more cohesive, or more "expensive" through better backgrounds, spacing,
subtle motion, or layering, make that call yourself rather than asking for
confirmation on every small decision. Treat this as: take the current site
and make it the best possible version of a dark, premium, industrial B2B
brand site — using your own taste and best judgment for anything not
explicitly specified.

Things you're free to decide on your own:
- Exact gradient/texture treatment for backgrounds (as long as it stays
  subtle and premium, not busy or distracting)
- Whether particular sections deserve a slightly different dark tone for
  visual rhythm (e.g. alternating `ink` and `ink-soft` between sections)
- Any additional micro-interactions or hover/scroll polish that reinforces
  the darker, more premium feel
- Small typography or spacing adjustments if they help the darker theme
  read as intentional rather than just "the lights turned off"

## What must stay fixed
- The gold accent color and its role (CTAs, icons, eyebrow labels, accents)
  stays exactly as defined in the design system doc — don't introduce a
  second accent color
- Keep all existing content, copy, functionality (Google Form links,
  WhatsApp button, spec PDF buttons, routing) untouched — this is a visual
  theme pass, not a content or functionality change
- Maintain full accessibility contrast ratios (WCAG AA minimum) even as
  things get darker — verify, don't assume

## Mobile
Apply the same audit to mobile breakpoints specifically — dark themes can
look great on desktop but muddy or low-contrast on smaller/dimmer phone
screens, so double check readability and visual hierarchy at mobile widths
too, not just that it scales down correctly.

Go through the entire codebase, apply this darker and more refined theme
end to end, and use your own best design judgment throughout — you don't
need to check in before making stylistic calls that clearly serve a more
premium, cohesive dark UI.
