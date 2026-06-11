interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`text-[#faeb83] text-center text-shadow-lg text-3xl xl:mt-10 uppercase font-semibold ${className}`}
      style={{ fontFamily: 'var(--font-anybody)', fontStretch: '150%' }}
    >
      {children}
    </h1>
  )
}