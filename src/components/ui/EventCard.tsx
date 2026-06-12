"use client"

import Link from "next/link"
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
  // Image de l'event en fond de carte si elle existe, sinon couleur unie.
  // Les données fournissent parfois un nom de fichier nu ("psych1.jpg") :
  // on le résout dans /images/. La couche est consommée par background-image,
  // d'où le dégradé à deux bouts identiques pour la couleur unie.
  const cardBg = event.image
    ? `url('${event.image.startsWith('/') ? event.image : `/images/${event.image}`}')`
    : 'linear-gradient(#e8e9e5, #e8e9e5)'

  return (
    <Link 
      href={`/events/${event.id}`} 
      className={`${skew} group hover:cursor-pointer mb-4 hover:scale-99 bg-[linear-gradient(rgba(232,233,229,0.6),rgba(232,233,229,0.6)),var(--card-bg)] hover:bg-[linear-gradient(rgba(232,233,229,0.1),rgba(232,233,229,0.1)),var(--card-bg)] bg-cover bg-center shadow-sm/20 inset-shadow-sm/0 hover:inset-shadow-sm/40 transition-all duration-300 ease-in-out flex flex-row items-center justify-center text-white `}
      style={{
        width: UI_CONSTANTS.LAYOUT.CONTAINER_WIDTH,
        '--card-bg': cardBg,
      } as React.CSSProperties}
    >
      <div className={`${unskew} flex flex-col items-center w-7/8`}>

        <h2 className="text-lg lg:text-xl text-[#344d97] group-hover:text-white transition-colors duration-300 font-bold md:text-2xl text-shadow-sm/30 text-bold group-hover:text-stroke-1 text-shadow-lg/40 text-stroke-color-black"
        style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}>{event.name.toUpperCase()}</h2>
        <div className="flex flex-col items-center">
          <p className="text-sm text-bold text-stroke-1 text-shadow-lg/40 text-stroke-color-black">{event.venue?.toUpperCase()}</p>
          <div className="flex flex-row">
            <p className="text-white text-bold text-stroke-1 text-shadow-lg/40 text-stroke-color-black">{formattedDate}</p>
            <p className="ml-2 text-[#faeb83] text-shadow-sm/30 font-semibold text-bold text-stroke-1 text-shadow-lg/40 text-stroke-color-black"
            style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}>{event.city?.toUpperCase()}</p>
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