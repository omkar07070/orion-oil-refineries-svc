import { motion } from 'framer-motion'

/**
 * Numbered refining process step — gold number circle + description.
 * @param {{ step: object, index: number }} props
 */
export default function ProcessStep({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-6 md:gap-10"
    >
      {/* Gold numbered circle */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <h4 className="text-lg font-semibold text-white mb-3">{step.title}</h4>
        <p className="text-slate text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  )
}
