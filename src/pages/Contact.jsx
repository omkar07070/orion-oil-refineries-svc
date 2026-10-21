import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import AnimateOnScroll from '../components/AnimateOnScroll'
import QuoteModal from '../components/QuoteModal'
import SectionHeader from '../components/SectionHeader'
import { contactPage, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/content'
import { PRODUCT_REQUIREMENTS, QUERY } from '../routes/paths'

export default function Contact() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const productParam = searchParams.get(QUERY.PRODUCT)
  const preselectedRequirement = PRODUCT_REQUIREMENTS[productParam] || ''
  const [requirement, setRequirement] = useState(preselectedRequirement)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  // Re-select the product when the URL changes (e.g. another quote link)
  useEffect(() => {
    setRequirement(preselectedRequirement)
  }, [preselectedRequirement])

  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="Get in"
        titleAccent="Touch"
        subtitle={contactPage.pageHeader.subtitle}
      />

      {/* Get In Touch + Form */}
      <section className="py-12 md:py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,_#1a2230_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info — dark panel */}
            <AnimateOnScroll>
              <div className="bg-ink border border-ink-border rounded-xl p-6 md:p-8">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">
                  Contact Information
                </span>
                <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gold font-medium mb-1 text-sm">Address</h4>
                      <p className="text-slate text-sm">{contactPage.getInTouch.address}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gold font-medium mb-1 text-sm">Email</h4>
                      <p className="text-slate text-sm">{contactPage.getInTouch.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gold font-medium mb-1 text-sm">Phone</h4>
                      <p className="text-slate text-sm">{contactPage.getInTouch.phone}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-6 pt-6 border-t border-ink-border">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-full transition-colors duration-200 hover:bg-[#128C7E] min-h-[48px]"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Quote Form */}
            <AnimateOnScroll delay={0.1}>
              <div className="bg-ink-soft border border-ink-border rounded-xl p-6 md:p-8">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Send Us a Message
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Request a Quote</h3>
                <p className="text-slate text-sm mb-8">Fill in the form and we'll get back to you shortly.</p>

                <form onSubmit={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-white mb-1.5">Name *</label>
                      <input id="contact-name" type="text" required className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium text-white mb-1.5">Company Name *</label>
                      <input id="contact-company" type="text" required className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contact-country" className="block text-sm font-medium text-white mb-1.5">Country Code</label>
                      <select id="contact-country" className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors">
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-white mb-1.5">Contact No *</label>
                      <input id="contact-phone" type="tel" required className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-1.5">Email ID *</label>
                      <input id="contact-email" type="email" required className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contact-gst" className="block text-sm font-medium text-white mb-1.5">GST No</label>
                      <input id="contact-gst" type="text" className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="contact-requirement" className="block text-sm font-medium text-white mb-1.5">Requirement *</label>
                    <select id="contact-requirement" required value={requirement} onChange={(e) => setRequirement(e.target.value)} className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors">
                      <option value="">Select a product</option>
                      <option value="Base Oil SN150">Base Oil SN-150</option>
                      <option value="Base Oil SN300">Base Oil SN-300</option>
                      <option value="Bitumen">Bitumen / Asphalt Modifier</option>
                      <option value="LDO">Industrial LDO</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-white mb-1.5">More Information</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Please describe your specific requirements..."
                      className="w-full px-4 py-2.5 bg-paper border border-ink-border rounded-lg text-sm text-ink focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-white font-semibold rounded-full transition-colors duration-200 hover:bg-gold-light min-h-[48px]"
                  >
                    Request for Quote
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Dispatch Options */}
      <section className="py-12 md:py-16 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="DISPATCH"
            title="Available"
            titleAccent="Packaging Options"
            subtitle="Flexible delivery methods for your requirements"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactPage.dispatchOptions.map((option, i) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-ink-soft border border-ink-border rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">{option}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedProduct={requirement}
      />
    </>
  )
}
