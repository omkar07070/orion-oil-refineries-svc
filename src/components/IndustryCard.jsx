import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SafeImage from './SafeImage'

/**
 * Industry card — rounded-xl, dark ink panel, border (no shadow), thin-line gold icon.
 * Image slot on top, dark panel below with white heading + muted description.
 * @param {{ industry: object, index: number, imageSrc?: string, imageAlt?: string }} props
 */
export default function IndustryCard({ industry, index, imageSrc, imageAlt }) {
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Failure-proof reveal: fires on scroll OR after 1.5s timeout
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)

    // Safety timeout: if observer never fires (e.g. element already visible),
    // show content after 1.5s regardless
    const timeout = setTimeout(() => {
      setRevealed(true)
    }, 1500)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="bg-ink-soft border border-ink-border rounded-xl overflow-hidden"
    >
      {/* Respect reduced motion: skip animation */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .industry-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Image — SafeImage shows placeholder on error; aspect-ratio prevents layout shift */}
      <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #12171C 0%, #1a2230 100%)', borderBottom: '1px solid #22282F' }}>
        <SafeImage
          src={imageSrc}
          alt={imageAlt || industry.title}
          className="w-full"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content panel */}
      <div className="p-5 md:p-6">
        {/* Thin-line gold icon + title row */}
        <div className="flex items-start gap-3 mb-2">
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
