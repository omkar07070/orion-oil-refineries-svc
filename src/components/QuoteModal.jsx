import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quoteForm, WHATSAPP_NUMBER, ORION_EMAIL } from '../data/content'

/**
 * Quote request modal — ink panel, gold accents, paper inputs.
 * Supports submission via WhatsApp or direct email.
 * @param {{ isOpen: boolean, onClose: () => void, preselectedProduct?: string }} props
 */
export default function QuoteModal({ isOpen, onClose, preselectedProduct = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    countryCode: '+91',
    phone: '',
    email: '',
    gst: '',
    requirement: '',
    message: '',
  })
  const [submitMethod, setSubmitMethod] = useState('whatsapp') // 'whatsapp' | 'email'
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedProduct) {
      const match = quoteForm.requirementOptions.find((opt) =>
        opt.value.toLowerCase().includes(preselectedProduct.toLowerCase())
      )
      if (match) {
        setFormData((prev) => ({ ...prev, requirement: match.value }))
      }
    }
  }, [preselectedProduct])

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, company, countryCode, phone, email, gst, requirement, message } = formData

    if (submitMethod === 'whatsapp') {
      const whatsappMsg =
        `*New Quote Request - Orion Oil*%0A%0A` +
        `*Name:* ${name}%0A*Company:* ${company}%0A` +
        `*Phone:* ${countryCode}${phone}%0A*Email:* ${email}%0A` +
        `*GST No:* ${gst || 'N/A'}%0A*Requirement:* ${requirement}%0A` +
        `*Additional Info:* ${message || 'N/A'}`
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, '_blank')
    } else {
      const subject = encodeURIComponent(`Quote Request — ${company || 'New Inquiry'}`)
      const body = encodeURIComponent(
        `New Quote Request — Orion Oil\n\n` +
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Phone: ${countryCode}${phone}\n` +
        `Email: ${email}\n` +
        `GST No: ${gst || 'N/A'}\n` +
        `Requirement: ${requirement}\n` +
        `Additional Info: ${message || 'N/A'}\n`
      )
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${ORION_EMAIL}&su=${subject}&body=${body}`
      window.open(gmailUrl, '_blank')
    }

    // Show inline success state, auto-close after 1.5s
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', company: '', countryCode: '+91', phone: '', email: '', gst: '', requirement: '', message: '' })
      setSubmitted(false)
      onClose()
    }, 1500)
  }

  const inputClass = `
    w-full px-4 py-2.5
    bg-paper text-ink
    border border-ink-border rounded-lg
    text-sm focus:outline-none focus:border-gold transition-colors
  `

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-ink-soft border border-ink-border rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ink-border">
                <h3 className="text-xl font-semibold text-gold">Request for Quote</h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-border min-w-[44px] min-h-[44px]"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  /* Success state */
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                    <p className="text-slate text-sm">
                      {submitMethod === 'whatsapp'
                        ? 'Opening WhatsApp to complete your inquiry.'
                        : 'Opening your email client to send the inquiry.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Company Name *</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Country Code</label>
                      <select name="countryCode" value={formData.countryCode} onChange={handleChange} className={inputClass}>
                        {quoteForm.countryCodes.map((code) => (
                          <option key={code.value} value={code.value}>{code.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Contact No *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Email ID *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">GST No</label>
                      <input type="text" name="gst" value={formData.gst} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-white mb-1.5">Requirement *</label>
                      <select name="requirement" value={formData.requirement} onChange={handleChange} required className={inputClass}>
                        <option value="">Select a product</option>
                        {quoteForm.requirementOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-white mb-1.5">More Information</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Please describe your specific requirements..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit method selector */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white mb-3">Send via</label>
                    <div className="flex gap-3">
                      {/* WhatsApp option */}
                      <button
                        type="button"
                        onClick={() => setSubmitMethod('whatsapp')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm border-2 transition-all min-h-[48px] ${
                          submitMethod === 'whatsapp'
                            ? 'bg-[#25D366] border-[#25D366] text-white'
                            : 'border-ink-border text-slate hover:border-[#25D366] hover:text-[#25D366]'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>
                        WhatsApp
                      </button>

                      {/* Email option */}
                      <button
                        type="button"
                        onClick={() => setSubmitMethod('email')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm border-2 transition-all min-h-[48px] ${
                          submitMethod === 'email'
                            ? 'bg-gold border-gold text-white'
                            : 'border-ink-border text-slate hover:border-gold hover:text-gold'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-gold text-white font-semibold rounded-full transition-colors duration-200 hover:bg-gold-light min-h-[48px]"
                  >
                    {submitMethod === 'whatsapp' ? 'Submit via WhatsApp' : 'Send Email Inquiry'}
                  </button>
                </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
