import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import IndustryCard from '../components/IndustryCard'
import QuoteModal from '../components/QuoteModal'
import SectionHeader from '../components/SectionHeader'
import { industriesPage } from '../data/content'

// Image map: industry index → image path (matching actual files in public/images/industries/)
const industryImages = [
  '/images/industries/orion-oil-industry-lubricant-manufacturers.svg',
  '/images/industries/orion-oil-industry-hydraulic-oil-blenders.svg',
  '/images/industries/orion-oil-industry-gear-oil-producers.svg',
  '/images/industries/orion-oil-industry-boiler-furnace.svg',
  '/images/industries/orion-oil-industry-road-construction.svg',
  '/images/industries/orion-oil-industry-waterproofing-coatings.svg',
  '/images/industries/orion-oil-industry-heavy-engineering.svg',
  '/images/industries/orion-oil-industry-infrastructure.svg',
  '/images/industries/orion-oil-industry-industrial-manufacturing.svg',
]

export default function Industries() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="INDUSTRIES"
        title="Delivering Performance."
        titleAccent="Powering Industries."
        subtitle={industriesPage.pageHeader.subtitle}
      />

      {/* Industries Grid */}
      <section className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_#1a2230_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesPage.industries.map((industry, i) => (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
                imageSrc={industryImages[i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-ink border-t border-ink-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-5">{industriesPage.cta.title}</h2>
          <p className="text-slate mb-10 max-w-2xl mx-auto">{industriesPage.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-gold text-white font-semibold rounded-full transition-all duration-200 hover:bg-gold-light min-h-[48px]"
            >
              Request for Quote
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-200 hover:border-gold hover:text-gold min-h-[48px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  )
}
