/**
 * Page hero header — ink gradient background, white headline, gold accent.
 * @param {{ eyebrow?: string, title: string, titleAccent?: string, subtitle?: string }} props
 */
export default function PageHeader({ eyebrow, title, titleAccent, subtitle }) {
  return (
    <section className="bg-gradient-to-br from-ink to-ink-soft text-white pt-28 pb-12 md:pt-36 md:pb-16 text-center border-b border-ink-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-block text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {title}
          {titleAccent && <span className="text-gold"> {titleAccent}</span>}
        </h1>
        {subtitle && (
          <p className="text-slate text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
