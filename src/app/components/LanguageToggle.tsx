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
      className={`w-12 h-6 md:w-15 md:h-7 rounded-full transition-all duration-300 relative ${
        isEnglish ? 'bg-[#344d97]' : 'bg-[#faeb83]'
      } ${className}`}
    >
      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white transition-transform duration-300 flex items-center justify-center text-[10px] font-bold text-black absolute top-[2px] ${
        isEnglish ? 'translate-x-6.5 md:translate-x-8.5' : 'translate-x-0.5'
      }`}>
        {isEnglish ? 'EN' : 'FR'}
      </div>
    </button>
  )
}