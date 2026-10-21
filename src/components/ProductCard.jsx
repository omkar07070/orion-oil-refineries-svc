import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeImage from './SafeImage'
import { quoteHref } from '../routes/paths'

/**
 * Product card — rounded-xl, image top, dark ink panel bottom, border treatment.
 * All 4 cards in the homepage grid are equal height; description scrolls when overflowing.
 * Specs PDF link + Request Quote button pinned to the bottom.
 * @param {{ product: object, imageSrc?: string, imageAlt?: string }} props
 */
export default function ProductCard({ product, imageSrc, imageAlt }) {
  const descRef = useRef(null)
  const [isOverflowed, setIsOverflowed] = useState(false)
  const [specsError, setSpecsError] = useState(false)

  useEffect(() => {
    const el = descRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setIsOverflowed(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
    })
    observer.observe(el)
    setIsOverflowed(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: '#C6912F' }}
      transition={{ duration: 0.3 }}
      className="product-card bg-ink-soft border border-ink-border rounded-xl flex flex-col"
    >
      <style>{`
        .product-card .pc-img-wrap {
          /* 16/9 aspect ratio ≈ 170px on mobile, ~180px on desktop */
          aspect-ratio: 16 / 9;
          max-height: 180px;
          background: linear-gradient(135deg, #12171C 0%, #1a2230 100%);
          border-bottom: 1px solid #22282F;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .product-card .pc-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(198,145,47,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .product-card .pc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Scrollable description area */
        .product-card .pc-desc-wrap {
          flex: 1;
          min-height: 0;
          /* Allow SN-150/SN-300 to show fully; LDO and Asphalt scroll */
          max-height: 120px;
          overflow-y: auto;
          scrollbar-gutter: stable;
          position: relative;
        }
        /* Slim scrollbar — gold thumb, transparent track */
        .product-card .pc-desc-wrap::-webkit-scrollbar {
          width: 4px;
        }
        .product-card .pc-desc-wrap::-webkit-scrollbar-track {
          background: transparent;
        }
        .product-card .pc-desc-wrap::-webkit-scrollbar-thumb {
          background: rgba(198,145,47,0.5);
          border-radius: 2px;
        }
        .product-card .pc-desc-wrap {
          scrollbar-width: thin;
          scrollbar-color: rgba(198,145,47,0.5) transparent;
        }
        /* Bottom gradient fade — appears only when text overflows */
        .product-card .pc-desc-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 8px; /* matches scrollbar gutter */
          height: 24px;
          background: linear-gradient(to top, rgba(18,23,28,1) 0%, rgba(18,23,28,0) 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .product-card .pc-desc-wrap.is-overflowed .pc-desc-fade {
          opacity: 1;
        }
        /* Buttons — always at card bottom, never clipped */
        .product-card .pc-btn-group {
          margin-top: auto;
          padding-top: 16px;
          /* Gold divider line above buttons */
          border-top: 1px solid rgba(198,145,47,0.2);
          display: flex;
          flex-direction: column;
          gap: 10px;
          /* Prevent any child from overflowing the button group */
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }
        /* Side-by-side only when card inner width ≥ 340px */
        @container (min-width: 340px) {
          .product-card .pc-btn-group {
            flex-direction: row;
            gap: 12px;
          }
          .product-card .pc-btn-primary,
          .product-card .pc-btn-secondary {
            flex: 1;
            width: auto;
          }
        }
        /* Primary button — matches site's solid gold pill style */
        .product-card .pc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 10px 18px;
          background: #C6912F;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          border: none;
          box-sizing: border-box;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .product-card .pc-btn-primary:hover {
          background: #D9A83D;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(198,145,47,0.35);
        }
        .product-card .pc-btn-primary:focus-visible {
          outline: 2px solid #C6912F;
          outline-offset: 3px;
        }
        .product-card .pc-btn-primary:active {
          background: #A8791F;
          transform: translateY(0);
          box-shadow: none;
        }
        /* Secondary button — outlined gold, subtle tint on hover */
        .product-card .pc-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 9px 18px;
          background: rgba(198,145,47,0.06);
          color: #C6912F;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          border: 1.5px solid #C6912F;
          box-sizing: border-box;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .product-card .pc-btn-secondary:hover {
          background: #C6912F;
          color: #0B0F14;
        }
        .product-card .pc-btn-secondary:focus-visible {
          outline: 2px solid #C6912F;
          outline-offset: 3px;
        }
        .product-card .pc-btn-secondary:active {
          background: #A8791F;
          border-color: #A8791F;
          color: #fff;
        }
        /* Tag pill — inline-flex, fits content, not full width */
        .product-card .pc-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 4px 12px;
          border: 1px solid rgba(198,145,47,0.5);
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #D9A83D;
          background: rgba(198,145,47,0.06);
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        /* Title — fixed 2-line min-height so descriptions align across cards */
        .product-card .pc-title {
          font-size: 13px;
          font-weight: 600;
          color: #C6912F;
          line-height: 1.35;
          min-height: 2.7em; /* exactly 2 lines at ~18px line-height */
          margin-bottom: 10px;
          flex-shrink: 0;
        }
        /* Description paragraph — right gutter for scrollbar */
        .product-card .pc-desc-text {
          color: #9CA3AF;
          font-size: 12px;
          line-height: 1.6;
          padding-right: 8px;
        }
        /* Specs error message — small inline text with quote link */
        .product-card .pc-specs-error {
          font-size: 11px;
          color: #9CA3AF;
          line-height: 1.5;
          margin: 0;
          padding: 6px 0 0;
        }
        .product-card .pc-specs-error-link {
          color: #C6912F;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        /* Below 768px: show all text, no scroll, no fade */
        @media (max-width: 767px) {
          .product-card .pc-desc-wrap {
            max-height: none !important;
            overflow-y: visible !important;
          }
          .product-card .pc-desc-fade {
            display: none !important;
          }
        }
      `}</style>

      {/* Image area — SafeImage shows a dark placeholder with gold droplet icon on error */}
      <SafeImage
        src={imageSrc}
        alt={imageAlt || product.name}
        className="pc-img-wrap"
        loading="lazy"
      />

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-1 min-h-0">
        {/* Badge */}
        <span className="pc-badge">
          {product.name.replace(/\s*\([^)]*\)/g, '').replace(/\/\s*/g, ' ').trim().split(' ').slice(-2).join(' ')}
        </span>

        {/* Title — fixed 2-line min-height for alignment across all 4 cards */}
        <h3 className="pc-title">
          {product.name}
        </h3>

        {/* Description — scrolls when overflowing; fade gradient at bottom */}
        <div
          ref={descRef}
          className={'pc-desc-wrap' + (isOverflowed ? ' is-overflowed' : '')}
          tabIndex={0}
        >
          <p className="pc-desc-text">
            {product.description}
          </p>
          <div className="pc-desc-fade" aria-hidden="true" />
        </div>

        {/* Buttons — pinned to card bottom with divider above */}
        <div className="pc-btn-group">
          {product.specsPdf && product.specsPdf !== '#' ? (
            <>
              <button
                type="button"
                className="pc-btn-secondary"
                onClick={async () => {
                  try {
                    const res = await fetch(product.specsPdf)
                    if (!res.ok || !res.headers.get('content-type')?.includes('application/pdf')) {
                      setSpecsError(true)
                      return
                    }
                    const blob = await res.blob()
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = product.specsPdf.split('/').pop()
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  } catch {
                    setSpecsError(true)
                  }
                }}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Specs
              </button>
              {specsError && (
                <p className="pc-specs-error">
                  Spec sheet is being updated.{' '}
                  <Link to={quoteHref(product.id)} className="pc-specs-error-link">
                    Request a quote
                  </Link>
                  {' '}and we'll send it.
                </p>
              )}
            </>
          ) : (
            <span className="pc-btn-secondary" style={{ borderColor: '#22282F', color: '#9CA3AF', cursor: 'not-allowed', opacity: 0.6 }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Specs Coming Soon
            </span>
          )}
          <Link
            to={quoteHref(product.id)}
            className="pc-btn-primary"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
