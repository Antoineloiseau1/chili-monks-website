// UI Constants
export const UI_CONSTANTS = {
  CAROUSEL: {
    ANIMATION_RESUME_DELAY: 1000,
  },
  LAYOUT: {
    HEADER_HEIGHT: 50,
    CONTAINER_WIDTH: '87.5%',
  },
} as const

// Date and Time Constants
export const DATE_FORMAT = {
  LOCALE: 'fr-FR',
  OPTIONS: {
    weekday: 'short' as const,
    day: '2-digit' as const,
    month: 'short' as const,
  },
} as const

// Animation Constants
export const ANIMATION = {
  TRANSITION_DURATION: '300ms',
  HOVER_SCALE: 1.05,
  ACTIVE_SCALE: 0.95,
} as const

// External Links
export const EXTERNAL_LINKS = {
  YOUTUBE: {
    BASE_EMBED_URL: 'https://www.youtube.com/embed/',
    WATCH_URL_PATTERN: /v=([^&]+)/,
  },
} as const