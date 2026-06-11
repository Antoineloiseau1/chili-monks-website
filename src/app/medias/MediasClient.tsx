"use client"

import PageTitle from '../components/PageTitle'
import PageContent from '../components/PageContent'
import PhotoCarousel from '../components/PhotoCarousel'
import { FaYoutube, FaBell } from "react-icons/fa"
import { videosData, youtubeChannelData } from '@/data'
import { VideoEmbed } from '@/components/ui'
import { useLanguage } from '@/context'
import { t } from '../data/translations'

export default function MediasClient({ photos }: { photos: string[] }) {
  const { language } = useLanguage()
  const tr = t.medias[language]

  // Sort videos by date (latest first)
  const sortedVideos = videosData
    .filter(video => video.publishedAt)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())

  // The demo video (latest) now lives on the home page, so exclude it here
  const otherVideos = sortedVideos.slice(1)

  return (
    <div>
      <PageTitle>{tr.pageTitle}</PageTitle>

      <PageContent>
        <div className="max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10 md:space-y-12 mt-6">
          {/* YouTube Channel Link */}
          <div className="justify-center text-center mb-8 sm:mb-10 md:mb-12">
            <a
              href={youtubeChannelData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 px-3 transition-colors duration-300 text-lg"
            >
              <FaYoutube className="text-2xl sm:text-3xl md:text-3xl mb-[2px] mr-2" />
              <span>{tr.youtubeChannel}</span>
            </a>
          </div>

          {/* More Videos Section */}
          {otherVideos.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              {/* Section Header */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-avant-garde text-yellow-500 mb-2">
                  {tr.moreVideos}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full"></div>
              </div>

              {/* Videos Layout */}
              <div className="w-full">
                {/* Mobile: Single Column */}
                <div className="flex flex-col gap-6 sm:gap-8 md:hidden">
                  {otherVideos.map((video, index) => (
                    <div key={index} className="mx-auto w-full max-w-sm group bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105">
                      {/* Video Embed */}
                      <div className="aspect-video">
                        <VideoEmbed
                          video={video}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Video Title */}
                      <div className="p-4">
                        <h3 className="text-white font-avant-garde text-sm sm:text-base leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: 2x2 Grid */}
                <div className="hidden md:flex md:flex-col md:items-center md:gap-8">
                  {/* First Row */}
                  <div className="flex gap-8">
                    {otherVideos.slice(0, 2).map((video, index) => (
                      <div key={index} className="w-80 lg:w-90  2xl:w-120 group bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105">
                        {/* Video Embed */}
                        <div className="aspect-video">
                          <VideoEmbed
                            video={video}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Video Title */}
                        <div className="p-4">
                          <h3 className="text-white font-avant-garde text-sm sm:text-base leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Second Row */}
                  {otherVideos.length > 2 && (
                    <div className="flex gap-8">
                      {otherVideos.slice(2, 4).map((video, index) => (
                        <div key={index + 2} className="w-80 lg:w-90 2xl:w-120 group bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105">
                          {/* Video Embed */}
                          <div className="aspect-video">
                            <VideoEmbed
                              video={video}
                              className="w-full h-full"
                            />
                          </div>

                          {/* Video Title */}
                          <div className="p-4">
                            <h3 className="text-white font-avant-garde text-sm sm:text-base leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-black/90 to-gray-900/90 rounded-2xl p-4 backdrop-blur-lg border border-gray-600/30">
            <h3 className="text-xl text-white mb-3 lg:text-2xl">
              {tr.subscribeForMore}</h3>
            <p className="text-gray-300 text-sm font-body max-w-2xl mx-auto lg:text-base">
              {tr.subscribeText}
            </p>
            <p className="text-gray-300 text-sm font-body max-w-2xl mx-auto mb-4 lg:text-base">{tr.subscribeText2}</p>
          <div className="justify-center text-center">
            <a
              href={youtubeChannelData.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 px-4 transition-colors duration-300 text-lg"
            >
              <FaBell className="mb-[2px] mr-2" />
              <span>{tr.subscribe}</span>
            </a>
          </div>
          </div>

          {/* Photo Gallery Carousel */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-avant-garde text-yellow-500 mb-2">
                {tr.photoGallery}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full"></div>
            </div>

            {/* Carousel */}
            <div className="max-w-4xl mx-auto">
              <PhotoCarousel
                photos={photos}
                autoPlayInterval={5000}
                className="shadow-lg shadow-black/50"
              />
            </div>
          </div>
        </div>
      </PageContent>
    </div>
  )
}
