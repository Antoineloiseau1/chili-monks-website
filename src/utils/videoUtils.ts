import { EXTERNAL_LINKS } from '@/config'

export const getYouTubeEmbedUrl = (watchUrl: string): string => {
  const match = watchUrl.match(EXTERNAL_LINKS.YOUTUBE.WATCH_URL_PATTERN)
  const videoId = match?.[1]
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL format')
  }
  
  return `${EXTERNAL_LINKS.YOUTUBE.BASE_EMBED_URL}${videoId}`
}

export const extractVideoId = (watchUrl: string): string | null => {
  const match = watchUrl.match(EXTERNAL_LINKS.YOUTUBE.WATCH_URL_PATTERN)
  return match?.[1] || null
}