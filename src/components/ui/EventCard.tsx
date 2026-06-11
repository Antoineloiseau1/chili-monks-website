"use client"

import Link from "next/link"
import Image from "next/image"
import { FiClock } from "react-icons/fi"
import { IoTicket } from "react-icons/io5"
import { Event } from '@/types'
import { calculateDaysToEvent, formatEventDate } from '@/utils'
import { UI_CONSTANTS } from '@/config'
import { useLanguage } from '@/context'
import { t } from '@/app/data/translations'

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const skew = '-skew-x-12'
  const unskew = 'skew-x-12'
  const { language } = useLanguage()
  const tr = t.events[language]
  const daysToEvent = calculateDaysToEvent(event.date)
  const formattedDate = formatEventDate(event.date)

  return (
    <Link 
      href={`/events/${event.id}`} 
      className={`${skew} hover:cursor-pointer rounded-md mb-4 hover:scale-100 hover:bg-[#e8e9e5]/10 bg-[#e8e9e5]/60 shadow-xs inset-shadow-sm/0 hover:inset-shadow-sm/40 transition-all duration-500 ease-in-out flex flex-row items-center justify-center text-white `}
      style={{width: UI_CONSTANTS.LAYOUT.CONTAINER_WIDTH}}
    >
      <div className={`${unskew} hidden sm:block`}>
        {event.image && (
          <Image
            src={event.image}
            width={175}
            height={117}
            alt={event.name}
            className="rounded w-auto h-auto  sm:max-w-[90px] md:max-w-[110px] md:max-h-[130px] xl:max-h-[170px] 2xl:max-w-[200px] 2xl:max-h-[200px]"
          />
        )}
      </div>
      <div className={`${unskew} flex flex-col items-center w-7/8`}>
        <div className="mt-1 text-[10px] md:text-[14px] 2xl:text-lg flex flex-row items-center border-2 shadow-xs/30 shadow-teal-300 border-1 rounded-full pl-2 pr-2 text-sm text-[#344d97] text-shadow-teal-700 text-shadow-sm/30">
          <FiClock className="mr-1 2xl:text-lg"/>
          <p className="">{daysToEvent} {tr.daysToEvent}</p>
        </div>

        <h2 className="text-lg lg:text-xl text-shadow-gray-500 md:text-2xl text-shadow-sm/30">{event.name}</h2>
        <div className="flex flex-col items-center">
          <p className="text-sm">{event.venue}</p>
          <div className="flex flex-row">
            <p className="text-white">{formattedDate}</p>
            <p className="ml-2 text-red-500 text-shadow-sm/30">{event.city}</p>
          </div>
        </div>

        {event.ticketLink && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (event.ticketLink) {
                window.open(event.ticketLink, '_blank')
              }
            }}
            className="text-[10px] md:text-[14px] 2xl:text-lg flex text-center items-center justify-center text-yellow-300 border hover:bg-yellow-300 hover:text-black hover:text-shadow-gray-800 hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out rounded-full pl-6 pr-6 mt-1 text-yellow-300 text-shadow-teal-700 text-shadow-sm/30 shadow-xs/30 shadow-teal-300 border-1 rounded-full mb-2"
          >
            <IoTicket className="mr-1"/>
            <span className="">{tr.tickets}</span>
          </button>
        )}
      </div>
    </Link>
  )
}