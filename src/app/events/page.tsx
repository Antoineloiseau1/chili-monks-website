"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import { upcomingEventsData } from '@/data'
import { EventCard } from '@/components/ui'
import { filterUpcomingEvents } from '@/utils'
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa"
import Link from "next/link"
import { useLanguage } from "@/context"
import { t } from "../data/translations"

export default function EventsPage() {
  const { language } = useLanguage()
  const tr = t.events[language]

  // Get filtered events
  const upcomingEvents = filterUpcomingEvents(upcomingEventsData)
  return (
    <>
    
      {upcomingEvents.length > 0 && (<PageTitle className="">{tr.upcomingShows}</PageTitle>) }

      <PageContent className="text-white">
        <div className="max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        

          {upcomingEvents.length <= 0 && (
            <div className="flex flex-col items-center mb-10 gap-2">
              <h1 className="text-white text-center text-2xl -mt-10 md:text-2xl md:mt-1 lg:mt-8 xl:text-3xl xl:mt-10 2xl:mt-32 text-shadow-sm/30">{tr.restingAmps}</h1>
                  <p className="text-3xl text-yellow-300">{tr.stayTuned}</p>
                <div className="flex text-yellow-300 gap-1 items-center">
                  <Link href="https://www.instagram.com/acdcbypoweredge/">
                    <FaInstagram className="social-icon"/>
                  </Link>
                  <Link href="https://www.facebook.com/ACDCByPoweredge">
                    <FaFacebook className="social-icon"/>
                  </Link>
                  <Link href="https://www.youtube.com/@ChiliMonksTributeBand">
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
            <div className="mb-8 sm:mb-10 md:mb-12 mt-5 ">
              <div className="flex items-center justify-center ">
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-[58rem] mx-auto">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

        </div>
      </PageContent>
    </>
  )
}