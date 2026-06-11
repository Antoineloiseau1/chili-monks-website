"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import { useLanguage } from "@/context"
import { t } from "../data/translations"

export default function ContactPage() {
  const { language } = useLanguage()
  const tr = t.contact[language]

  return (
    <>
      <PageTitle>{tr.pageTitle} <span className="font-body">?</span></PageTitle>

      <PageContent className="text-white">
        <></>
      </PageContent>
    </>
  )
}
