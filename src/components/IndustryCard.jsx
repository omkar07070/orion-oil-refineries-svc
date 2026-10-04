import { motion } from 'framer-motion'

/**
 * Industry card — rounded-xl, dark ink panel, border (no shadow), thin-line gold icon.
 * Image slot on top, dark panel below with white heading + muted description.
 * @param {{ industry: object, index: number, imageSrc?: string }} props
 */
export default function IndustryCard({ industry, index, imageSrc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-ink-soft border border-ink-border rounded-xl overflow-hidden"
    >
      {/* Image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={industry.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-ink flex items-center justify-center border-b border-ink-border">
          <svg
            className="w-10 h-10 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      )}

      {/* Content panel */}
      <div className="p-6 md:p-8">
        {/* Thin-line gold icon + title row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-white font-semibold text-base leading-tight">{industry.title}</h4>
        </div>

        <p className="text-slate text-sm leading-relaxed">{industry.description}</p>
      </div>
    </motion.div>
  )
}
