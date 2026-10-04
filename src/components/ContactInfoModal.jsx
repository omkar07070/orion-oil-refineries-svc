import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contact } from '../data/content'

/**
 * Contact info modal — displays address, email, phone, GST.
 * Follows QuoteModal's animation/structure patterns.
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export default function ContactInfoModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-ink-soft border border-ink-border rounded-xl max-w-md w-full pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ink-border">
                <h3 id="contact-modal-title" className="text-xl font-semibold text-gold">
                  Contact Sales
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-border min-w-[44px] min-h-[44px]"
                  aria-label="Close contact info"
                >
                  <svg className="w-6 h-6 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-ink-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Address</p>
                    <p className="text-slate text-sm leading-relaxed">{contact.address}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-ink-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gold text-sm hover:text-gold-light transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-ink-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-gold text-sm hover:text-gold-light transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* GST */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink border border-ink-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">GST Number</p>
                    <p className="text-slate text-sm font-mono">{contact.gst || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
