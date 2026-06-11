"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { getSortedNews, RichContentItem } from "../data/newsData"
import { useLanguage } from "@/context"
import { t } from "../data/translations"

export default function BlogPage() {
  const { isEnglish, language } = useLanguage()
  const tr = t.news[language]
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())
  const sortedNews = getSortedNews()

  const formatDate = (dateString: string, isEnglish: boolean) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const togglePost = (postId: string) => {
    const newExpanded = new Set(expandedPosts)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedPosts(newExpanded)
  }

  const getExcerpt = (content: string[], maxLength: number = 200) => {
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
      <PageTitle>{tr.pageTitle}</PageTitle>
      
      <PageContent className="text-white">

        <div className="max-w-sm 2xl:max-w-5xl  sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-4">

          {/* Blog Posts Grid */}
          <div className="grid gap-8 sm:gap-10 mb-12">
            {sortedNews.map((newsItem, index) => {
              const isExpanded = expandedPosts.has(newsItem.id)
              const content = isEnglish ? newsItem.en.content : newsItem.fr.content
              const skew = index % 2 === 0 ? '-skew-x-12' : 'skew-x-12'
              const unskew = index % 2 === 0 ? 'skew-x-12' : '-skew-x-12'

              return (
                <article
                  key={newsItem.id}
                  className={`${skew} group rounded-md hover:scale-99 hover:bg-[#e8e9e5]/10 bg-[#e8e9e5]/60 shadow-xs inset-shadow-sm/0 hover:inset-shadow-sm/40 overflow-hidden transition-all duration-500 ease-in-out`}
                >
                  {/* Featured Image */}
                  {newsItem.image && (
                    <div className={`${unskew} relative h-35 sm:h-50 md:h-56 xl:h-65 2xl:h-70 overflow-hidden`}>
                      <Image
                        src={newsItem.image.url}
                        alt={isEnglish ? newsItem.en.title : newsItem.fr.title}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105  ${newsItem.image.imageStyle}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 ">
                        <time className="text-yellow-400 text-sm font-body bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-400/30">
                          {formatDate(newsItem.date, isEnglish)}
                        </time>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-4  right-4 ">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-200 font-body">{tr.latest}</span>
                          </div>
                        </div>
                      )}

                      {newsItem.image.legend && (
                        <div className="absolute bottom-1 right-2 text-[7px] sm:text-xs text-gray-200 font-body rounded bg-black/10 backdrop-blur-xs p-1">
                          <span className="mr-1">&copy;</span>{newsItem.image.legend}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Header */}
                  <div className={`${unskew} p-8  md:p-10 pb-6 relative`}>
                    <h2 className="text-xl sm:text-2xl  font-avant-garde text-white leading-tight group-hover:text-red-400 transition-colors duration-300">
                      {isEnglish ? newsItem.en.title : newsItem.fr.title}
                    </h2>
                  </div>

                  {/* Post Content */}
                  <div className={`${unskew} px-8 pb-4`}>
                    
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
                    
                    {
                    content.join(' ').length > 200 && (
                      <button
                        onClick={() => togglePost(newsItem.id)}
                        className="mt-6  inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-body text-sm font-medium group"
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

                  {/* Post Footer */}
                  {/* <div className="px-8 py-4 bg-black/20 border-t border-gray-600/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border border-red-700 p-1 bg-black rounded-full flex items-center justify-center">
                          <Image
                            src={newsItem.authorPicture || "/favicon.ico"}
                            alt="Author Picture"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <span className="text-gray-300 font-body text-xs">
                          {newsItem.author || "The Chili Monks Team"}
                        </span>
                      </div>
                    </div>
                  </div> */}
                </article>
              )
            })}
          </div>

          {/* Call to Action Section */}
          <div className="bg-white/30 backdrop-blur-lg border border-red-500/30 rounded-2xl sm:rounded-3xl p-4 text-center mb-8">
            <h3 className="text-2xl font-avant-garde text-whitemb-2  ">
              {tr.stayInTheLoop}
            </h3>
            <p className="text-gray-200 font-body text-md mx-auto1 sm:mb-2 md:mb-4">
              {tr.dontMissOut}
            </p>
            
            <div className="flex flex-col md:flex-row  gap-4 items-center justify-center">
              <Link
                href="/events"
                className="p-2  w-40  border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm"
              >
                {tr.upcomingShows}
              </Link>
              <Link
                href="/contact"
                className="p-2  w-40  border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm"
              >
                {tr.getInTouch}
              </Link>
              <Link
                href="/medias"
                className="p-2  w-40  border border-gray-600 rounded-full hover:border-red-500 hover:bg-red-500 text-sm"
              >
                {tr.watchVideos}
              </Link>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  )
}
