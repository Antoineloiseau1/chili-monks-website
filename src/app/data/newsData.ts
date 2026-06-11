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
  author?: string // Optional author, defaults to "The Chili Monks Team"
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
  {
    id: 'concert-ete-2026',
    date: '2026-06-11',
    fr: {
      title: 'Chili Monks de retour sur scène cet été !',
      content: [
        "Le groupe est heureux de vous annoncer son grand retour sur scène pour la saison estivale 2026.",
        "Après plusieurs mois de préparation, nous avons concocté un tout nouveau set reprenant les plus grands classiques d'AC/DC, des débuts avec Bon Scott jusqu'à l'ère Brian Johnson.",
        "Restez connectés : les dates de la tournée seront annoncées très prochainement sur la page Événements. On a hâte de vous retrouver !",
      ],
    },
    en: {
      title: 'Chili Monks back on stage this summer!',
      content: [
        'The band is thrilled to announce its big return to the stage for the 2026 summer season.',
        "After months of preparation, we've put together a brand new set featuring AC/DC's greatest classics, from the early Bon Scott days to the Brian Johnson era.",
        "Stay tuned: tour dates will be announced very soon on the Events page. We can't wait to see you again!",
      ],
    },
  },
]

// Helper function to sort news by date (most recent first)
export const getSortedNews = (): NewsItem[] => {
  return newsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
