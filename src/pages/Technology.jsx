import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import AnimateOnScroll from '../components/AnimateOnScroll'
import AnimatedCounter from '../components/AnimatedCounter'
import SectionHeader from '../components/SectionHeader'
import { technologyPage } from '../data/content'
import preTreatementAvif from '../../images/preTreatement.avif'
import preTreateJpeg from '../../images/preTreate.jpeg'

/**
 * Single process step in the vertical timeline.
 * @param {{ step: object, index: number, showImage?: boolean }} props
 */
function TimelineStep({ step, index, showImage = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex gap-5 md:gap-10"
    >
      {/* Gold vertical connector line — except for the last step */}
      {index < technologyPage.refiningProcess.steps.length - 1 && (
        <div className="absolute left-[28px] md:left-[38px] top-16 bottom-0 w-0.5 bg-gradient-to-b from-gold to-gold/20 pointer-events-none" aria-hidden="true" />
      )}

      {/* Numbered circle */}
      <div className="flex-shrink-0 relative z-10">
        <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-gold rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg shadow-gold/20">
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-10 md:pb-14">
        <h4 className="text-lg md:text-xl font-semibold text-white mb-3">{step.title}</h4>
        <p className="text-slate text-sm md:text-base leading-relaxed mb-5">{step.description}</p>
        {showImage && (
          <div className="rounded-xl overflow-hidden max-w-xl aspect-[16/9]">
            <picture>
              <source srcSet={preTreatementAvif} type="image/avif" />
              <img
                src={preTreateJpeg}
                alt={`Step ${step.number}: ${step.title} at Orion Oil refinery`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Technology() {
  const { vacuumDistillation, refiningProcess, yieldSummary } = technologyPage

  return (
    <>
      {/* SECTION 1 — Page Header */}
      <PageHeader
        eyebrow="OUR TECHNOLOGY"
        title="Advanced"
        titleAccent="Vacuum Distillation"
        subtitle={technologyPage.pageHeader.subtitle}
      />

      {/* SECTION 2 — Advanced Vacuum Distillation */}
      <section className="py-16 md:py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Intro paragraphs */}
          <AnimateOnScroll>
            <div className="bg-ink-soft border border-ink-border rounded-xl p-8 md:p-12 mb-12">
              {vacuumDistillation.intro.map((para, i) => (
                <p key={i} className="text-slate mb-4 leading-relaxed last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </AnimateOnScroll>

          {/* 3 Pillars as feature blocks — single column on mobile, alternating layout on desktop */}
          <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-6 block">
            Core Technical Pillars
          </span>
          <div className="space-y-6 md:space-y-8">
            {vacuumDistillation.pillars.map((pillar, i) => (
              <AnimateOnScroll key={pillar.title} delay={i * 0.1}>
                <div
                  className={`
                    bg-ink-soft border border-ink-border border-l-4 border-l-gold rounded-xl p-6 md:p-8
                    ${i % 2 === 1 ? 'md:ml-auto md:mr-0 md:max-w-2xl' : 'md:mr-auto md:max-w-2xl'}
                  `}
                >
                  <h3 className="font-semibold text-white mb-3 text-base md:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed mb-5">{pillar.description}</p>
                  {pillar.points && (
                    <ul className="space-y-3">
                      {pillar.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate">
                          <div className="w-5 h-5 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
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
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Result callout block — gold left-border to signal section conclusion */}
          <AnimateOnScroll className="mt-10">
            <div className="bg-ink border border-ink-border border-l-4 border-l-gold rounded-xl p-8 md:p-12">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">
                The Result
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Uncompromised Molecular Integrity
              </h3>
              <p className="text-slate leading-relaxed">{vacuumDistillation.result}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 3 — Our Refining Process */}
      <section id="refining-process" className="py-16 md:py-24 bg-ink-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vertical timeline with connecting line */}
          <AnimateOnScroll>
            <div className="space-y-0">
              {refiningProcess.steps.map((step, i) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                  index={i}
                  showImage={i === 0}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 4 — Process Yield Summary */}
      <section className="py-16 md:py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="YIELD SUMMARY"
            title={yieldSummary.title}
            titleAccent={yieldSummary.titleAccent}
            subtitle={yieldSummary.subtitle}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {yieldSummary.yields.map((yieldItem) => (
              <AnimatedCounter
                key={yieldItem.label}
                value={yieldItem.value}
                label={yieldItem.label}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
