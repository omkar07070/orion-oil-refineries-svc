import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimateOnScroll from '../components/AnimateOnScroll'
import AnimatedCounter from '../components/AnimatedCounter'
import FeatureCard from '../components/FeatureCard'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { homePage, productsPage } from '../data/content'
import { PATHS, TOPIC_QUOTE, contactHref } from '../routes/paths'

export default function Home() {
  // Preload the above-the-fold hero image with high priority
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = '/images/home_page.jpg'
    link.fetchPriority = 'high'
    document.head.appendChild(link)
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
    }
  }, [])

  const allProducts = [
    { ...productsPage.baseOils.products[0], specsPdf: '/specs/orion-oil-sn150-specs.pdf', image: '/images/products/orion-oil-products-sn150-base-oil.svg', imageAlt: 'Clear golden SN-150 equivalent base oil with short molecular chains and low viscosity' },
    { ...productsPage.baseOils.products[1], specsPdf: '/specs/orion-oil-sn300-specs.pdf', image: '/images/products/orion-oil-products-sn300-base-oil.svg', imageAlt: 'Deep amber SN-300 equivalent base oil with long branched chains and high viscosity' },
    { ...productsPage.industrialFuels.product, specsPdf: '/specs/orion-oil-industrial-ldo-specs.pdf', image: '/images/products/orion-oil-products-industrial-ldo.svg', imageAlt: 'Bulk storage tank supplying industrial LDO fuel to a boiler' },
    { ...productsPage.asphalt.product, specsPdf: '/specs/orion-oil-asphalt-bitumen-specs.pdf', image: '/images/products/orion-oil-products-asphalt-bitumen.svg', imageAlt: 'Hot bitumen binder being poured into a road surface layer' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
        {/* Full-bleed hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/home_page.jpg')` }}
          aria-hidden="true"
        />
        {/* Gradient overlay for contrast — preserves readability over dark refinery image */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_#0B0F14_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {homePage.hero.headline}{' '}
              <span className="text-gold">{homePage.hero.headlineAccent}</span>
            </h1>
            <p className="text-slate text-lg md:text-xl mb-6 max-w-2xl">
              {homePage.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" to={contactHref({ topic: TOPIC_QUOTE })}>
                Request for Quote
              </Button>
              <Link
                to={PATHS.PRODUCTS}
                className="inline-flex items-center px-6 py-2.5 border-2 border-white/30 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:border-gold hover:text-gold min-h-[44px]"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-12 md:py-20 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="OUR PRODUCTS"
            title=""
            titleAccent="Premium Base Oils & Industrial Fuels"
            subtitle={homePage.productsOverview.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
            {allProducts.map((product, i) => (
              <AnimateOnScroll key={product.id} delay={i * 0.1} className="h-full">
                <ProductCard
                  product={product}
                  imageSrc={product.image}
                  imageAlt={product.imageAlt}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" className="py-12 md:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose"
            titleAccent="ORION OIL"
            subtitle="Three reasons leading Indian manufacturers trust Orion for their base oil supply"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: '100% Domestic Supply',
                description: 'Proudly refined in Pune, Maharashtra. No import dependencies, no currency fluctuations, no supply chain uncertainties.',
              },
              {
                title: 'Consistent Re-Refined Quality',
                description: 'Deep-vacuum batch distillation. Consistent Group I equivalent — ASTM color 1–2.',
              },
              {
                title: 'Zero-Waste Process',
                description: 'Every fraction of the feedstock is captured and repurposed — premium base oil, industrial LDO and asphalt modifier.',
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 0.1}>
                <FeatureCard title={item.title} description={item.description} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 md:py-20 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="SUSTAINABILITY"
            title="Committed to a"
            titleAccent="Sustainable Future"
            subtitle={homePage.sustainability.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {homePage.sustainability.features.map((feature, i) => (
              <AnimateOnScroll key={feature.title} delay={i * 0.1}>
                <FeatureCard title={feature.title} description={feature.description} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 md:py-20 bg-ink">
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .ww-panel-reveal {
              transition: none !important;
            }
          }
          @media (min-width: 1100px) {
            .ww-grid {
              display: grid;
              grid-template-columns: 1.15fr 0.85fr;
              gap: 60px;
              align-items: center;
            }
          }
          @media (max-width: 1099px) {
            .ww-grid {
              display: flex;
              flex-direction: column;
              gap: 0;
            }
            .ww-text {
              max-width: 100%;
            }
            .ww-panel {
              width: 100%;
              max-width: 100%;
            }
          }
          @media (max-width: 479px) {
            .ww-stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="ww-grid">
              {/* Left: text content */}
              <div className="ww-text">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {homePage.whoWeAre.title}{' '}
                  <span className="text-gold">{homePage.whoWeAre.titleAccent}</span>
                </h2>
                <p className="text-slate mb-4 leading-relaxed">{homePage.whoWeAre.description}</p>
                <p className="text-slate mb-8 leading-relaxed">{homePage.whoWeAre.description2}</p>
                <Button variant="secondary" to={PATHS.ABOUT}>
                  Learn More About Us
                </Button>
              </div>

              {/* Right: "At a Glance" panel */}
              <motion.div
                className="ww-panel-reveal"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="ww-panel bg-ink-soft border border-ink-border rounded-2xl p-7 md:p-8 h-full">
                  <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-5 block">
                    At a Glance
                  </span>

                  <div className="ww-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                    {/* Top-left */}
                    <div className="ww-stat-tile" style={{ padding: '20px 16px', borderRight: '1px solid #22282F', borderBottom: '1px solid #22282F' }}>
                      <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 700, color: '#C6912F', fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '6px' }}>Pune</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.04em', lineHeight: 1.4 }}>MIDC Bhosari, Pune</div>
                    </div>
                    {/* Top-right */}
                    <div className="ww-stat-tile" style={{ padding: '20px 16px', borderBottom: '1px solid #22282F' }}>
                      <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 700, color: '#C6912F', fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '6px' }}>100%</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.04em', lineHeight: 1.4 }}>Recycled Feedstock</div>
                    </div>
                    {/* Bottom-left */}
                    <div className="ww-stat-tile" style={{ padding: '20px 16px', borderRight: '1px solid #22282F' }}>
                      <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 700, color: '#C6912F', fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '6px' }}>Group I</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.04em', lineHeight: 1.4 }}>Equivalent Base Oils</div>
                    </div>
                    {/* Bottom-right */}
                    <div className="ww-stat-tile" style={{ padding: '20px 16px' }}>
                      <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 700, color: '#C6912F', fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '6px' }}>ASTM 1–2</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.04em', lineHeight: 1.4 }}>Colour Grade</div>
                    </div>
                  </div>

                  <p style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(34,40,47,0.8)', fontSize: '0.7rem', color: '#6B7280', letterSpacing: '0.03em' }}>
                    Proudly refined in Pune, Maharashtra
                  </p>
                </div>
              </motion.div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-ink-soft border-y border-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {homePage.stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insight */}
      <section
        id="industry-insight"
        className="news-section py-16 md:py-20 lg:py-24 bg-ink relative overflow-hidden"
        aria-labelledby="news-heading"
      >
        {/* Subtle radial gold glow behind the section */}
        <div className="news-glow" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Header block ───────────────────────────────────────── */}
          <div className="news-header mb-10 md:mb-14">

            {/* Eyebrow */}
            <span className="news-eyebrow block text-gold uppercase tracking-[0.18em] text-xs font-semibold mb-4">
              Industry Insight
            </span>

            {/* H2 */}
            <h2
              id="news-heading"
              className="news-h2 text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Not All Recycled Base&nbsp;Oils Are the Same
            </h2>

            {/* Lead question — pull quote */}
            <div className="news-lead">
              <p className="text-slate text-base md:text-lg leading-relaxed mb-3">
                When buying recycled base oil, price and colour are usually compared first.
                But there is another important question:
              </p>
              <p className="news-lead-gold text-gold text-lg md:text-xl lg:text-2xl font-semibold leading-snug">
                "How was the oil re-refined?"
              </p>
            </div>

          </div>

          {/* ── Three insight cards ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

            {/* Block 1 */}
            <div className="news-card">
              <div className="news-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H15M9 3V11L4 20H20L15 11V3M9 3H15"/>
                  <path d="M7 15H17"/>
                  <path d="M9 18H15"/>
                </svg>
              </div>
              <h3 className="news-card-title">Two Very Different Processes</h3>
              <ul className="news-card-bullets">
                <li>Acid-washed base oil</li>
                <li>Thin-film vacuum distilled base oil</li>
                <li>The production method can significantly influence the quality, consistency and suitability of the final product.</li>
              </ul>
            </div>

            {/* Block 2 */}
            <div className="news-card">
              <div className="news-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 4h18M6 8h12M9 12h6M12 16h0"/>
                  <path d="M4 4l4 16"/>
                </svg>
              </div>
              <h3 className="news-card-title">Why Thin-Film Vacuum Distillation</h3>
              <ul className="news-card-bullets">
                <li>More effective separation of unwanted components</li>
                <li>Potential to produce a cleaner base oil</li>
                <li>Potential for more consistent, higher-quality output</li>
              </ul>
            </div>

            {/* Block 3 — full width on md, 3rd col on lg */}
            <div className="news-card md:col-span-2 lg:col-span-1">
              <div className="news-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                  <rect x="9" y="3" width="6" height="4" rx="1"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h3 className="news-card-title">What Buyers Should Evaluate</h3>
              <ul className="news-card-bullets">
                <li>Production process</li>
                <li>Laboratory results</li>
                <li>Batch-to-batch consistency</li>
                <li>Application requirements</li>
              </ul>
            </div>

          </div>

          {/* ── Buyer's Decision Formula strip ───────────────────────── */}
          <div className="news-formula mb-10" aria-label="Buyer's Decision Formula">
            <ul className="news-formula-list" role="list">
              <li className="news-formula-chip">Production Process</li>
              <li className="news-formula-op" aria-hidden="true">+</li>
              <li className="news-formula-chip">Laboratory Results</li>
              <li className="news-formula-op" aria-hidden="true">+</li>
              <li className="news-formula-chip">Consistency</li>
              <li className="news-formula-op" aria-hidden="true">+</li>
              <li className="news-formula-chip">Application Requirements</li>
              <li className="news-formula-op" aria-hidden="true">=</li>
              <li className="news-formula-chip news-formula-result">Informed Purchase</li>
            </ul>
          </div>

          {/* ── Key Takeaway callout ─────────────────────────────────── */}
          <div className="news-takeaway" role="note">
            <div className="news-takeaway-inner">
              <div className="news-takeaway-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              </div>
              <div>
                <p className="news-takeaway-headline">Colour alone doesn't tell the full story.</p>
                <p className="news-takeaway-sub">Look beyond appearance and price.</p>
              </div>
            </div>
          </div>

          {/* ── Share your experience line ──────────────────────────── */}
          <p className="news-share mb-6">
            Working with recycled base oils? Tell us what you're seeing in your market.{' '}
            <Link to={PATHS.CONTACT} className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors duration-200">
              Contact Us
            </Link>
          </p>

          {/* ── CTA row ────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" to={contactHref({ topic: TOPIC_QUOTE })}>
              Request a Quote
            </Button>
            <Link
              to={PATHS.CONTACT}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 border-2 border-gold text-gold text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-gold hover:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Talk to Our Team
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        /* ── Section & glow ─────────────────────────────────────────── */

        .news-section {
          /* padding handled by utility classes py-16 md:py-20 lg:py-24 */
        }

        /* Radial gold glow — behind content, no layout effect */
        .news-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 60% at 50% 50%,
            rgba(198,145,47,0.07) 0%,
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .news-section.is-visible .news-glow {
          opacity: 1;
        }

        /* ── Scroll animation — hidden state (JS adds .is-visible) ───── */
        /* Scoped to .js so content is always visible when JS is absent or fails */

        .js .news-section:not(.is-visible) .news-eyebrow,
        .js .news-section:not(.is-visible) .news-h2,
        .js .news-section:not(.is-visible) .news-lead,
        .js .news-section:not(.is-visible) .news-card,
        .js .news-section:not(.is-visible) .news-formula-list li,
        .js .news-section:not(.is-visible) .news-takeaway,
        .js .news-section:not(.is-visible) .news-share,
        .js .news-section:not(.is-visible) .flex.flex-col {
          opacity: 0;
        }

        /* Eyebrow — fade in + gold underline draws left→right */
        .js .news-section:not(.is-visible) .news-eyebrow {
          transform: translateY(-8px);
        }
        .js .news-section:not(.is-visible) .news-eyebrow::after {
          transform: scaleX(0);
          transform-origin: left center;
        }
        .news-eyebrow {
          position: relative;
          display: inline-block;
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .news-eyebrow::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #C6912F, transparent);
          transform: scaleX(1);
          transform-origin: left center;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .news-section.is-visible .news-eyebrow {
          opacity: 1;
          transform: translateY(0);
        }
        .news-section.is-visible .news-eyebrow::after {
          transform: scaleX(1);
        }

        /* H2 — slide up + fade */
        .js .news-section:not(.is-visible) .news-h2 {
          transform: translateY(24px);
        }
        .news-h2 {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s,
                      transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .news-section.is-visible .news-h2 {
          opacity: 1;
          transform: translateY(0);
        }
        /* Lead question — fade in */
        .js .news-section:not(.is-visible) .news-lead {
          transform: translateY(16px);
        }
        .news-lead {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s,
                      transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s;
        }
        .news-section.is-visible .news-lead {
          opacity: 1;
          transform: translateY(0);
        }

        /* Gold lead phrase — gold underline draws in */
        .news-lead-gold {
          position: relative;
          display: inline;
        }
        .news-lead-gold::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #C6912F, #D9A83D);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s;
        }
        .news-section.is-visible .news-lead-gold::after {
          transform: scaleX(1);
        }

        /* Cards — rise + fade, staggered */
        .js .news-section:not(.is-visible) .news-card {
          transform: translateY(32px);
          opacity: 0;
        }
        .news-card {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1),
                      transform 0.6s cubic-bezier(0.22,1,0.36,1),
                      border-top-color 0.3s ease,
                      box-shadow 0.3s ease;
          background: #12171C;
          border: 1px solid #22282F;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          border-top: 2px solid #C6912F;
        }
        .news-card:nth-child(1) { transition-delay: 0.45s, 0.45s, 0s, 0s; }
        .news-card:nth-child(2) { transition-delay: 0.57s, 0.57s, 0s, 0s; }
        .news-card:nth-child(3) { transition-delay: 0.69s, 0.69s, 0s, 0s; }
        .news-section.is-visible .news-card {
          opacity: 1;
          transform: translateY(0);
        }
        /* Hover — gold glow */
        .news-card:hover {
          border-top-color: #D9A83D;
          box-shadow: 0 0 20px rgba(198,145,47,0.12);
        }

        /* Card icons — scale in */
        .news-card-icon {
          color: #C6912F;
          margin-bottom: 14px;
          line-height: 0;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .news-section.is-visible .news-card:nth-child(1) .news-card-icon { transition-delay: 0.55s; }
        .news-section.is-visible .news-card:nth-child(2) .news-card-icon { transition-delay: 0.67s; }
        .news-section.is-visible .news-card:nth-child(3) .news-card-icon { transition-delay: 0.79s; }
        .js .news-section:not(.is-visible) .news-card-icon {
          transform: scale(0.6);
          opacity: 0;
        }
        .news-section.is-visible .news-card-icon {
          transform: scale(1);
          opacity: 1;
        }

        /* Block titles */
        .news-card-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C6912F;
          margin-bottom: 14px;
          line-height: 1.4;
        }

        /* Bullets */
        .news-card-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .news-card-bullets li {
          color: #9CA3AF;
          font-size: 13px;
          line-height: 1.6;
          padding-left: 16px;
          position: relative;
        }
        .news-card-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C6912F;
          flex-shrink: 0;
        }

        /* ── Formula strip ──────────────────────────────────────────── */

        .news-formula {
          display: flex;
          justify-content: center;
        }
        .news-formula-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 2px;
        }
        .news-formula-chip {
          background: #12171C;
          border: 1px solid rgba(198,145,47,0.35);
          border-radius: 9999px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #9CA3AF;
          letter-spacing: 0.02em;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s cubic-bezier(0.22,1,0.36,1),
                      transform 0.4s cubic-bezier(0.22,1,0.36,1),
                      background 0.2s ease,
                      color 0.2s ease;
        }
        .news-formula-op {
          color: #C6912F;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          padding: 0 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .news-section.is-visible .news-formula-chip:nth-child(1)  { opacity:1;transform:none; transition-delay:0.82s; }
        .news-section.is-visible .news-formula-op:nth-child(2)    { opacity:1;            transition-delay:0.90s; }
        .news-section.is-visible .news-formula-chip:nth-child(3)  { opacity:1;transform:none; transition-delay:0.90s; }
        .news-section.is-visible .news-formula-op:nth-child(4)    { opacity:1;            transition-delay:0.98s; }
        .news-section.is-visible .news-formula-chip:nth-child(5)  { opacity:1;transform:none; transition-delay:0.98s; }
        .news-section.is-visible .news-formula-op:nth-child(6)    { opacity:1;            transition-delay:1.06s; }
        .news-section.is-visible .news-formula-chip:nth-child(7)  { opacity:1;transform:none; transition-delay:1.06s; }
        .news-section.is-visible .news-formula-op:nth-child(8)    { opacity:1;            transition-delay:1.14s; }

        /* Result chip — outlined gold, glows when visible */
        .news-formula-result {
          border-color: #C6912F;
          color: #C6912F;
          background: rgba(198,145,47,0.06);
        }
        .news-section.is-visible .news-formula-chip.news-formula-result {
          opacity:1;transform:none;
          transition-delay:1.14s;
          animation: news-chip-glow 1.2s ease 1.3s forwards;
        }
        @keyframes news-chip-glow {
          0%   { box-shadow: 0 0 0 0 rgba(198,145,47,0.4); }
          50%  { box-shadow: 0 0 12px 4px rgba(198,145,47,0.2); }
          100% { box-shadow: 0 0 0 0 rgba(198,145,47,0); }
        }

        /* ── Key Takeaway callout ───────────────────────────────────── */

        .js .news-section:not(.is-visible) .news-takeaway {
          transform: translateX(-24px);
          opacity: 0;
        }
        .news-takeaway {
          background: rgba(198,145,47,0.07);
          border-left: 4px solid #C6912F;
          border-radius: 0 10px 10px 0;
          padding: 20px 24px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1) 1.25s,
                      transform 0.6s cubic-bezier(0.22,1,0.36,1) 1.25s;
        }
        .news-section.is-visible .news-takeaway {
          opacity: 1;
          transform: translateX(0);
        }
        .news-takeaway-inner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .news-takeaway-icon {
          color: #C6912F;
          flex-shrink: 0;
          margin-top: 2px;
          line-height: 0;
        }
        .news-takeaway-headline {
          color: #D9A83D;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.4;
          margin: 0 0 4px;
        }
        .news-takeaway-sub {
          color: #9CA3AF;
          font-size: 13px;
          margin: 0;
        }

        /* ── Share your experience ──────────────────────────────────── */

        .js .news-section:not(.is-visible) .news-share {
          opacity: 0;
          transform: translateY(8px);
        }
        .news-share {
          text-align: center;
          color: #9CA3AF;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1) 1.38s,
                      transform 0.5s cubic-bezier(0.22,1,0.36,1) 1.38s;
        }
        .news-section.is-visible .news-share {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── CTA row — slide up last ─────────────────────────────────── */

        .js .news-section:not(.is-visible) .flex.flex-col {
          transform: translateY(12px);
        }
        .news-section .flex.flex-col {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1) 1.48s,
                      transform 0.5s cubic-bezier(0.22,1,0.36,1) 1.48s;
        }
        .news-section.is-visible .flex.flex-col {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive — md: 3rd card full width ───────────────────── */

        @media (min-width: 768px) and (max-width: 1023px) {
          .news-card:nth-child(3) {
            grid-column: 1 / -1;
          }
        }

        /* Mobile: formula chips wrap naturally, buttons stack */
        @media (max-width: 640px) {
          .news-formula-list {
            gap: 6px;
          }
          .news-formula-chip {
            font-size: 11px;
            padding: 5px 11px;
          }
          .news-takeaway-inner {
            align-items: center;
          }
        }

        /* prefers-reduced-motion — show everything immediately */
        @media (prefers-reduced-motion: reduce) {
          .news-eyebrow, .news-h2, .news-lead, .news-card,
          .news-formula-chip, .news-formula-op, .news-takeaway,
          .news-share, .news-section .flex.flex-col,
          .news-glow {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          .news-eyebrow::after, .news-lead-gold::after {
            transform: none !important;
            transition: none !important;
          }
          .news-card-icon {
            transform: scale(1) !important;
            opacity: 1 !important;
          }
        }

        /* ── Why Choose Us — clamp descriptions to 2 lines on desktop ── */
        @media (min-width: 768px) {
          #why-choose .bg-ink-soft p {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.4;
          }
        }
      `}</style>

      {/*
        Scroll-triggered reveal for #industry-insight.
        useEffect runs after the DOM is committed — guaranteed to find the element.
        Runs once; IntersectionObserver disconnects itself after first trigger.
      */}
      <EffectInsightReveal />
    </>
  )
}

/**
 * IntersectionObserver reveal for #industry-insight.
 * useEffect (not a script tag) is React's guaranteed way to access committed DOM.
 * All failure modes (no IO, no support, already-in-view, observer miss) reveal immediately.
 */
function EffectInsightReveal() {
  useEffect(() => {
    var section = document.getElementById('industry-insight')
    if (!section) return

    function reveal() {
      section.classList.add('is-visible')
      if (observer) observer.unobserve(section)
    }

    // Feature-detect
    if (!window.IntersectionObserver) {
      reveal()
      return
    }

    // Already in viewport on mount (SSR, bookmark, anchor)
    var rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      return
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) reveal()
        })
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(section)

    // Safety net: 3 s after load, reveal if observer missed
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (!section.classList.contains('is-visible')) reveal()
      }, 3000)
    })
  }, []) // empty deps — runs once after mount, DOM is guaranteed committed
  return null // renders nothing
}
