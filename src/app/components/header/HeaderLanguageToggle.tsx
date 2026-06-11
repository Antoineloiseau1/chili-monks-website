"use client"

import { useLanguage } from '@/context'
import LanguageToggle from '../LanguageToggle'

export default function HeaderLanguageToggle() {
  const { isEnglish, toggleLanguage } = useLanguage()
  return (
    <>
      {/* Mobile: top-left, visible below lg */}
      <div className="fixed top-6 left-3 z-50 lg:hidden">
        <LanguageToggle isEnglish={isEnglish} onToggle={toggleLanguage} />
      </div>
      {/* Desktop: inline in header, rendered via Header.tsx */}
    </>
  )
}
