"use client"

import Link from "next/link"
import { IoTicket } from "react-icons/io5"
import { Event } from '@/types'
import { formatEventDate } from '@/utils'
import { useLanguage } from '@/context'
import { t } from '@/app/data/translations'

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const { language } = useLanguage()
  const tr = t.events[language]
  const formattedDate = formatEventDate(event.date)
  // Image de l'event en fond de carte si elle existe, sinon couleur unie.
  // Les données fournissent parfois un nom de fichier nu ("psych1.jpg") :
  // on le résout dans /images/. La couche est consommée par background-image,
  // d'où le dégradé à deux bouts identiques pour la couleur unie.
  const cardBg = event.image
    ? `url(${event.image})`
    : 'linear-gradient(#344d97, #1a2a5c)'

  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative block w-40 sm:w-56 md:w-72 aspect-[2/3] overflow-hidden rounded-lg bg-black shadow-lg/40 hover:shadow-xl/60 hover:scale-[1.02] transition-all duration-300 ease-in-out text-white"
    >
      {/* Affiche entière (contain), zoom léger au survol */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: cardBg }}
      />

      {/* Dégradé pour la lisibilité du texte en bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Infos de l'event */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 p-2 md:p-4 text-center">
        <h2
          className="text-sm sm:text-base md:text-xl font-bold text-shadow-lg/40"
          style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}
        >
          {event.name.toUpperCase()}
        </h2>

        <p className="text-xs md:text-sm text-shadow-lg/40">{event.venue?.toUpperCase()}</p>

        <div className="flex flex-row items-center gap-2">
          <p className="text-xs md:text-sm text-shadow-lg/40">{formattedDate}</p>
          <p
            className="text-xs md:text-sm text-[#faeb83] font-semibold text-shadow-lg/40"
            style={{ fontFamily: 'var(--font-anybody)', fontStretch: '120%' }}
          >
            {event.city?.toUpperCase()}
          </p>
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
            className="text-[10px] md:text-[14px] 2xl:text-lg flex text-center items-center justify-center text-yellow-300 border hover:bg-yellow-300 hover:text-black hover:text-shadow-gray-800 hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out rounded-md -skew-x-12 pl-6 pr-6 mt-1 text-shadow-teal-700 text-shadow-sm/30 shadow-xs/30 shadow-teal-300 border-1 mb-1"
          >
            <span className="flex items-center skew-x-12">
              <IoTicket className="mr-1"/>
              <span>{tr.tickets}</span>
            </span>
          </button>
        )}
      </div>
    </Link>
  )
}
