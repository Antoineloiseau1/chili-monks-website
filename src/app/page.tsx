"use client"

import PageTitle from "./components/PageTitle"
import PageContent from "./components/PageContent"
import Link from "next/link"
import Image from "next/image"
import { upcomingEventsData } from '@/data'
import { getSortedNews, RichContentItem } from './data/newsData'
import { EventCard } from '@/components/ui'
import { filterUpcomingEvents } from '@/utils'
import { useState } from "react"
import LanguageToggle from "./components/LanguageToggle"
import Lightning from "./components/Lightning"

export default function HomePage() {
  const [newsLanguageStates, setNewsLanguageStates] = useState<{[key: string]: boolean}>({})
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
      <PageTitle>
        <p className="text-bold ">CHILI MONKS</p>
        <p>Red Hot Chili Peppers Tribute</p>
      </PageTitle>

      <PageContent className="text-white">
        <div className="max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-red-500 mx-6 sm:mx-8 md:mx-10 font-stencil">
                  &#127928; UPCOMING SHOWS <span>&#127928;</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
              </div>

              <div className="flex flex-col items-center mb-6">
                {upcomingEvents.slice(0, 3).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {upcomingEvents.length > 3 && (
                <div className="text-center">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    View All Events
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Latest News Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-yellow-500 mx-6 sm:mx-8 md:mx-10 font-stencil">
                📰 LATEST NEWS 📰
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
            </div>

            {/* News container with same sizing as news page */}
            <div className="max-w-sm 2xl:max-w-5xl sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-4">
              <div className="grid gap-8 sm:gap-10">
              {latestNews.map((newsItem, index) => {
                const isEnglish = newsLanguageStates[newsItem.id] || false
                const isExpanded = expandedNews[newsItem.id] || false
                const content = isEnglish ? newsItem.en.content : newsItem.fr.content
                return (
                <article
                  key={newsItem.id}
                  className="group bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-lg border border-gray-600/30 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 hover:scale-101"
                >
                  {/* Featured Image */}
                  {newsItem.image && (
                    <div className="relative h-35 sm:h-50 md:h-56 xl:h-65 2xl:h-70 overflow-hidden">
                      <Image
                        src={newsItem.image.url}
                        alt={isEnglish ? newsItem.en.title : newsItem.fr.title}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${newsItem.image.imageStyle || ''}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <time className="text-yellow-400 text-sm font-body bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-400/30">
                          {formatDate(newsItem.date, isEnglish)}
                        </time>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-200 font-body">
                              {isEnglish ? 'Latest' : 'Nouveau'}
                            </span>
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
                  <div className="p-8 md:p-10 pb-6 relative">
                    {/* Language Toggle - Aligned with Title */}
                    <div className="absolute right-1 -top-0 mt-2 z-10">
                      <LanguageToggle
                        isEnglish={isEnglish}
                        onToggle={() => setNewsLanguageStates(prev => ({
                          ...prev,
                          [newsItem.id]: !isEnglish
                        }))}
                        className="shadow-lg"
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-stencil text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300 mb-4">
                      {isEnglish ? newsItem.en.title : newsItem.fr.title}
                    </h3>

                    <div className="text-gray-200 text-sm md:text-base leading-relaxed font-body -mt-3">
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
                        className="mt-6 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-body text-sm font-medium"
                      >
                        {isExpanded ? (
                          <>
                            {isEnglish ? 'Read Less' : 'Lire Moins'}
                            <svg className="w-4 h-4 transform rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </>
                        ) : (
                          <>
                            {isEnglish ? 'Read More' : 'Lire Plus'}
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
                  className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  View All News
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="max-w-sm 2xl:max-w-5xl sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-4 mb-8 sm:mb-10 md:mb-12">
            <div className="bg-black/70 backdrop-blur-lg border border-red-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-stencil text-white mb-2 sm:mb-4">
                Rock With Us!
              </h3>
              <p className="text-gray-200 font-body text-sm mb-4 sm:mb-6 max-w-2xl mx-auto">
                Don&apos;t miss out on our latest exclusive content.
              </p>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <Link
                  href="/videos"
                  className="p-2 w-40 border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm font-medium transition-colors"
                >
                  Watch Videos
                </Link>
                <Link
                  href="https://acdcbypoweredge.sumupstore.com/products"
                  className="p-2 w-40 border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm font-medium transition-colors"
                >
                  Shopping
                </Link>
                <Link
                  href="/about"
                  className="p-2 w-40 border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm font-medium transition-colors"
                >
                  Learn about us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  )
}
