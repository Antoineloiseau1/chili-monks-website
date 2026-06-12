"use client"

import Image from "next/image"
import Link from "next/link"
import { FiMapPin, FiCalendar, FiArrowLeft, FiClock, FiExternalLink } from "react-icons/fi"
import { MdOutlineReduceCapacity } from "react-icons/md"
import { IoRestaurant } from "react-icons/io5"
import { MdLocalBar } from "react-icons/md"
import { FaParking } from "react-icons/fa"
import { IoTicket } from "react-icons/io5"
import PageTitle from "../../components/PageTitle"
import PageContent from "../../components/PageContent"
import { Event } from "@/types"
import { useLanguage } from "@/context"
import { t } from "@/app/data/translations"

// Police de titre du site (cf. EventCard, news) : Anybody étirée
const titleFont = { fontFamily: 'var(--font-anybody)', fontStretch: '120%' } as const

export default function EventDetailClient({ event }: { event: Event }) {
  const { language } = useLanguage()
  const tr = t.events[language]

  const getGoogleMapsLink = (address: string) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(address)}`
  }

  return (
    <>
      <PageTitle>{event.name}</PageTitle>
      <PageContent>
      <div className="max-w-md sm:max-w-lg lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-3 mt-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center text-[#344d97] hover:text-[#283b75] font-medium transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {tr.backToShows}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative mb-6 rounded-md overflow-hidden shadow-xs bg-[#e8e9e5]/60">
          {event.image && (
            <div className="absolute inset-0">
              <Image
                src={event.image}
                fill
                alt={event.name}
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>
          )}

          <div className="relative z-0 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col">
            {/* Main content */}
            <div className="flex-1 flex items-start pt-6">
              <div className="p-8">
                <h1
                  className="text-xl lg:text-2xl text-white mb-2 leading-tight text-shadow-lg/40"
                  style={titleFont}
                >
                  {event.eventName?.toUpperCase()}
                </h1>
                <div className="text-gray-100 text-sm lg:text-base leading-relaxed font-body text-shadow-sm/40">
                  {Array.isArray(event.description) ? (
                    event.description.map((line, index) => (
                      <p key={index} className={index > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))
                  ) : (
                    <p>{event.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Info at bottom */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2 md:flex md:justify-center lg:justify-start text-xs">
                {/* Date - always first (top-left) */}
                <div className="flex items-center justify-center bg-[#344d97]/85 backdrop-blur-sm text-white space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs col-start-1">
                  <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                    <FiCalendar className="text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">{event.date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </span>
                </div>
                <div className="flex items-center justify-center bg-[#faeb83]/90 backdrop-blur-sm text-[#344d97] font-semibold space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs">
                  <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                    <FiMapPin className="text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">{event.city}</span>
                  </span>
                </div>
                {/* Time info - second slot (top-right) */}
                {event.doorsOpen && (
                  <div className="flex items-center justify-center bg-[#344d97]/85 backdrop-blur-sm text-white space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs">
                    <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                      <FiClock className="text-xs sm:text-sm" />
                      <span className="whitespace-nowrap">{tr.doors} {event.doorsOpen}</span>
                    </span>
                  </div>
                )}
                {event.showStarts && !event.doorsOpen && (
                  <div className="flex items-center justify-center bg-[#344d97]/85 backdrop-blur-sm text-white space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs">
                    <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                      <FiClock className="text-xs sm:text-sm" />
                      <span className="whitespace-nowrap">{tr.show} {event.showStarts}</span>
                    </span>
                  </div>
                )}
                {event.time && !event.doorsOpen && !event.showStarts && (
                  <div className="flex items-center justify-center bg-[#344d97]/85 backdrop-blur-sm text-white space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs">
                    <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                      <FiClock className="text-xs sm:text-sm" />
                      <span className="whitespace-nowrap">{event.time}</span>
                    </span>
                  </div>
                )}

                {/* Show time - third slot (bottom-left) if doors open exists */}
                {event.doorsOpen && event.showStarts && (
                  <div className="flex items-center justify-center bg-[#344d97]/85 backdrop-blur-sm text-white space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md -skew-x-12 shadow-xs">
                    <span className="flex items-center gap-1 sm:gap-2 skew-x-12">
                      <FiClock className="text-xs sm:text-sm" />
                      <span className="whitespace-nowrap">{tr.show} {event.showStarts}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">

          {/* Left Column - Event Details */}
          <div className="flex-1 lg:flex-[2] space-y-4 sm:space-y-6">

            {/* Event Information Card */}
            <div className="bg-[#e8e9e5]/60 shadow-xs rounded-md p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h2
                  className="text-lg sm:text-xl text-[#344d97] flex items-center gap-2"
                  style={titleFont}
                >
                  <FiCalendar className="text-lg sm:text-xl" />
                  {tr.details.toUpperCase()}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FiCalendar className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <div>
                      <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.date}</p>
                      <p className="text-gray-700 font-body text-sm sm:text-base">
                        {event.date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {event.doorsOpen && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiClock className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.doorsOpenAt}</p>
                        <p className="text-gray-700 font-body text-sm sm:text-base">{event.doorsOpen}</p>
                      </div>
                    </div>
                  )}

                  {event.showStarts && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiClock className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.showStartsAt}</p>
                        <p className="text-gray-700 font-body text-sm sm:text-base">{event.showStarts}</p>
                      </div>
                    </div>
                  )}

                  {event.time && !event.doorsOpen && !event.showStarts && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiClock className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.time}</p>
                        <p className="text-gray-700 font-body text-sm sm:text-base">{event.time}</p>
                      </div>
                    </div>
                  )}

                </div>

                <div className="flex-1 space-y-3 sm:space-y-4">
                  {event.capacity && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MdOutlineReduceCapacity className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.capacity}</p>
                        <p className="text-gray-700 font-body text-sm sm:text-base">{event.capacity}</p>
                      </div>
                    </div>
                  )}

                  {event.isFood && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <IoRestaurant className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.foodAvailable}</p>
                      </div>
                    </div>
                  )}

                  {event.isDrinks && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MdLocalBar className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.drinksAvailable}</p>
                      </div>
                    </div>
                  )}

                  {event.isParking && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaParking className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.parkingAvailable}</p>
                      </div>
                    </div>
                  )}

                  {event.link && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiExternalLink className="text-[#344d97] mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-[#344d97] font-semibold text-xs sm:text-sm">{tr.site}</p>
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#344d97] underline underline-offset-2 hover:text-[#283b75] transition-colors font-body text-xs sm:text-sm break-all"
                        >
                          {event.link.replace('https://www.', '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Location & Map Card */}
            {event.address && (
              <div className="bg-[#e8e9e5]/60 shadow-xs rounded-md p-4 sm:p-6">
                <h2
                  className="text-lg sm:text-xl text-[#344d97] mb-4 sm:mb-6 flex items-center gap-2"
                  style={titleFont}
                >
                  <FiMapPin className="text-lg sm:text-xl" />
                  {tr.location.toUpperCase()}
                </h2>

                <div className="mb-4">
                  <p className="text-gray-800 font-body font-medium mb-1 text-sm sm:text-base">{event.venue}</p>
                  <p className="text-gray-700 font-body text-sm sm:text-base">{event.address}</p>
                  <a
                    href={getGoogleMapsLink(event.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#344d97] underline underline-offset-2 hover:text-[#283b75] transition-colors text-xs sm:text-sm mt-2"
                  >
                    <FiExternalLink className="text-xs sm:text-sm" />
                    {tr.seeOnMaps}
                  </a>
                </div>

                {/* Embedded Google Maps */}
                <div className="rounded-md overflow-hidden h-48 sm:h-64 shadow-xs">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${event.venue}`}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Tickets & Actions */}
          <div className="flex-1 lg:flex-[1]">

            {/* Ticket Purchase Card */}
            <div className="bg-[#e8e9e5]/60 shadow-xs rounded-md p-4 sm:p-6 sticky top-20">

              {event.price && (
                <div className="text-center mb-4 pb-4 border-b border-[#344d97]/20">
                  <p className="text-[#344d97] font-semibold text-sm">{tr.priceStartsAt}</p>
                  <p className="text-gray-800 font-body text-xl">{event.price}</p>
                </div>
              )}

              <div className="space-y-3">
                {event.ticketLink && (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#344d97] hover:bg-[#283b75] text-white text-center py-3 sm:py-4 px-4 sm:px-6 rounded-md -skew-x-12 transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-center justify-center gap-2 skew-x-12">
                      <IoTicket className="text-lg sm:text-xl" />
                      <span className="text-sm sm:text-base font-medium">{tr.buyTickets}</span>
                    </div>
                  </a>
                )}

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-[#344d97] text-[#344d97] hover:bg-[#344d97] hover:text-white text-center py-2 sm:py-3 px-4 sm:px-6 rounded-md -skew-x-12 transition-colors duration-300"
                >
                  <span className="inline-block skew-x-12 text-sm sm:text-base font-medium">{tr.moreInfos}</span>
                </a>
              </div>

              {!event.ticketLink && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#344d97]/20">
                  <p className="text-xs text-gray-600 font-body text-center">
                    {tr.ticketsAtVenue}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      </PageContent>
    </>
  )
}
