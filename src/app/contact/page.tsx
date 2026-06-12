"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import Link from "next/link"
import { FaFacebook, FaYoutube } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { useLanguage } from "@/context"
import { t } from "../data/translations"

// Mêmes liens que la SocialMediaBar du header
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/chilimonks_tributeband/", Icon: RiInstagramFill },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61582356374397", Icon: FaFacebook },
  { name: "YouTube", href: "https://www.youtube.com/@ChiliMonksTributeBand", Icon: FaYoutube },
]

// Bande "chantier" : rayures diagonales dans les couleurs du site
function ConstructionStripes() {
  return (
    <div
      aria-hidden
      className="h-3 w-full"
      style={{
        background:
          "repeating-linear-gradient(-45deg, #faeb83 0 14px, #344d97 14px 28px)",
      }}
    />
  )
}

// Petit égaliseur animé : la page se construit en musique
function Equalizer() {
  return (
    <div className="flex items-end justify-center gap-1.5 h-10" aria-hidden>
      {[0, 1, 2, 3, 4].map(i => (
        <span
          key={i}
          className="w-2 rounded-sm bg-[#344d97]/80 eq-bar"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export default function ContactPage() {
  const { language } = useLanguage()
  const tr = t.contact[language]

  return (
    <>
      <PageTitle>{tr.pageTitle} <span className="font-body">?</span></PageTitle>

      <PageContent>
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 mt-12 sm:mt-16 mb-10">
          <div className="rounded-md overflow-hidden bg-[#e8e9e5]/60 shadow-xs">
            <ConstructionStripes />

            <div className="p-6 sm:p-10 text-center">
              {/* Astérisque RHCP en guise de roue de chantier */}
              <div
                className="text-6xl sm:text-7xl text-[#344d97] mb-4 animate-spin select-none inline-block"
                style={{ fontFamily: "var(--font-anybody)", animationDuration: "8s" }}
                aria-hidden
              >
                ✱
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold text-[#344d97] mb-4"
                style={{ fontFamily: "var(--font-anybody)", fontStretch: "120%" }}
              >
                {tr.underConstruction.toUpperCase()}
              </h2>

              <p className="text-gray-700 font-body text-sm md:text-base leading-relaxed mb-6">
                {tr.tuningInProgress}
              </p>

              <Equalizer />

              <p className="text-gray-700 font-body text-sm mt-6 mb-3">
                {tr.meanwhileWrite}
              </p>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map(({ name, href, Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    aria-label={name}
                    className="text-[#344d97] hover:text-[#283b75] hover:scale-110 transition-all duration-200"
                  >
                    <Icon size={36} />
                  </Link>
                ))}
              </div>

              <p className="text-gray-700 font-body text-sm mt-6 mb-4">
                {tr.orCheckShows}
              </p>
              <Link
                href="/events"
                className="inline-flex items-center bg-[#344d97] hover:bg-[#283b75] text-white px-6 py-3 rounded-md -skew-x-12 font-medium shadow-xs transition-colors"
              >
                <span className="inline-flex items-center gap-2 skew-x-12">
                  {t.events[language].upcomingShows}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>

            <ConstructionStripes />
          </div>
        </div>
      </PageContent>
    </>
  )
}
