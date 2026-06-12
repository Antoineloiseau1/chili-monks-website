import { mediaUrl } from '@/lib/media'
import { Event, PastEvent } from '@/types'

export const upcomingEventsData: Event[] = [
  {
    id: 'monster-fest',
    name: 'Monster\'s Art tribute Fest',
    date: new Date('2026-07-18'),
    eventName: 'Concert d\'été',
    venue: 'Monster\'s Art',
    city: 'Frejus',
    address: '358 Rue Rudolf Diesel, 83600 Fréjus',
    image: mediaUrl("/images/events/monster.jpg"),
    description: [],
    link: '/events/fete-musique-2026',
    ticketLink: null,
    time: '21:00',
    doorsOpen: '20:00',
    showStarts: '21:00',
    price: '10 euros',
    isFood: true,
    isDrinks: true,
    isParking: true,
  },
  {
    id: 'altherax',
    name: 'Altherax',
    date: new Date('2026-11-27'),
    eventName: 'Altherax',
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