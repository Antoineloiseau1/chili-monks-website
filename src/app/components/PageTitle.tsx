interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1 className={`text-red-500 text-center text-3xl -mt-10 md:text-4xl md:mt-1 lg:mt-8 xl:text-5xl  xl:mt-10 2xl:mt-32${className}`}>
      {children}
    </h1>
  )
}