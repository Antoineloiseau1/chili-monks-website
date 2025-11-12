export interface RichContentItem {
  type: 'html' | 'jsx'
  template: string // HTML template with {{key}} placeholders
  translations: {
    fr: { [key: string]: string }
    en: { [key: string]: string }
  }
}

export interface NewsItem {
  id: string
  date: string
  image?: {
    url: string
    imageStyle?: string
    legend?: string
  } // Optional image URL/path
  author?: string // Optional author, defaults to "The PowerEdge Team"
  authorPicture?: string // Optional author picture, defaults to "favicon.ico"
  richContent?: RichContentItem[] // Optional translatable rich content (HTML/JSX)
  fr: {
    title: string
    content: string[]
  }
  en: {
    title: string
    content: string[]
  }
}

export const newsData: NewsItem[] = [
]

// Helper function to sort news by date (most recent first)
export const getSortedNews = (): NewsItem[] => {
  return newsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
