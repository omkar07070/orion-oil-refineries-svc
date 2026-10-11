import { motion } from 'framer-motion'

/**
 * Feature/stat card — dark ink panel, gold icon circle, white heading, muted caption.
 * Uses border treatment instead of shadow per design spec.
 * @param {{ title: string, description: string, delay?: number, icon?: React.ReactNode }} props
 */
export default function FeatureCard({ title, description, delay = 0, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, delay }}
      className="bg-ink-soft border border-ink-border rounded-xl p-5 md:p-6 text-center"
    >
      {/* Gold outline icon circle */}
      {icon && (
        <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-5">
          {icon}
        </div>
      )}

      <h4 className="text-white font-semibold text-base md:text-lg mb-2">{title}</h4>
      <p className="text-slate text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
