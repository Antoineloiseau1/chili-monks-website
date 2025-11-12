interface PageContentProps {
  children: React.ReactNode
  className?: string
}

export default function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  )
}