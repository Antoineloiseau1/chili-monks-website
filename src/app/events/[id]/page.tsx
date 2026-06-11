import { notFound } from "next/navigation"
import { Event } from "@/types"
import { upcomingEventsData } from "@/data/events"
import { isEventPast } from "@/utils"
import EventDetailClient from "./EventDetailClient"

// Get event by ID from centralized data
const getEventById = (id: string): Event | null => {
  return upcomingEventsData.find(event => event.id === id) || null
}

export async function generateStaticParams() {
  // With `output: export`, an empty params list makes the build fail —
  // emit a placeholder page (it renders the 404 via notFound()) until real events exist
  if (upcomingEventsData.length === 0) {
    return [{ id: 'placeholder' }]
  }
  return upcomingEventsData.map((event) => ({
    id: event.id,
  }))
}

export const dynamicParams = false

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = getEventById(id)

  if (!event || isEventPast(event.date)) {
    notFound()
  }

  return <EventDetailClient event={event} />
}
