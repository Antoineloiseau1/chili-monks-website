import Image from "next/image"
import Link from "next/link"
import { FiMapPin, FiCalendar, FiArrowLeft, FiClock, FiExternalLink } from "react-icons/fi"
import { MdOutlineReduceCapacity } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5"
import { MdLocalBar } from "react-icons/md"
import PageTitle from "../../components/PageTitle"
import PageContent from "../../components/PageContent"
import { Event } from "@/types"
import { upcomingEventsData } from "@/data/events"
import { IoTicket } from "react-icons/io5"

// Get event by ID from centralized data
const getEventById = (id: string): Event | null => {
  return upcomingEventsData.find(event => event.id === id) || null
}

export async function generateStaticParams() {
  return upcomingEventsData.map((event) => ({
    id: event.id,
  }))
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = getEventById(id)

  if (!event) {
    return (
      <>
        <PageTitle>Event Not Found</PageTitle>
        <PageContent className="text-white">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <h2 className="text-3xl text-red-500 mb-4">⚡ Event Not Found ⚡</h2>
              <p className="text-gray-300 mb-8">The event you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
              <Link 
                href="/events" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiArrowLeft className="inline mr-2" />
                Back to Events
              </Link>
            </div>
          </div>
        </PageContent>
      </>
    )
  }

  const getGoogleMapsLink = (address: string) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(address)}`
  }

  return (
    <>
      <PageTitle>{event.name}</PageTitle>
      <PageContent className="text-white">
      <div className="max-w-md sm:max-w-lg lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-3">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/events" 
            className="inline-flex items-center text-yellow-300 hover:text-white transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            back to shows
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative mb-6 rounded-xl  overflow-hidden">
          {event.image && (
            <div className="absolute inset-0 border-red-500/30 border">
              <Image
                src={event.image}
                fill
                alt={event.name}
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0  bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            </div>
          )}
          
          <div className="relative z-0 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col">
            {/* Main content */}
            <div className="flex-1 flex items-start pt-6">
              <div className="p-8">
                <h1 className="text-xl lg:text-2xl text-white mb-2 leading-tight">
                  {event.eventName}
                </h1>
                <div className="text-gray-200 text-sm lg:text-base leading-relaxed font-body">
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
              <div className="grid grid-cols-2 gap-1 md:flex md:justify-center lg:justify-start text-xs">
                {/* Date - always first (top-left) */}
                <div className="flex items-center justify-center bg-red-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-red-500/30 col-start-1">
                  <FiCalendar className="text-red-400 text-xs sm:text-sm" />
                  <span className="whitespace-nowrap">{event.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-center bg-blue-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-blue-500/30">
                  <FiMapPin className="text-blue-400 text-xs sm:text-sm" />
                  <span className="whitespace-nowrap">{event.city}</span>
                </div>
                {/* Time info - second slot (top-right) */}
                {event.doorsOpen && (
                  <div className="flex items-center justify-center bg-green-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1  rounded-full border border-green-500/30">
                    <FiClock className="text-green-400 text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">Doors {event.doorsOpen}</span>
                  </div>
                )}
                {event.showStarts && !event.doorsOpen && (
                  <div className="flex items-center justify-center bg-yellow-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-yellow-500/30">
                    <FiClock className="text-yellow-400 text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">Show {event.showStarts}</span>
                  </div>
                )}
                {event.time && !event.doorsOpen && !event.showStarts && (
                  <div className="flex items-center justify-center bg-yellow-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-yellow-500/30">
                    <FiClock className="text-yellow-400 text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">{event.time}</span>
                  </div>
                )}

                {/* Show time - third slot (bottom-left) if doors open exists */}
                {event.doorsOpen && event.showStarts && (
                  <div className="flex items-center justify-center bg-yellow-600 space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-yellow-500/30">
                    <FiClock className="text-yellow-400 text-xs sm:text-sm" />
                    <span className="whitespace-nowrap">Show {event.showStarts}</span>
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
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl text-red-500 flex items-center gap-2">
                  <FiCalendar className="text-lg sm:text-xl" />
                  Détails
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FiCalendar className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <div>
                      <p className="text-yellow-300 text-xs sm:text-sm">Date</p>
                      <p className="text-white text-sm sm:text-base">
                        {event.date.toLocaleDateString('fr-FR', {
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
                      <FiClock className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">Doors Open At</p>
                        <p className="text-white text-sm sm:text-base">{event.doorsOpen}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.showStarts && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiClock className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">show starts at</p>
                        <p className="text-white text-sm sm:text-base">{event.showStarts}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.time && !event.doorsOpen && !event.showStarts && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiClock className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">time</p>
                        <p className="text-white text-sm sm:text-base">{event.time}</p>
                      </div>
                    </div>
                  )}
  
                </div>
                
                <div className="flex-1 space-y-3 sm:space-y-4">
                {event.capacity && (
                                        <div className="flex items-start gap-2 sm:gap-3">
                      <MdOutlineReduceCapacity className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">Capacity</p>
                        <p className="text-white text-sm sm:text-base">{event.capacity}</p>
                      </div>
                    </div>
                  )
                }

                  {event.isFood && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <IoRestaurant className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">Food Available</p>
                      </div>
                    </div>
                  )}
                  
                  {event.isDrinks && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MdLocalBar className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm">Drinks Available</p>
                      </div>
                    </div>
                  )}
                  
                  
                  {event.link && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FiExternalLink className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                      <div>
                        <p className="text-yellow-300 text-xs sm:text-sm font-semibold">Site</p>
                        <a 
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm break-all"
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
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl text-red-500 mb-4 sm:mb-6 flex items-center gap-2">
                  <FiMapPin className="text-lg sm:text-xl" />
                  Location
                </h2>
                
                <div className="mb-4">
                  <p className="text-white mb-1 text-sm sm:text-base">{event.venue}</p>
                  <p className="text-gray-300 text-sm sm:text-base">{event.address}</p>
                  <a
                    href={getGoogleMapsLink(event.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm mt-2"
                  >
                    <FiExternalLink className="text-xs sm:text-sm" />
                    See on maps
                  </a>
                </div>
                
                {/* Embedded Google Maps */}
                <div className="rounded-lg overflow-hidden h-48 sm:h-64 border border-gray-600/30">
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
            <div className="bg-gradient-to-br from-red-600/20 to-yellow-600/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 sm:p-6 sticky top-20">
              
              {event.price && (
                <div className="text-center mb-4 pb-4 border-b border-white/20">
                  <p className="text-yellow-300 text-sm">Price starts at</p>
                  <p className="text-white text-xl">{event.price}</p>
                </div>
              )}

              <div className="space-y-3">
                {event.ticketLink && (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-center py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoTicket className="text-lg sm:text-xl" />
                      <span className="text-sm sm:text-base">Buy Tickets</span>
                    </div>
                  </a>
                )}
                
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black/40 hover:bg-black/60 border border-white/20 text-white text-center py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300"
                >
                  <span className="text-sm sm:text-base">more infos</span>
                </a>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                <p className="text-xs text-gray-400 text-center">
                  Available Tickets on official website
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      </PageContent>
    </>
  )
}