ORION OIL - DIAGRAM IMAGES (dark + gold theme)
=============================================

WHAT'S INSIDE
  public/images/products/      4 SVG diagrams  (product cards)
  public/images/industries/    9 SVG diagrams  (Industries page)
  public/images/orion-oil-og-image.jpg   1200x630 social share image (JPG on purpose, ~90 KB)
  png-versions/                the same 13 diagrams as 1280x720 PNG (~200 KB each), if you prefer PNG
  source/                      editable sources (OG svg + the generator script)

HOW TO USE
  1. Copy the "public" folder into your project root (merge with your existing public/).
  2. Use ONE format per image. Either keep the .svg files, or use the .png files
     from png-versions/ (same file names, only the extension differs).
  3. Do not keep a realistic and a diagram image with the same base name side by side
     (e.g. an old orion-oil-products-sn150-base-oil.png and the new .svg) -
     delete or rename the one you do not want, or the code may point to the wrong one.
  4. In the Claude Code prompts, each prompt detects the real file extension, so .svg
     works. For the OG image keep the .jpg (LinkedIn/WhatsApp do not read SVG).

NOTES
  - The 13 card images contain NO text, so nothing can be garbled.
  - SVGs are 6-13 KB each and stay sharp at any size (PNG versions are about 200 KB each).
  - The logo mark on the OG image is a simple droplet stand-in. If you want your exact
    logo, open source/orion-oil-og-image.svg in Canva/Figma/Inkscape and swap it in,
    or send Claude the real logo file.
  - Product/industry diagrams are illustrative, not drawings of your actual plant or oil.
