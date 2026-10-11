/**
 * Section header with the design-system eyebrow pattern:
 * small gold ALL-CAPS eyebrow label above a larger heading.
 * @param {{ eyebrow?: string, title: string, titleAccent?: string, subtitle?: string, centered?: boolean, className?: string }} props
 */
export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {/* Eyebrow label */}
      {eyebrow && (
        <span className="inline-block text-gold uppercase tracking-widest text-xs font-semibold mb-2">
          {eyebrow}
        </span>
      )}

      {/* Main heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        {title}
        {titleAccent && <span className="text-gold"> {titleAccent}</span>}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
