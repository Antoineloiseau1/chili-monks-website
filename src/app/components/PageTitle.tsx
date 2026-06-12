interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1 className={`text-title text-center text-3xl xl:mt-10 ${className}`}>
      {children}
    </h1>
  )
}