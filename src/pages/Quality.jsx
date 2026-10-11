import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import AnimateOnScroll from '../components/AnimateOnScroll'
import AnimatedCounter from '../components/AnimatedCounter'
import SectionHeader from '../components/SectionHeader'
import { qualityPage } from '../data/content'

function QualityBox({ title, eyebrow, children }) {
  return (
    <div className="bg-ink-soft border border-ink-border rounded-xl p-6 md:p-8">
      {eyebrow && (
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 block">
          {eyebrow}
        </span>
      )}
      <h3 className="text-lg font-semibold text-white mb-4 pb-3 border-b border-ink-border">
        {title}
      </h3>
      {children}
    </div>
  )
}

function EquipmentCard({ name, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="bg-ink border border-ink-border p-5 rounded-xl text-center"
    >
      <h4 className="text-gold font-semibold mb-2 text-sm">{name}</h4>
      <p className="text-slate text-xs">{description}</p>
    </motion.div>
  )
}

export default function Quality() {
  return (
    <>
      <PageHeader
        eyebrow="QUALITY & SUSTAINABILITY"
        title=""
        titleAccent="Uncompromising Standards"
        subtitle={qualityPage.pageHeader.subtitle}
      />

      {/* Quality Assurance */}
      <section className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="QUALITY ASSURANCE"
            title="Rigorous"
            titleAccent="Testing Standards"
            subtitle={qualityPage.qualityAssurance.subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AnimateOnScroll>
              <QualityBox eyebrow="QUALITY COMMITMENT" title="Our Quality Commitment">
                <p className="text-slate mb-4 leading-relaxed">{qualityPage.qualityAssurance.description}</p>
                <ul className="space-y-3">
                  {qualityPage.qualityAssurance.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate">
                      <div className="w-5 h-5 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span>
                        <strong className="text-white">{point.bold}</strong>
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </QualityBox>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <QualityBox eyebrow="LABORATORY EQUIPMENT" title="Advanced Analysis">
                <p className="text-slate mb-4 leading-relaxed">
                  Partnering with NABL accredited external laboratories to independently verify molecular makeup.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {qualityPage.qualityAssurance.equipment.map((eq, i) => (
                    <EquipmentCard key={eq.name} name={eq.name} description={eq.description} index={i} />
                  ))}
                </div>
              </QualityBox>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Test Parameters Table */}
      <section className="py-12 md:py-20 bg-ink-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="TEST STANDARDS"
            title="Key"
            titleAccent="Test Parameters"
            subtitle="International ASTM Standard Compliance"
          />

          <AnimateOnScroll>
            {/* Desktop: table layout */}
            <div className="hidden md:block bg-ink border border-ink-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-border">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gold uppercase tracking-wider">Property Measured</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gold uppercase tracking-wider">Standard Method</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityPage.testParameters.map((param, i) => (
                    <tr
                      key={param.property}
                      className={`border-b border-ink-border last:border-0 ${i % 2 === 1 ? 'bg-ink/40' : ''}`}
                    >
                      <td className="px-6 py-4 text-sm text-white">{param.property}</td>
                      <td className="px-6 py-4 text-sm text-gold font-mono">{param.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked card layout */}
            <div className="md:hidden grid grid-cols-1 gap-3">
              {qualityPage.testParameters.map((param, i) => (
                <div
                  key={param.property}
                  className={`bg-ink border border-ink-border rounded-xl p-4 ${i % 2 === 1 ? 'bg-ink/60' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{param.property}</span>
                    <span className="text-sm text-gold font-mono">{param.standard}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="SUSTAINABILITY"
            title="Our"
            titleAccent="Green Commitment"
            subtitle={qualityPage.sustainability.subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <AnimateOnScroll className="lg:col-span-3">
              <div className="bg-ink-soft border border-ink-border rounded-xl p-6 md:p-8 h-full">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 block">
                  Our Green Promise
                </span>
                <p className="text-slate mb-4 leading-relaxed">{qualityPage.sustainability.description}</p>
                <ul className="space-y-3">
                  {qualityPage.sustainability.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate">
                      <div className="w-5 h-5 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span>
                        <strong className="text-white">{point.bold}</strong>
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {qualityPage.sustainability.stats.map((stat, i) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gold to-gold-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Environmental Impact by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {qualityPage.environmentalImpact.map((item) => (
              <AnimatedCounter key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
