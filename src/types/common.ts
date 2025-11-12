export interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export interface SocialMediaLink {
  platform: string
  url: string
  icon: React.ComponentType
}

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}