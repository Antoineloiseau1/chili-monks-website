"use client"

import { useLanguage } from '@/context'
import LanguageToggle from '../LanguageToggle'

export default function DesktopLanguageToggle() {
  const { isEnglish, toggleLanguage } = useLanguage()
  return (
    <LanguageToggle isEnglish={isEnglish} onToggle={toggleLanguage} />
  )
}
