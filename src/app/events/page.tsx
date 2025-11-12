"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import { upcomingEventsData, pastEventsData } from '@/data'
import { EventCard, Card3DModal, PastEventsCarousel } from '@/components/ui'
import { useImageModal } from '@/hooks'
import { 
  filterUpcomingEvents, 
  filterPastEvents, 
  filterPastEventsByDate, 
  combinePastEvents 
} from '@/utils'
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa"
import Link from "next/link"

export default function EventsPage() {
  const { selectedImage, currentIndex, images, openModal, closeModal, navigateToImage } = useImageModal()
  
  // Get filtered events
  const upcomingEvents = filterUpcomingEvents(upcomingEventsData)
  const pastEvents = filterPastEvents(upcomingEventsData)
  const filteredPastEvents = filterPastEventsByDate(pastEventsData)
  
  // Combine all past events
  const allPastEventsCombined = combinePastEvents(pastEvents, filteredPastEvents)
  return (
    <>
    
      {upcomingEvents.length > 0 && (<PageTitle className="">upcoming Shows</PageTitle>) }

      <PageContent className="text-white">
        <div className="max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        

          {upcomingEvents.length <= 0 && (
            <div className="flex flex-col items-center mb-10 gap-2">
              <h1 className="text-white text-center text-2xl -mt-10 md:text-2xl md:mt-1 lg:mt-8 xl:text-3xl xl:mt-10 2xl:mt-32 text-shadow-sm/30">Resting the amps, we'll be back soon !</h1>
                  <p className="text-3xl text-yellow-300">Stay Tuned</p>
                <div className="flex text-yellow-300 gap-1 items-center">
                  <Link href="https://www.instagram.com/acdcbypoweredge/">
                    <FaInstagram className="social-icon"/>
                  </Link>
                  <Link href="https://www.facebook.com/ACDCByPoweredge">
                    <FaFacebook className="social-icon"/>
                  </Link>
                  <Link href="https://www.youtube.com/@ACDCByPoweredge">
                    <FaYoutube className="social-icon"/>
                  </Link>
                  <Link href="https://www.tiktok.com/@acdcbypoweredge">
                    <FaTiktok className="social-icon"/>
                  </Link>
                </div>
              </div>
          )}


          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center justify-center ">
              </div>
              
              <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-red-500 mx-6 sm:mx-8 md:mx-10 flex items-center gap-2">
                ⬇ Previous SHOWS posters ⬇
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
            </div>
            
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <p className="text-gray-400">
              </p>
            </div>
          </div>
          
          <PastEventsCarousel 
            events={allPastEventsCombined} 
            onImageClick={openModal} 
          />

          {/* 3D Card Modal for enlarged images */}
          {selectedImage && (
            <Card3DModal 
              imageSrc={selectedImage} 
              alt="Enlarged event image" 
              onClose={closeModal}
              images={images}
              currentIndex={currentIndex}
              onNavigate={navigateToImage}
            />
          )}
        </div>
      </PageContent>
    </>
  )
}