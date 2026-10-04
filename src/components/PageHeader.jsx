/**
 * Page hero header — ink gradient background, white headline, gold accent.
 * @param {{ eyebrow?: string, title: string, titleAccent?: string, subtitle?: string }} props
 */
export default function PageHeader({ eyebrow, title, titleAccent, subtitle }) {
  return (
    <section className="bg-gradient-to-br from-ink to-ink-soft text-white pt-32 pb-16 md:pt-40 md:pb-20 text-center border-b border-ink-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-block text-gold uppercase tracking-widest text-xs font-semibold mb-5">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
