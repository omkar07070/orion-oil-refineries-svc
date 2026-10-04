import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Animated counter — counts up on scroll into view.
 * Dark ink panel, gold number, muted label.
 * @param {{ value: string, label: string, className?: string }} props
 */
export default function AnimatedCounter({ value, label, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const match = value.match(/^([\d,.]+)(.*)$/)
  const numericValue = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''
  const isTextValue = !match || ['Zero', 'Net', 'Net-Zero'].some((t) => value.includes(t))

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime
    const duration = 1500
    const animate = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * numericValue))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, numericValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`bg-ink-soft border border-ink-border rounded-xl p-6 md:p-8 text-center ${className}`}
    >
      <h4 className="text-3xl md:text-4xl font-bold text-gold mb-2">
        {isTextValue ? value : `${displayValue.toLocaleString()}${suffix}`}
      </h4>
      <p className="text-slate text-sm md:text-base">{label}</p>
    </motion.div>
  )
}
