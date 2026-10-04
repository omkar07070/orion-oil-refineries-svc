import { motion } from 'framer-motion'
import Button from './Button'

/**
 * Product card — rounded-xl, image top, dark ink panel bottom, border treatment.
 * Specs PDF link + Request Quote button.
 * @param {{ product: object, onQuote?: () => void, imageSrc?: string }} props
 */
export default function ProductCard({ product, onQuote, imageSrc }) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: '#C6912F' }}
      transition={{ duration: 0.3 }}
      className="bg-ink-soft border border-ink-border rounded-xl overflow-hidden flex flex-col"
    >
      {/* Product image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-ink flex items-center justify-center border-b border-ink-border">
          <svg className="w-14 h-14 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-gold font-semibold text-base mb-3 leading-snug">{product.name}</h3>
        <p className="text-slate text-sm leading-relaxed mb-6 flex-1">{product.description}</p>

        <div className="flex flex-wrap gap-3">
          {product.specsPdf && product.specsPdf !== '#' ? (
            <a
              href={product.specsPdf}
              download
              className="inline-flex items-center px-4 py-2 border-2 border-gold text-gold text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-gold hover:text-white min-h-[44px]"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Specs
            </a>
          ) : (
            <span className="inline-flex items-center px-4 py-2 border-2 border-ink-border text-slate text-sm font-semibold rounded-lg min-h-[44px]">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Specs Coming Soon
            </span>
          )}
          <Button variant="primary" onClick={onQuote}>
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
