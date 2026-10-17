import { useState } from 'react'

/**
 * SafeImage — prevents layout shift and shows a clean dark placeholder
 * with a gold droplet icon on error. Never shows a broken-image icon
 * or visible alt text.
 *
 * @param {{ src?: string, alt: string, className?: string, loading?: 'lazy' | 'eager', aspectRatio?: string, style?: object }} props
 */
export default function SafeImage({ src, alt, className = '', loading = 'lazy', aspectRatio = '16/9', style }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={className}
      style={className && style ? style : { aspectRatio, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #12171C 0%, #1a2230 100%)' }}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setImgError(true)}
          style={style ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style } : { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #12171C 0%, #1a2230 100%)',
          }}
          aria-hidden="true"
        >
          {/* Muted gold oil-droplet icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'rgba(198,145,47,0.35)' }}
          >
            <path d="M12 3c-1.5 3-3 5-3 7.5a6 6 0 0012 0c0-2.5-1.5-4.5-3-7.5C16.5 4.5 15 6 12 6s-4.5-1.5-3-3z" />
          </svg>
        </div>
      )}
    </div>
  )
}
