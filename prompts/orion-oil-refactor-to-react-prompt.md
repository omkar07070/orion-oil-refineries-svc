# Prompt for Claude Code — Refactor to React

Refactor this entire project from vanilla HTML/CSS/JS into a proper **React (Vite + JavaScript) + Tailwind CSS** application. Don't just wrap the existing HTML in a single component — do a real refactor:

## 1. Componentize everything
- Break every page into small, reusable components under `src/components/` (Header, Footer, WhatsAppButton, Hero, ProductCard, IndustryCard, ProcessStep, StatBlock, ContactForm, etc.) following the structure already implied by the current HTML/CSS.
- Set up React Router with a route per existing page (Home, About Us, Products, Technology, Quality & Sustainability, Industries, Contact Us).
- Move all hardcoded text, contact details, the Google Form URL, WhatsApp number, and spec PDF paths into a single `src/data/content.js` file — no copy should be hardcoded inside components.
- Port the existing CSS into Tailwind utility classes (keep the current black/white/gold color system and typography as Tailwind theme extensions in `tailwind.config.js` — don't just dump the old CSS file in as-is unless something is too custom for Tailwind, in which case keep it scoped in a small `index.css`).
- Convert any vanilla JS (menu toggle, WhatsApp button, form links, scroll behavior, etc.) into proper React state/hooks — no direct DOM manipulation (`document.querySelector`, `addEventListener` outside `useEffect`, etc.).

## 2. Add polish and motion (desktop + mobile)
Add tasteful, professional effects appropriate for a B2B industrial brand — not flashy, but noticeably more alive than the static original:
- Scroll-reveal fade/slide-in animations on section entry (use Framer Motion or `IntersectionObserver` + CSS transitions)
- Smooth hover states on cards, buttons, and nav links (subtle lift/scale + gold accent transitions)
- Sticky header that adds a shadow/background-blur once the user scrolls
- Animated counters for any stat blocks (e.g. "95% Recovery Efficiency" counting up on scroll into view)
- Smooth mobile nav: an animated hamburger menu that slides/fades in a full-screen or drawer menu, with staggered link entrance animation, and locks body scroll while open
- Ensure every animation has a reduced-motion fallback (`prefers-reduced-motion`) so it doesn't animate for users who've disabled motion
- Test that all effects perform well and look correct at mobile widths specifically (not just scaled-down desktop) — tap targets sized appropriately (min 44px), no hover-only interactions that mobile users can't trigger, no horizontal overflow, and the WhatsApp floating button positioned so it never overlaps content or the mobile nav toggle

## 3. Code quality
- No inline styles unless truly one-off; prefer Tailwind classes or CSS modules for anything Tailwind can't express
- Reasonable prop typing via JSDoc comments (since we're staying in plain JS, not TypeScript)
- Clean up unused CSS/JS from the old vanilla version — don't leave dead files in the repo
- Make sure `npm run dev` and `npm run build` both work cleanly with no console errors/warnings

## 4. Generate a full README.md
Write a thorough `README.md` for this project covering:
- Project overview (what Orion Oil is, what this site is for)
- Tech stack used
- Folder/file structure explained (what lives where and why)
- How to run locally (`npm install`, `npm run dev`) and how to build for production (`npm run build`)
- Where to edit site copy/contact info (`src/data/content.js`)
- Where to plug in the real Google Form URL, the real spec PDFs, and real product/hero photography (replacing the placeholder image components)
- A short section on the animation/motion approach used and how to adjust or disable it
- Mobile responsiveness notes (breakpoints used, how the mobile nav works)
- Any known limitations or TODOs for whoever picks this up next

Do the full refactor now — restructure the codebase, add the effects, and generate the README at the end.
