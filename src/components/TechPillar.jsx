import { motion } from 'framer-motion'

/**
 * Technology pillar block — border-left gold accent, dark panel.
 * @param {{ pillar: object, index: number }} props
 */
export default function TechPillar({ pillar, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-ink-soft border border-ink-border border-l-4 border-l-gold rounded-xl p-6 md:p-8"
    >
      <h4 className="font-semibold text-white mb-3 text-base md:text-lg">{pillar.title}</h4>
      <p className="text-slate text-sm leading-relaxed mb-5">{pillar.description}</p>

      {pillar.points && (
        <ul className="space-y-3">
          {pillar.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate">
              {/* Gold checkmark circle (thin-line) */}
              <div className="w-5 h-5 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span>
                <strong className="text-white">{point.bold}</strong>
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
