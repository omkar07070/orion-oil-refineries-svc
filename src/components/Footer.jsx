import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ContactInfoModal from './ContactInfoModal'
import { footer, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/content'
import { PATHS, TOPIC_QUOTE, contactHref } from '../routes/paths'

/**
 * The site sets `html { scroll-behavior: smooth }` globally, which would animate a
 * scrollTo(0, 0). Suspend it for the frame so route changes land at the top instantly.
 */
function scrollToTopInstant() {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.style.scrollBehavior = previous
}

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const location = useLocation()
  const scrollModeRef = useRef(null)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  const handleBrandClick = () => {
    scrollModeRef.current = location.pathname === '/' ? 'smooth' : 'instant'
  }

  // location.key changes on every navigation, including a Link to the current route
  useEffect(() => {
    const mode = scrollModeRef.current
    if (!mode) return
    scrollModeRef.current = null

    if (mode === 'smooth' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      scrollToTopInstant()
    }
  }, [location.key])

  return (
    <footer className="bg-ink border-t border-ink-border text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <Link
              to={PATHS.HOME}
              onClick={handleBrandClick}
              aria-label="Orion Oil, go to homepage"
              className="inline-block rounded-[4px] text-[26px] font-bold tracking-wide text-white no-underline cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink"
            >
              ORION{' '}
              <span className="text-gold transition-colors duration-150 hover:text-gold-light">OIL</span>
            </Link>
            <p className="text-slate text-sm leading-relaxed max-w-xs mt-4">
              {footer.brand}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-slate text-sm hover:text-gold transition-colors duration-200 text-left"
                >
                  Contact Sales
                </button>
              </li>
              <li>
                <Link to={contactHref({ topic: TOPIC_QUOTE })} className="text-slate text-sm hover:text-gold transition-colors duration-200">
                  Request for Bulk Quote
                </Link>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate text-sm hover:text-gold transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/orion-oil-and-gas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate text-sm hover:text-gold transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-border pt-8 text-center">
          <p className="text-slate/60 text-sm">
            {footer.copyright} | GST: 27CCYPT9193H1ZC
          </p>
        </div>
      </div>

      <ContactInfoModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  )
}
