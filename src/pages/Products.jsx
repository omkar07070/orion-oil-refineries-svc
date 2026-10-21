import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import AnimateOnScroll from '../components/AnimateOnScroll'
import SectionHeader from '../components/SectionHeader'
import SafeImage from '../components/SafeImage'
import { productsPage } from '../data/content'
import { PRODUCT_ANCHORS, TOPIC_QUOTE, contactHref } from '../routes/paths'

// Product images — static paths matching the SVG diagrams in public/images/products/
const PRODUCT_IMAGES = {
  sn150: {
    src: '/images/products/orion-oil-products-sn150-base-oil.svg',
    alt: 'Clear golden SN-150 equivalent base oil with short molecular chains and low viscosity',
  },
  sn300: {
    src: '/images/products/orion-oil-products-sn300-base-oil.svg',
    alt: 'Deep amber SN-300 equivalent base oil with long branched chains and high viscosity',
  },
  ldo: {
    src: '/images/products/orion-oil-products-industrial-ldo.svg',
    alt: 'Bulk storage tank supplying industrial LDO fuel to a boiler',
  },
  bitumen: {
    src: '/images/products/orion-oil-products-asphalt-bitumen.svg',
    alt: 'Hot bitumen binder being poured into a road surface layer',
  },
}

function ProductBlock({ product, reverse = false, index, imageSrc, imageAlt }) {
  const anchorId = PRODUCT_ANCHORS[product.id]

  return (
    <AnimateOnScroll>
      <motion.div
        id={anchorId}
        whileHover={{ y: -4, borderColor: '#C6912F' }}
        transition={{ duration: 0.3 }}
        className="bg-ink-soft border border-ink-border rounded-xl overflow-hidden scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className={`bg-ink flex items-center justify-center h-56 lg:h-auto border-b lg:border-b-0 ${reverse ? 'lg:order-2' : ''} ${reverse ? 'lg:border-l' : ''} border-ink-border`}>
            <SafeImage
              src={imageSrc}
              alt={imageAlt || product.name}
              className="w-full"
              style={{ height: '224px' }}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className={`p-6 lg:p-8 ${reverse ? 'lg:order-1' : ''}`}>
            <h3 className="text-gold font-semibold text-base mb-2 leading-snug">{product.name}</h3>
            <p className="text-slate text-sm leading-relaxed mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-3">
              {product.specsPdf && product.specsPdf !== '#' ? (
                <a
                  href={product.specsPdf}
                  download
                  className="inline-flex items-center px-4 py-2.5 border-2 border-gold text-gold text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-gold hover:text-white min-h-[44px]"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Specs
                </a>
              ) : (
                <span className="inline-flex items-center px-4 py-2.5 border-2 border-ink-border text-slate text-sm font-semibold rounded-lg min-h-[44px]">
                  Specs Coming Soon
                </span>
              )}
              <Link
                to={contactHref({ topic: TOPIC_QUOTE, product: product.id })}
                className="inline-flex items-center px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-full transition-all duration-200 hover:bg-gold-light min-h-[44px]"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimateOnScroll>
  )
}

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="OUR PRODUCTS"
        title=""
        titleAccent="Premium Products"
        subtitle={productsPage.pageHeader.subtitle}
      />

      {/* Base Oils */}
      <section id="base-oils" className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_#1a2230_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="BASE OILS"
            title="Premium"
            titleAccent="Group I Base Oils"
            subtitle={productsPage.baseOils.subtitle}
          />
          <div className="space-y-6">
            {productsPage.baseOils.products.map((product, i) => (
              <ProductBlock
                key={product.id}
                product={{ ...product, specsPdf: i === 0 ? '/specs/orion-oil-sn150-specs.pdf' : '/specs/orion-oil-sn300-specs.pdf' }}
                index={i}
                imageSrc={i === 0 ? PRODUCT_IMAGES.sn150.src : PRODUCT_IMAGES.sn300.src}
                imageAlt={i === 0 ? PRODUCT_IMAGES.sn150.alt : PRODUCT_IMAGES.sn300.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Fuels */}
      <section id="industrial-fuels" className="py-12 md:py-20 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="INDUSTRIAL FUELS"
            title="High-Efficiency"
            titleAccent="Industrial Fuels"
            subtitle={productsPage.industrialFuels.subtitle}
          />
          <ProductBlock
            product={{ ...productsPage.industrialFuels.product, specsPdf: '/specs/orion-oil-industrial-ldo-specs.pdf' }}
            index={0}
            imageSrc={PRODUCT_IMAGES.ldo.src}
            imageAlt={PRODUCT_IMAGES.ldo.alt}
          />
        </div>
      </section>

      {/* Asphalt / Bitumen */}
      <section id="asphalt-bitumen-section" className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="ASPHALT & BITUMEN"
            title="Industrial-Grade"
            titleAccent="Bitumen Binder"
            subtitle={productsPage.asphalt.subtitle}
          />
          <ProductBlock
            product={{ ...productsPage.asphalt.product, specsPdf: '/specs/orion-oil-asphalt-bitumen-specs.pdf' }}
            reverse
            index={0}
            imageSrc={PRODUCT_IMAGES.bitumen.src}
            imageAlt={PRODUCT_IMAGES.bitumen.alt}
          />
        </div>
      </section>

      {/* Dispatch Options */}
      <section className="py-12 md:py-20 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="DISPATCH"
            title="Flexible"
            titleAccent="Packaging Options"
            subtitle="Available packaging and delivery methods"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {productsPage.dispatchOptions.map((option, i) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-ink-soft border border-ink-border rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{option.title}</h4>
                <p className="text-slate text-xs">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
