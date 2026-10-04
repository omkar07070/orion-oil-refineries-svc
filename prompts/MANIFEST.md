# Image Manifest — public/images

Drop the real photo into each slot using the **exact filename** listed, so the
React code (which will reference these paths directly) doesn't need touching
later. Recommended sources: **Unsplash** and **Pexels** (both free for
commercial use, no attribution legally required, high-res). Search terms are
given per slot — pick whichever result best matches Orion Oil's dark/gold
industrial mood.

> Tip: on Unsplash/Pexels, filter by orientation (landscape for heroes,
> square for cards) and download the "Large" size, then compress with
> `squoosh.app` or `tinypng.com` before adding to the repo.

## /public/images/hero/
| Filename | Used for | Search terms |
|---|---|---|
| `hero-refinery.jpg` | Home hero background (oil pour + refinery towers at dusk) | "oil refinery towers dusk", "industrial distillation plant night" |

## /public/images/about/
| Filename | Used for | Search terms |
|---|---|---|
| `facility-exterior.jpg` | About Us — facility photo | "industrial storage tanks facility", "chemical plant exterior" |
| `facility-interior.jpg` | About Us — secondary shot | "industrial pipes tanks plant interior" |

## /public/images/products/
| Filename | Used for | Search terms |
|---|---|---|
| `base-oil-sn150.jpg` | Product card — SN-150 | "amber oil drum industrial", "motor oil barrel" |
| `base-oil-sn300.jpg` | Product card — SN-300 | "oil drum warehouse", "industrial oil barrels stacked" |
| `industrial-ldo.jpg` | Product card — LDO | "fuel tank industrial", "furnace boiler industrial" |
| `asphalt-bitumen.jpg` | Product card — Bitumen | "bitumen asphalt road paving", "hot asphalt construction" |

## /public/images/technology/
| Filename | Used for | Search terms |
|---|---|---|
| `distillation-process.jpg` | Technology page hero | "distillation column industrial", "vacuum distillation plant" |
| `process-diagram.jpg` | Refining process section | "industrial pipeline valves close up" |

## /public/images/quality/
| Filename | Used for | Search terms |
|---|---|---|
| `lab-testing.jpg` | Quality & Sustainability — lab shot | "laboratory glassware testing", "chemist analyzing sample" |
| `sustainability.jpg` | Sustainability block (optional, or use an icon/illustration instead) | "green sustainability industrial", "circular economy" |

## /public/images/industries/ (one 4:3 image per card)
| Filename | Industry | Search terms |
|---|---|---|
| `lubricant-manufacturers.jpg` | Lubricant Manufacturers | "engine parts gears oil" |
| `hydraulic-oil-blenders.jpg` | Hydraulic Oil Blenders | "hydraulic machinery industrial" |
| `gear-oil-producers.jpg` | Gear Oil Producers | "industrial gears metal close up" |
| `boiler-furnace.jpg` | Boiler & Furnace Industries | "industrial furnace boiler plant" |
| `road-construction.jpg` | Road Construction | "asphalt road highway construction" |
| `waterproofing-coatings.jpg` | Waterproofing & Coatings | "roofing waterproofing industrial" |
| `heavy-engineering.jpg` | Heavy Engineering & Forging | "steel forging factory heavy engineering" |
| `infrastructure.jpg` | Infrastructure Sector | "infrastructure construction bridge industrial" |
| `industrial-manufacturing.jpg` | Industrial Manufacturing | "factory manufacturing plant industrial" |

---

### If Claude Code has web/browser access
You can hand Claude Code this manifest and ask it to source and download a
matching royalty-free image for each row directly from Unsplash's public
source endpoint, e.g.:
```
https://source.unsplash.com/1600x900/?oil,refinery,industrial
```
(swap the comma-separated keywords per row). This endpoint returns a random
matching photo each time it's requested, so re-run it if the first result
doesn't fit the mood.

### If Claude Code does NOT have internet access
Leave these as placeholder `<ImagePlaceholder />` components (already built
in the refactor) — the folder structure and filenames above are ready for
you to manually drop real photos in later; the code should reference these
exact paths so no further edits are needed once files land in the folders.
