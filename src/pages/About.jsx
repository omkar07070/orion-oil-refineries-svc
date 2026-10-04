import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import AnimateOnScroll from '../components/AnimateOnScroll'
import FeatureCard from '../components/FeatureCard'
import QuoteModal from '../components/QuoteModal'
import SectionHeader from '../components/SectionHeader'
import { aboutPage } from '../data/content'
import refineryImg from '../../images/orion_oil1.png.avif'

function AboutBlock({ title, subtitle, content, reverse = false, eyebrow, imageSrc, iconLabel }) {
  return (
    <AnimateOnScroll>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className={reverse ? 'lg:order-2' : ''}>
          {eyebrow && (
            <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 block">
              {eyebrow}
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
          {subtitle && (
            <h4 className="text-base text-gold mb-5 font-medium">{subtitle}</h4>
          )}
          {content.map((paragraph, i) => (
            <p key={i} className="text-slate mb-4 leading-relaxed last:mb-0">{paragraph}</p>
          ))}
        </div>

        <div className={`bg-ink-soft border border-ink-border rounded-xl h-64 lg:h-80 overflow-hidden flex items-center justify-center ${reverse ? 'lg:order-1' : ''}`}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${title} — Orion Oil refinery facility`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            /* Icon fallback when no image is provided */
            <div className="text-center px-6">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              {iconLabel && (
                <p className="text-slate text-sm">{iconLabel}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  )
}

export default function About() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  return (
    <>
      <PageHeader
        eyebrow="ABOUT US"
        title=""
        titleAccent="Orion Oil"
        subtitle={aboutPage.pageHeader.subtitle}
      />

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AboutBlock
            eyebrow="WHO WE ARE"
            title={aboutPage.whoWeAre.title}
            content={aboutPage.whoWeAre.content}
            imageSrc={refineryImg}
          />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutBlock
            eyebrow="OUR MISSION"
            title={aboutPage.mission.title}
            subtitle={aboutPage.mission.subtitle}
            content={aboutPage.mission.content}
            reverse
            iconLabel="Orion Oil Mission"
          />
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AboutBlock
            eyebrow="OUR VISION"
            title={aboutPage.vision.title}
            subtitle={aboutPage.vision.subtitle}
            content={aboutPage.vision.content}
            iconLabel="Orion Oil Vision"
          />
        </div>
      </section>

      {/* Facility */}
      <section className="py-16 md:py-24 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="OUR FACILITY"
            title="State-of-the-Art"
            titleAccent="Refining Infrastructure"
            subtitle={aboutPage.facility.subtitle}
          />

          <AnimateOnScroll className="bg-ink-soft border border-ink-border rounded-xl p-10 md:p-16 text-center">
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Coming Soon — {aboutPage.facility.comingSoon}
            </h3>
            <p className="text-slate max-w-xl mx-auto mb-10">
              Expanding our capabilities with a new advanced facility that will significantly increase processing capacity.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {aboutPage.facility.specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <h4 className="text-3xl font-bold text-gold mb-1">{spec.value}</h4>
                  <p className="text-slate text-sm">{spec.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="WHY ORION OIL"
            title="Why Choose"
            titleAccent="Orion Oil"
            subtitle="Our competitive advantages set us apart"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutPage.whyChooseUs.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 0.08}>
                <FeatureCard title={item.title} description={item.description} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink border-t border-ink-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-5">Ready to Partner with Orion Oil?</h2>
          <p className="text-slate mb-10 max-w-2xl mx-auto">Experience the difference of domestic quality and reliability.</p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-gold text-white font-semibold rounded-full transition-all duration-200 hover:bg-gold-light min-h-[48px]"
          >
            Request for Quote
          </button>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  )
}
