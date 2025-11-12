import { Event, PastEvent, CombinedPastEvent } from '@/types'
import { isEventPast, isEventUpcoming } from './dateUtils'

export const filterUpcomingEvents = (events: Event[]): Event[] => {
  return events
    .filter(event => isEventUpcoming(event.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const filterPastEvents = (events: Event[]): Event[] => {
  return events
    .filter(event => isEventPast(event.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const filterPastEventsByDate = (pastEvents: PastEvent[]): PastEvent[] => {
  return pastEvents.filter(event => 
    event.date && isEventPast(event.date)
  )
}

export const combinePastEvents = (
  detailedEvents: Event[], 
  simpleEvents: PastEvent[]
): CombinedPastEvent[] => {
  const detailedPastEvents = detailedEvents
    .filter(event => event.image !== null)
    .map(event => ({
      date: event.date,
      image: event.image || "/images/icon.png",
      name: event.name,
      venue: event.venue,
      city: event.city,
      type: "detailed" as const
    }))

  const simplePastEvents = simpleEvents.map(event => ({
    date: event.date!,
    image: event.image,
    name: null,
    venue: null,
    city: null,
    type: "image" as const
  }))

  return [...detailedPastEvents, ...simplePastEvents]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export const createInfiniteCarouselData = <T>(items: T[], repetitions: number = 4): T[] => {
  const result: T[] = []
  for (let i = 0; i < repetitions; i++) {
    result.push(...items)
  }
  return result
}