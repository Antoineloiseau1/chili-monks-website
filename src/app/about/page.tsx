"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import { useLanguage } from "@/context"
import { t } from "../data/translations"

export default function AboutPage() {
  const { language } = useLanguage()
  const tr = t.about[language]

  return (
    <>
      <PageTitle>{tr.pageTitle}</PageTitle>

      <PageContent className="text-white">
        <></>
      </PageContent>
    </>
  )
}
