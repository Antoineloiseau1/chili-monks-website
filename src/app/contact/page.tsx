"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
import Lightning from "../components/Lightning"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    eventType: '',
    eventDate: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const subject = encodeURIComponent(formData.subject || `${formData.eventType} Inquiry - PWR*EDGE`)
      const body = encodeURIComponent(
        `Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Event Type: ${formData.eventType}
Event Date: ${formData.eventDate}

Message:
${formData.message}

---
Sent from PWR*EDGE Tribute Website`
      )
      const mailtoLink = `mailto:contact@poweredgetribute.com?subject=${subject}&body=${body}`
      
      window.location.href = mailtoLink
      setFormData({ name: '', email: '', subject: '', message: '', eventType: '', eventDate: '' })
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageTitle>Ready to Rock <span className="font-body">?</span></PageTitle>
      
      <PageContent className="text-white">

          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
            
              <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-lg p-4 sm:p-6 md:p-8 lg:p-10 2xl:p-12 rounded-2xl sm:rounded-3xl border border-gray-600/30 w-full lg:w-2/3 xl:w-1/2">
                <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                  <FaEnvelope className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-3xl mr-3 sm:mr-4 md:mr-6" />
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl 2xl:text-3xl text-yellow-400">send us your requests</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="text-sm sm:text-base md:text-base mb-3 ml-1 text-yellow-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="font-body w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                        placeholder="eg. John Smith"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-sm sm:text-base md:text-base ml-1 mb-3 text-yellow-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="font-body w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6">
                    <div>
                      <label htmlFor="eventType" className="text-sm sm:text-base md:text-base ml-1 mb-3 text-yellow-300">
                        Event Type
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="font-body w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      >
                        <option value="">Select event type</option>
                        <option value="Festival">Music Festival</option>
                        <option value="Concert">Concert Venue</option>
                        <option value="Private Event">Private Event</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="eventDate" className="text-sm sm:text-base md:text-base ml-1 mb-3 text-yellow-300">
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="font-body w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="text-sm sm:text-base md:text-base ml-1 mb-3 text-yellow-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="font-body w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="Subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm sm:text-base md:text-base ml-1 mb-3 text-yellow-300">
                      Your message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="font-body w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-800/80 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-vertical sm:rows-5"
                      placeholder="Ask us about any special requests..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-800 disabled:bg-gray-500 text-white py-3 sm:py-4 md:py-4 lg:py-4 rounded-xl text-base sm:text-lg md:text-lg hover:cursor-pointer hover:bg-red-500 transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Opening Email Client...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message
                      </span>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="text-green-400 text-center p-3 sm:p-4 md:p-6 text-sm sm:text-base md:text-lg bg-green-400/10 rounded-xl border border-green-400/30">
                      Your email client should open now. Thanks for reaching out - we will get back to you soon!
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-center p-3 sm:p-4 md:p-6 text-sm sm:text-base md:text-lg bg-red-400/10 rounded-xl border border-red-400/30">
                      Something went wrong. Please try emailing us directly at contact@poweredgetribute.com
                    </div>
                  )}
                </form>
              </div>
            

            {/* Contact Info & Social - Takes 1 column */}
            <div className="flex flex-col justify-center gap-4 sm:gap-6 md:gap-8">
              
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-lg p-6 sm:p-8 md:p-10 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-600/30 shadow-2xl shadow-yellow-400/10">
                <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
                  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-red-500">Quick Contact</h3>
                </div>
                
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                    <FaEnvelope className="text-red-500 text-base sm:text-lg md:text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-300 text-sm sm:text-base md:text-base">General Questions</p>
                      <a 
                        href="mailto:contact@poweredgetribute.com" 
                        className="font-body text-gray-300 hover:text-white transition-colors text-sm sm:text-base md:text-base break-all"
                      >
                        contact@poweredgetribute.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                    <FaCalendarAlt className="text-red-500 text-base sm:text-lg md:text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-300 text-sm sm:text-base md:text-base">Booking and Production</p>
                      <a 
                        href="mailto:prod@aseca.info" 
                        className="font-body text-gray-300 hover:text-white transition-colors text-sm sm:text-base md:text-base break-all"
                      >
                        prod@aseca.info
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                    <FaMapMarkerAlt className="text-red-500 text-base sm:text-lg md:text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-300 text-sm sm:text-base md:text-base">Based in</p>
                      <div className="flex flex-row font-body text-gray-300 text-sm sm:text-base md:text-base space-x-2">
                      <p>France</p>
                      <Lightning />
                      <p>Cote d&apos;azur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-lg p-6 sm:p-8 md:p-10 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-600/30 shadow-2xl shadow-yellow-500/10">
                <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-yellow-400">Follow the Thunder</h3>
                </div>
                
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                  <Link 
                    href="https://www.instagram.com/acdcbypoweredge/"
                    target="_blank"
                    className="flex items-center justify-center p-3 sm:p-4 md:p-4 border border-gray-600 rounded-xl hover:border-red-500 hover:bg-red-500 transition-all group text-sm sm:text-base md:text-base"
                  >
                    <FaInstagram className="text-red-500 group-hover:text-white mr-2 sm:mr-3" size={18} />
                    <span className="group-hover:text-white font-medium">Instagram</span>
                  </Link>
                  
                  <Link 
                    href="https://www.facebook.com/ACDCByPoweredge"
                    target="_blank"
                    className="flex items-center justify-center p-3 sm:p-4 md:p-4 border border-gray-600 rounded-xl hover:border-red-500 hover:bg-red-500 transition-all group text-sm sm:text-base md:text-base"
                  >
                    <FaFacebook className="text-red-500 group-hover:text-white mr-2 sm:mr-3" size={18} />
                    <span className="group-hover:text-white font-medium">Facebook</span>
                  </Link>
                  
                  <Link 
                    href="https://www.youtube.com/@ACDCByPoweredge"
                    target="_blank"
                    className="flex items-center justify-center p-3 sm:p-4 md:p-4 border border-gray-600 rounded-xl hover:border-red-500 hover:bg-red-500 transition-all group text-sm sm:text-base md:text-base"
                  >
                    <FaYoutube className="text-red-500 group-hover:text-white mr-2 sm:mr-3" size={18} />
                    <span className="group-hover:text-white font-medium">YouTube</span>
                  </Link>
                  
                  <Link 
                    href="https://www.tiktok.com/@acdcbypoweredge"
                    target="_blank"
                    className="flex items-center justify-center p-3 sm:p-4 md:p-4 border border-gray-600 rounded-xl hover:border-red-500 hover:bg-red-500 transition-all group text-sm sm:text-base md:text-base"
                  >
                    <FaTiktok className="text-red-500 group-hover:text-white mr-2 sm:mr-3" size={18} />
                    <span className="group-hover:text-white font-medium">TikTok</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
      </PageContent>
    </>
  )
}