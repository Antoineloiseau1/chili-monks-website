"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import FeaturedVideo from "../components/FeaturedVideo"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context"
import { t } from "../data/translations"
import { mediaUrl } from "@/lib/media"

type RoleKey = "leadVocal" | "guitarVocals" | "bassGuitar" | "drums"

interface BandMember {
  name: string
  roleKey: RoleKey
  tributeTo: string
  // object-position du recadrage : la carte n'affiche qu'une bande horizontale
  // des photos (portrait), à ajuster selon la hauteur du visage sur chacune
  imgPosition: string
}

const bandMembers: BandMember[] = [
  { name: "Jules", roleKey: "leadVocal", tributeTo: "Anthony Kiedis", imgPosition: "50% 0%" },
  { name: "Thomas", roleKey: "guitarVocals", tributeTo: "John Frusciante", imgPosition: "50% 18%" },
  { name: "Johann", roleKey: "bassGuitar", tributeTo: "Flea", imgPosition: "50% 5%" },
  { name: "Antoine", roleKey: "drums", tributeTo: "Chad Smith", imgPosition: "50% 42%" },
]

function MemberPortrait({ member }: { member: BandMember }) {
  return (
    <div className="relative h-48 sm:h-56 overflow-hidden">
      <Image
        src={mediaUrl(`images/members/${member.name.toLowerCase()}.jpg`)}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ objectPosition: member.imgPosition }}
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    </div>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
      <h2 className="text-title text-2xl sm:text-3xl md:text-4xl mx-6 sm:mx-8 md:mx-10 text-stroke-2">
        {title.toUpperCase()}
      </h2>
      <div className="h-px bg-gradient-to-r from-transparent via-[#344d97] to-transparent flex-1"></div>
    </div>
  )
}

export default function AboutPage() {
  const { language } = useLanguage()
  const tr = t.about[language]

  return (
    <>
      <PageTitle>{tr.pageTitle}</PageTitle>

      <PageContent>
        <div className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-8">

          {/* Bannière du groupe */}
          <div className="relative h-44 sm:h-60 md:h-72 lg:h-80 rounded-md overflow-hidden shadow-xs mb-10 sm:mb-12">
            <Image
              src={mediaUrl("images/members/cover.png")}
              alt="Chili Monks"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Présentation du groupe */}
          <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="lg:-skew-x-12 bg-[#e8e9e5]/60 shadow-xs rounded-md p-5 sm:p-8 md:p-10">
              <div className="lg:skew-x-12 text-gray-700 font-body text-sm md:text-base leading-relaxed space-y-3 text-center">
                <p>{tr.intro1}</p>
                <p>{tr.intro2}</p>
              </div>
            </div>
          </div>

          {/* Les membres */}
          <SectionDivider title={tr.meetTheBand} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto mb-12 sm:mb-16">
            {bandMembers.map(member => {
              return (
                <article
                  key={member.name}
                  className="group rounded-md bg-[#e8e9e5]/60 hover:bg-[#e8e9e5]/80 shadow-xs hover:scale-99 inset-shadow-sm/0 hover:inset-shadow-sm/40 overflow-hidden transition-all duration-500 ease-in-out"
                >
                  <MemberPortrait member={member} />

                  <div className="p-5 sm:p-6 text-center relative">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#344d97] group-hover:text-[#283b75] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-anybody)", fontStretch: "120%" }}
                    >
                      {member.name.toUpperCase()}
                    </h3>

                    <div className="mt-3 mb-2">
                      <span className="inline-block text-white text-sm bg-[#344d97]/85 px-3 py-1 rounded-md -skew-x-12 shadow-xs">
                        <span className="inline-block skew-x-12">{tr[member.roleKey]}</span>
                      </span>
                    </div>

                    <p className="text-gray-600 font-body text-sm italic">
                      {tr.inTheShoesOf}{" "}
                      <span className="font-semibold text-[#344d97]">{member.tributeTo}</span>
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Vidéo de répétition */}
          <SectionDivider title={tr.inRehearsal} />

          {/* pt-15 compense le -mt-15 mobile interne au composant (prévu pour la home) */}
          <FeaturedVideo src="/videos/reharsal.mov" rounded="rounded-md" className="pt-15 md:pt-0 mb-12 sm:mb-16" />

          {/* Call to Action */}
          <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="lg:-skew-x-12 bg-[#e8e9e5]/60 shadow-xs rounded-md p-4 sm:p-6 md:p-8 text-center">
              <div className="lg:skew-x-12">
                <h3 className="text-2xl sm:text-3xl font-avant-garde text-[#344d97] mb-2 sm:mb-4">
                  {tr.readyToRock}
                </h3>
                <p className="text-gray-700 font-body text-sm mb-4 sm:mb-6 max-w-2xl mx-auto">
                  {tr.stepInto}
                </p>

                <Link
                  href="/events"
                  className="inline-flex items-center bg-[#344d97] hover:bg-[#283b75] text-white px-6 py-3 rounded-md -skew-x-12 font-medium shadow-xs transition-colors"
                >
                  <span className="inline-flex items-center gap-2 skew-x-12">
                    {tr.viewUpcomingShows}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  )
}
