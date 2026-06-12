"use client"

import PageTitle from "./components/PageTitle"
import PageContent from "./components/PageContent"
import FeaturedVideo from "./components/FeaturedVideo"
import Link from "next/link"
import Image from "next/image"
import { upcomingEventsData } from '@/data'
import { getSortedNews, RichContentItem } from './data/newsData'
import { EventCard } from '@/components/ui'
import { filterUpcomingEvents } from '@/utils'
import { useState } from "react"
import { useLanguage } from '@/context'
import { t } from './data/translations'

export default function HomePage() {
  const { isEnglish, language } = useLanguage()
  const tr = t.home[language]
  const [expandedNews, setExpandedNews] = useState<{[key: string]: boolean}>({})

  // Get upcoming events only
  const upcomingEvents = filterUpcomingEvents(upcomingEventsData)

  // Get latest news (only the most recent one)
  const latestNews = getSortedNews().slice(0, 1)

  const formatDate = (dateString: string, isEnglish: boolean) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (content: string[], maxLength: number = 150) => {
    const fullText = content.join(' ')
    if (fullText.length <= maxLength) return fullText
    return fullText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
  }

  // Function to render rich content with language support using templates
  const renderRichContent = (richContentItems: RichContentItem[], isEnglish: boolean) => {
    return richContentItems.map((item, index) => {
      const translations = isEnglish ? item.translations.en : item.translations.fr

      // Replace template placeholders with translated content
      let content = item.template
      Object.keys(translations).forEach(key => {
        const placeholder = `{{${key}}}`
        content = content.replace(new RegExp(placeholder, 'g'), translations[key])
      })

      if (item.type === 'html') {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: content }}
            className="rich-content-html"
          />
        )
      }
      // For JSX type, we could implement a more complex renderer here
      // For now, treating it as HTML
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: content }}
          className="rich-content-jsx"
        />
      )
    })
  }

  return (
    <>


      <PageContent>
        <div className="max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">

          {/* Teaser video in a chili-shaped frame */}
          <FeaturedVideo title="Teaser" className="mb-8 sm:mb-10 md:mb-12" />

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
                <h2 className="text-title text-2xl sm:text-3xl md:text-4xl mx-6 sm:mx-8 md:mx-10 text-stroke-2">
                   {tr.upcomingShows.toUpperCase()}
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-[58rem] mx-auto mb-6">
                {upcomingEvents.slice(0, 3).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {upcomingEvents.length > 3 && (
                <div className="text-center">
                  <Link
                    href="/events"
                    className="inline-flex items-center bg-[#344d97] hover:bg-[#283b75] text-white px-6 py-3 rounded-md -skew-x-12 font-medium shadow-xs transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 skew-x-12">
                      {tr.viewAllEvents}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Latest News Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
              <h2 className="text-title text-2xl sm:text-3xl md:text-4xl mx-6 sm:mx-8 md:mx-10 text-stroke-2">
                {tr.latestNews.toUpperCase()}
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
            </div>

            {/* News container with same sizing as news page */}
            <div className="max-w-sm 2xl:max-w-5xl sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-4">
              <div className="grid gap-8 sm:gap-10">
              {latestNews.map((newsItem, index) => {
                const isExpanded = expandedNews[newsItem.id] || false
                const content = isEnglish ? newsItem.en.content : newsItem.fr.content
                // Skew réservé aux grands écrans : sur mobile/tablette il fait
                // déborder la carte du viewport et rogne le contenu
                const skew = index % 2 === 0 ? 'lg:-skew-x-12' : 'lg:skew-x-12'
                const unskew = index % 2 === 0 ? 'lg:skew-x-12' : 'lg:-skew-x-12'
                return (
                <article
                  key={newsItem.id}
                  className={`${skew} group rounded-md hover:scale-99 bg-[#e8e9e5]/60 hover:bg-[#e8e9e5]/80 shadow-xs inset-shadow-sm/0 hover:inset-shadow-sm/40 overflow-hidden transition-all duration-500 ease-in-out`}
                >
                  {/* Featured Image */}
                  {newsItem.image && (
                    <div className={`${unskew} relative h-35 sm:h-50 md:h-56 xl:h-65 2xl:h-70 overflow-hidden`}>
                      <Image
                        src={newsItem.image.url}
                        alt={isEnglish ? newsItem.en.title : newsItem.fr.title}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${newsItem.image.imageStyle || ''}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <time className="inline-block text-white text-sm bg-[#344d97]/85 backdrop-blur-sm px-3 py-1 rounded-md -skew-x-12 shadow-xs">
                          <span className="inline-block skew-x-12">{formatDate(newsItem.date, isEnglish)}</span>
                        </time>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 bg-[#faeb83]/90 backdrop-blur-sm px-3 py-1 rounded-md -skew-x-12 shadow-xs">
                            <div className="flex items-center gap-2 skew-x-12">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span
                                className="text-xs text-[#344d97] font-semibold"
                                style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}
                              >
                                {tr.latest.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {newsItem.image.legend && (
                        <div className="absolute bottom-1 right-2 text-[7px] sm:text-xs text-gray-200 font-body rounded bg-black/10  backdrop-blur-sm px-1 pt-1 pb-1">
                           <span className="mr-1">&copy;</span>{newsItem.image.legend}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Content */}
                  <div className={`${unskew} p-5 sm:p-8 md:p-10 pb-4 sm:pb-6 relative`}>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#344d97] leading-tight group-hover:text-[#283b75] transition-colors duration-300 mb-4"
                      style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}
                    >
                      {(isEnglish ? newsItem.en.title : newsItem.fr.title).toUpperCase()}
                    </h3>

                    <div className="text-gray-700 text-sm md:text-base leading-relaxed font-body -mt-3">
                      {isExpanded ? (
                        <div className="space-y-2">
                          {content.map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Render Rich Content */}
                          {newsItem.richContent && (
                            <div className="mt-4">
                              {renderRichContent(newsItem.richContent, isEnglish)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>
                          {getExcerpt(content)}
                        </p>
                      )}
                    </div>

                    {content.join(' ').length > 150 && (
                      <button
                        onClick={() => setExpandedNews(prev => ({
                          ...prev,
                          [newsItem.id]: !isExpanded
                        }))}
                        className="mt-6 inline-flex items-center gap-2 text-[#344d97] hover:text-[#283b75] transition-colors font-body text-sm font-medium"
                      >
                        {isExpanded ? (
                          <>
                            {tr.readLess}
                            <svg className="w-4 h-4 transform rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </>
                        ) : (
                          <>
                            {tr.readMore}
                            <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </article>
                )
              })}
              </div>

              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <Link
                  href="/news"
                  className="inline-flex items-center bg-[#344d97] hover:bg-[#283b75] text-white px-6 py-3 rounded-md -skew-x-12 font-medium shadow-xs transition-colors"
                >
                  <span className="inline-flex items-center gap-2 skew-x-12">
                    {tr.viewAllNews}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="max-w-sm 2xl:max-w-5xl sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-4 mb-8 sm:mb-10 md:mb-12">
            <div className="lg:-skew-x-12 bg-[#e8e9e5]/60 shadow-xs rounded-md p-4 sm:p-6 md:p-8 text-center">
              <div className="lg:skew-x-12">
                <h3 className="text-2xl sm:text-3xl font-avant-garde text-[#344d97] mb-2 sm:mb-4">
                  {tr.rockWithUs}
                </h3>
                <p className="text-gray-700 font-body text-sm mb-4 sm:mb-6 max-w-2xl mx-auto">
                  {tr.dontMissOut}
                </p>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <Link
                    href="/about"
                    className="inline-block p-2 w-40 border border-[#344d97] text-[#344d97] rounded-md -skew-x-12 hover:bg-[#344d97] hover:text-white text-sm font-medium transition-colors"
                  >
                    <span className="inline-block skew-x-12">{tr.learnAboutUs}</span>
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
