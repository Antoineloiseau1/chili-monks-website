"use client"

import Link from 'next/link'
import PageTitle from './components/PageTitle'
import PageContent from './components/PageContent'
import Lightning from './components/Lightning'
import { useLanguage } from '@/context'
import { t } from './data/translations'

export default function NotFound() {
  const { language } = useLanguage()
  const tr = t.notFound[language]

  return (
    <>
      <PageTitle>404 <Lightning /> Not Found</PageTitle>

      <PageContent className="flex flex-col items-center justify-center min-h-[30vh] 2xl:mt-30 text-white bg-black/90 backdrop-blur-lg p-8">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <h2 className="text-2xl mb-4 2xl:text-4xl text-center">{tr.subtitle}</h2>

          <p className="font-body text-center mb-6 text-gray-300">
            {tr.description}
          </p>

          <div className="flex flex-col gap-3 w-50">
            <Link href="/events" className="bg-red-600 hover:bg-red-700 text-white text-center py-3 px-6 rounded-full transition-colors">
              {tr.viewEvents}
            </Link>

            <Link href="/about" className="border border-white hover:bg-white hover:text-black text-white text-center py-3 px-6 rounded-full transition-colors">
              {tr.aboutUs}
            </Link>
          </div>
        </div>
      </PageContent>
    </>
  )
}
