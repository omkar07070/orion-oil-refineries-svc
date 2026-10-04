# Prompt for Claude Code — Wire in the real photography (non-product images only)

I've copied 4 real images into this project at `src/assets/raw-images/`:
- `home_page.jpg`
- `orion_oil1_png.avif`
- `preTreate.jpeg`
- `preTreatement.avif`

Use these to replace the relevant `<ImagePlaceholder />` instances **except
anywhere on the Products page** (SN-150, SN-300, LDO, Bitumen product images
must stay as placeholders — do not touch those, real product photography is
coming separately).

## Specific placements

1. **`home_page.jpg` → Home page hero background.**
   Set it as a full-bleed background image behind the hero section (the one
   with "Engineering the Future of Sustainable Lubricants"). Since this
   image is a dark/black background with bright gold refinery towers, add a
   dark gradient overlay (e.g. `bg-ink/70` or a subtle radial/linear
   gradient from `ink` to transparent) between the image and the text so the
   white headline, gold sub-headline, and buttons stay fully legible with
   strong contrast — don't rely on the image alone for readability. Make
   sure it's responsive (`bg-cover bg-center`) and doesn't distort or crop
   awkwardly on mobile widths — check the image still reads well cropped to
   a taller mobile viewport, adjust `background-position` if key detail gets
   cut off.

2. **`preTreate.jpeg` and `preTreatement.avif` → Technology page, "Refining
   Process" timeline, Step 1: Pre-Treatment & Dehydration.**
   These are two versions of the same shot — use the `.avif` as the primary
   source with the `.jpeg` as a `<picture>` fallback for browsers that don't
   support AVIF, e.g.:
   ```jsx
   <picture>
     <source srcSet={preTreatementAvif} type="image/avif" />
     <img src={preTreateJpeg} alt="Pre-treatment and dehydration process" />
   </picture>
   ```
   Place this as the accompanying image for that specific process step only
   — don't reuse it on the other 4 steps.

3. **`orion_oil1_png.avif` → use your judgment for the best remaining
   placeholder.**
   This is a warm sunset pipeline/refinery shot — it doesn't have an
   explicitly assigned slot yet. Look at the current placeholders across
   About Us, Quality & Sustainability, Industries, and Contact, and place it
   wherever it fits best visually and contextually (a strong candidate is
   the About Us facility section or a secondary Home page section, given
   its wide landscape aspect ratio) — pick the single best-fitting spot
   rather than reusing it in multiple places.

## Technical requirements
- Import these as ES module assets (`import homeHero from
  '../assets/raw-images/home_page.jpg'`) rather than referencing
  `public/` string paths, so Vite optimizes and hashes them properly on
  build
- Add descriptive `alt` text to every image for accessibility
- Lazy-load any of these that aren't above-the-fold (the hero image should
  NOT be lazy-loaded since it's the first thing visible; the others should
  use `loading="lazy"`)
- Confirm none of these introduce layout shift — set explicit width/height
  or aspect-ratio classes so the page doesn't jump as images load
- Leave every Products page image slot untouched as `<ImagePlaceholder />`

Go ahead and wire these in now, and tell me at the end exactly which
placeholder you chose for `orion_oil1_png.avif` and why.
