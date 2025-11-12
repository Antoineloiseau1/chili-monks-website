export interface Video {
  url: string
  title: string
  description?: string
  thumbnailUrl?: string
  publishedAt?: Date
}

export interface YouTubeChannel {
  name: string
  url: string
  subscribeUrl: string
}