"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  isEnglish: boolean
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'chili-monks-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en') {
      setLanguage('en')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr')
  }, [])

  return (
    <LanguageContext.Provider value={{ language, isEnglish: language === 'en', toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
