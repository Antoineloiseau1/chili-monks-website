"use client"

interface LanguageToggleProps {
  isEnglish: boolean
  onToggle: () => void
  className?: string
}

export default function LanguageToggle({ isEnglish, onToggle, className = "" }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 md:w-16 md:h-8 rounded-md transition-all duration-300 relative ${
        isEnglish ? 'bg-yellow-400' : 'bg-red-700'
      } ${className}`}
    >
      <div className={`w-5 h-5 md:w-7 md:h-7 rounded-sm bg-white transition-transform duration-300 flex items-center justify-center text-xs font-bold text-black absolute top-0.5 ${
        isEnglish ? 'translate-x-6.5 md:translate-x-8.5' : 'translate-x-0.5'
      }`}>
        {isEnglish ? 'EN' : 'FR'}
      </div>
    </button>
  )
}