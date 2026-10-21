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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="TEST STANDARDS"
            title="Key"
            titleAccent="Test Parameters"
            subtitle="International ASTM Standard Compliance"
            className="text-center"
          />

          <AnimateOnScroll>
            <div className="specs-table-wrap">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th scope="col" className="specs-table__head">Property Measured</th>
                    <th scope="col" className="specs-table__head">Standard Method</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityPage.testParameters.map((param) => (
                    <tr key={param.property} className="specs-table__row">
                      <td className="specs-table__prop">{param.property}</td>
                      <td className="specs-table__std">
                        <span className="specs-table__code font-mono">{param.standard}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>

          <style>{`
            /* ── Test Parameters table (scoped to .specs-table-*) ───── */

            .specs-table-wrap {
              width: 100%;
              max-width: 1080px;
              margin-inline: auto;
              background: #0B0F14;
              border: 1px solid #22282F;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 45px -25px rgba(0, 0, 0, 0.8);
            }

            .specs-table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
            }

            .specs-table__head {
              padding: 26px 32px;
              text-align: left;
              font-size: clamp(14px, 0.85vw + 11px, 15px);
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #C6912F;
              background: rgba(255, 255, 255, 0.02);
              border-bottom: 2px solid #C6912F;
            }

            /* table-layout: fixed takes the column widths from the first row */
            .specs-table thead th:nth-child(1) { width: 58%; }
            .specs-table thead th:nth-child(2) { width: 42%; }

            .specs-table__row {
              transition: background-color 150ms ease;
            }

            .specs-table__row:nth-child(even) {
              background-color: rgba(255, 255, 255, 0.025);
            }

            .specs-table__row:hover {
              background-color: rgba(198, 145, 47, 0.06);
            }

            .specs-table__prop,
            .specs-table__std {
              padding: 20px 32px;
              vertical-align: middle;
              border-bottom: 1px solid #22282F;
            }

            .specs-table__row:last-child .specs-table__prop,
            .specs-table__row:last-child .specs-table__std {
              border-bottom: 0;
            }

            .specs-table__prop {
              font-size: clamp(19px, 1.05vw + 15px, 21px);
              font-weight: 500;
              line-height: 1.35;
              color: #FFFFFF;
            }

            .specs-table__code {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              font-size: clamp(18px, 1vw + 14px, 20px);
              font-weight: 600;
              letter-spacing: 0.03em;
              color: #C6912F;
            }

            .specs-table__code::before {
              content: '';
              width: 7px;
              height: 7px;
              flex-shrink: 0;
              border-radius: 50%;
              background: #C6912F;
              opacity: 0.85;
            }

            .specs-table__row:hover .specs-table__code {
              color: #D9A83D;
            }

            .specs-table__row:hover .specs-table__prop {
              box-shadow: inset 3px 0 0 0 #C6912F;
            }

            /* ≤768px — keep two columns, scale type and padding down */
            @media (max-width: 768px) {
              .specs-table__head {
                padding: 18px 16px;
                font-size: 14px;
                letter-spacing: 0.1em;
              }

              .specs-table__prop,
              .specs-table__std {
                padding: 14px 16px;
              }

              .specs-table__prop {
                font-size: 16px;
              }

              .specs-table__code {
                gap: 8px;
                font-size: 15px;
              }

              .specs-table__code::before {
                width: 6px;
                height: 6px;
              }
            }

            /* ≤480px — stack property above the standard, no horizontal scroll */
            @media (max-width: 480px) {
              .specs-table-wrap {
                border-radius: 12px;
              }

              .specs-table,
              .specs-table tbody,
              .specs-table tr,
              .specs-table td {
                display: block;
                width: 100%;
              }

              /* Keep the column headers for assistive tech, out of the visual flow */
              .specs-table thead {
                position: absolute;
                width: 1px;
                height: 1px;
                margin: -1px;
                padding: 0;
                overflow: hidden;
                clip-path: inset(50%);
                white-space: nowrap;
              }

              .specs-table__prop {
                padding: 14px 16px 4px;
                border-bottom: 0;
              }

              .specs-table__std {
                padding: 0 16px 14px;
              }
            }
          `}</style>
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
