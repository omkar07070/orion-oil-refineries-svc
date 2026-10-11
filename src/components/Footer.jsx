import { useState } from 'react'
import { Link } from 'react-router-dom'
import ContactInfoModal from './ContactInfoModal'
import { footer, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/content'

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  return (
    <footer className="bg-ink border-t border-ink-border text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-ink-soft border border-ink-border flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold">
                  <path d="M12 2C10.5 5 7 7 7 11C7 14 9.5 16 12 16C14.5 16 17 14 17 11C17 7 13.5 5 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                ORION <span className="text-gold">OIL</span>
              </span>
            </Link>
            <p className="text-slate text-sm leading-relaxed max-w-xs">
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
                <Link to="/contact" className="text-slate text-sm hover:text-gold transition-colors duration-200">
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
