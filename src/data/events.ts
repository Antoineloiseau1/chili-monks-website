import { mediaUrl } from '@/lib/media'
import { Event, PastEvent } from '@/types'

export const upcomingEventsData: Event[] = [
  {
    id: 'monster-fest',
    name: 'Monster\'s tribute Fest',
    date: new Date('2026-08-18'),
    eventName: 'Monster\'s Tribute Fest',
    venue: 'Monster\'s Art',
    city: 'Frejus',
    address: '358 Rue Rudolf Diesel, 83600 Fréjus',
    image: mediaUrl("/images/events/monster.jpg"),
    description: [],
    link: 'https://fb.me/e/64BPJgkUt',
    ticketLink: 'https://www.helloasso.com/associations/ass-monster-s-art/evenements/monster-s-tribute-fest-1-0',
    time: '21:00',
    doorsOpen: '20:00',
    showStarts: '21:00',
    price: '12 Euros',
    isFood: true,
    isDrinks: true,
    isParking: true,
  },
  {
    id: 'altherax',
    name: 'Fall Tribute Festival',
    date: new Date('2026-11-27'),
    eventName: 'Fall Tribute Festival',
    venue: 'Altherax',
    city: 'Nice',
    address: '105 Rte de Canta Galet route de 06200, 06200 Nice',
    image: mediaUrl("images/events/altherax.jpeg"),
    description: [],
    link: "",
    ticketLink: null,
    time: '20:30',
    doorsOpen: '19:00',
    showStarts: '20:30',
    price: '10 euros',
    isFood: true,
    isDrinks: true,
    isParking: false,
  },
]

export const pastEventsData: PastEvent[] = []