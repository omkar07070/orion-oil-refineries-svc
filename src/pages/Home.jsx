import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimateOnScroll from '../components/AnimateOnScroll'
import AnimatedCounter from '../components/AnimatedCounter'
import FeatureCard from '../components/FeatureCard'
import ProductCard from '../components/ProductCard'
import QuoteModal from '../components/QuoteModal'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { homePage, productsPage } from '../data/content'
import homeHeroImg from '../../images/home_page.jpg'

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [preselectedProduct, setPreselectedProduct] = useState('')

  const openQuoteModal = (product = '') => {
    setPreselectedProduct(product)
    setIsQuoteModalOpen(true)
  }

  const allProducts = [
    { ...productsPage.baseOils.products[0], specsPdf: '/docs/base-oil-sn150-specs.pdf', image: '/images/products/base-oil-sn150.jpg' },
    { ...productsPage.baseOils.products[1], specsPdf: '/docs/base-oil-sn300-specs.pdf', image: '/images/products/base-oil-sn300.jpg' },
    { ...productsPage.industrialFuels.product, specsPdf: '/docs/ldo-specs.pdf', image: '/images/products/industrial-ldo.jpg' },
    { ...productsPage.asphalt.product, specsPdf: '/docs/bitumen-specs.pdf', image: '/images/products/asphalt-bitumen.jpg' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        {/* Full-bleed hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeHeroImg})` }}
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
            <p className="text-slate text-lg md:text-xl mb-10 max-w-2xl">
              {homePage.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={() => openQuoteModal()}>
                Request for Quote
              </Button>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-2.5 border-2 border-white/30 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:border-gold hover:text-gold min-h-[44px]"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_#1a2230_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {homePage.whoWeAre.title}{' '}
                  <span className="text-gold">{homePage.whoWeAre.titleAccent}</span>
                </h2>
                <p className="text-slate mb-4 leading-relaxed">{homePage.whoWeAre.description}</p>
                <p className="text-slate mb-8 leading-relaxed">{homePage.whoWeAre.description2}</p>
                <Button variant="secondary" href="/about">
                  Learn More About Us
                </Button>
              </div>

              {/* Facility image placeholder */}
              <div className="bg-ink-soft border border-ink-border rounded-xl h-80 lg:h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <p className="text-slate text-sm">Orion Oil Refinery — Facility</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-16 md:py-24 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="OUR PRODUCTS"
            title=""
            titleAccent="Premium Base Oils & Industrial Fuels"
            subtitle={homePage.productsOverview.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product, i) => (
              <AnimateOnScroll key={product.id} delay={i * 0.1}>
                <ProductCard
                  product={product}
                  imageSrc={product.image}
                  onQuote={() => openQuoteModal(product.id)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 md:py-24 bg-ink">
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

      {/* Stats */}
      <section className="py-16 md:py-24 bg-ink-soft border-y border-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {homePage.stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gold to-gold-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{homePage.cta.title}</h2>
          <p className="text-white/80 mb-10 text-lg max-w-2xl mx-auto">{homePage.cta.description}</p>
          <Button variant="primary" onClick={() => openQuoteModal()}>
            Request for Quote
          </Button>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedProduct={preselectedProduct}
      />
    </>
  )
}
