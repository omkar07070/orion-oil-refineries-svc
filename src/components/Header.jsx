import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/content'

/**
 * Gold flame/drop icon mark — SVG inline
 */
function LogoMark() {
  return (
    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold"
      >
        {/* Flame outline icon */}
        <path
          d="M12 2C10.5 5 7 7 7 11C7 14 9.5 16 12 16C14.5 16 17 14 17 11C17 7 13.5 5 12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 22C9.5 22 7.5 20 7.5 17.5C7.5 15.5 9 14 10.5 13.5C10 14.5 10 16 11 17C11.5 17.5 12 18.5 12 19.5C12.5 20 12 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMobileMenuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isMobileMenuOpen])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ink/95 backdrop-blur-md shadow-lg'
            : 'bg-ink'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 border-b border-ink-border">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <LogoMark />
              <span className="text-lg md:text-xl font-bold text-white tracking-wide">
                ORION <span className="text-gold">OIL</span>
              </span>
            </Link>

            {/* Desktop Nav — white links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors duration-200 py-2 ${
                      isActive
                        ? 'text-gold'
                        : 'text-white/70 hover:text-gold'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA — gold pill button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-2.5 bg-gold text-white text-sm font-semibold rounded-full transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:-translate-y-0.5"
              >
                Request for Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-md min-w-[44px] min-h-[44px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span
                  className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-all duration-200 ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } }}
              exit={{ x: '100%', transition: { duration: 0.2 } }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-ink z-50 lg:hidden shadow-2xl flex flex-col border-l border-ink-border"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-4 border-b border-ink-border">
                <span className="text-lg font-bold text-white tracking-wide">
                  ORION <span className="text-gold">OIL</span>
                </span>
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-soft min-w-[44px] min-h-[44px]"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.25 } }}
                  >
                    <NavLink
                      to={link.href}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-xl text-base font-medium transition-colors duration-200 min-h-[48px] flex items-center ${
                          isActive
                            ? 'bg-ink-soft text-gold'
                            : 'text-white/70 hover:bg-ink-soft hover:text-gold'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="p-6 border-t border-ink-border space-y-3">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full py-3 bg-gold text-white font-semibold rounded-full transition-colors duration-200 hover:bg-gold-light min-h-[48px]"
                >
                  Request for Quote
                </Link>
                <a
                  href="https://wa.me/918275635579?text=Hello%21%20I%20am%20interested%20in%20Orion%20Oil%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full py-3 bg-[#25D366] text-white font-semibold rounded-full transition-colors duration-200 hover:bg-[#128C7E] min-h-[48px]"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
