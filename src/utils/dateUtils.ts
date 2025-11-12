import { DATE_FORMAT } from '@/config'

export const calculateDaysToEvent = (eventDate: Date): number => {
  const today = new Date()
  const timeDiff = eventDate.getTime() - today.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return daysDiff
}

export const formatEventDate = (date: Date): string => {
  return date.toLocaleDateString(DATE_FORMAT.LOCALE, DATE_FORMAT.OPTIONS)
}

export const isEventPast = (eventDate: Date): boolean => {
  return calculateDaysToEvent(eventDate) < 0
}

export const isEventUpcoming = (eventDate: Date): boolean => {
  return calculateDaysToEvent(eventDate) >= 0
}