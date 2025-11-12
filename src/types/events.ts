export interface Event {
  id: string
  name: string
  date: Date
  eventName: string | null
  venue: string | null
  city: string | null
  address: string | null
  image: string | null
  description: string | string[]
  link: string
  ticketLink: string | null
  time?: string
  doorsOpen?: string
  showStarts?: string
  price?: string
  capacity?: string
  isFood?: boolean
  isDrinks?: boolean
}

export interface PastEvent {
  date: Date | null
  image: string
}

export interface CombinedPastEvent {
  date: Date
  image: string
  name: string | null
  venue: string | null
  city: string | null
  type: 'detailed' | 'image'
}

export interface EventsPageState {
  selectedImage: string | null
  isDragging: boolean
  dragStart: { x: number; scrollLeft: number }
  isAnimationPaused: boolean
}