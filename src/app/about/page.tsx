"use client"

import PageTitle from "../components/PageTitle"
import PageContent from "../components/PageContent"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Lightning from "../components/Lightning"
import LanguageToggle from "../components/LanguageToggle"

export default function AboutPage() {
  const [isEnglish, setIsEnglish] = useState(false)

  const translations = {
    fr: {
      beginnings: {
        title: "Les débuts",
        content: [
          "L'aventure commence en 2023 avec la rencontre d'Alexandre (guitare lead/Angus Young), ancien guitariste de Royal Smash reconnu pour son talent et ses performances scéniques authentiques, Yann (guitare rythmique/Malcolm Young), ancien guitariste de Balls Out aux fortes influences AC/DC, et Alexis qui rêvait depuis longtemps de monter un tribute AC/DC.",
          "En décembre 2023, Anthony rejoint la formation à la basse après avoir assisté à l'audition d'Alexis au chant. Spellbound est né, un groupe 100% Niçois déterminé à faire revivre l'énergie légendaire d'AC/DC.",
          "Leur premier concert au l'Altherax le 9 février 2024 marque le début d'une série de dates avec des salles combles et un public enthousiaste. En mai 2025, ils atteignent un sommet en se produisant au Théâtre de Verdure de Nice lors du ROCKFEST, cette même scène mythique où AC/DC avait joué en 1979."
        ]
      },
      renaissance: {
        title: "La Rennaissance",
        content: [
          "Après le ROCKFEST de mai 2025, des divergences conduisent à l'éclatement de Spellbound. Mais la passion pour AC/DC reste intacte. Alexandre, Alexis et Anthony décident de faire continuer sa route au rock'n'roll train avec une formation entièrement renouvelée.",
          "L'arrivée d'Antoine à la batterie, vieil ami d'Alexandre, et de Corentin à la guitare rythmique (rôle de Malcolm Young) qui avait proposé ses services via TikTok, marque un tournant décisif. Cette nouvelle formation apporte un niveau technique supérieur et une complicité naturelle entre les membres.",
          "Ainsi naît POWEREDGE en 2025, plus déterminé et motivé que jamais. Cette nouvelle formation a déjà fait ses preuves en enflammant la Villa Barbary et le Théâtre de Verdure de Nice lors du NICE TRIBUTE FESTIVAL à guichet fermé, prouvant que l'alchimie opère parfaitement.",
          "Avec leur show explosif millimétré, POWEREDGE offre une expérience visuelle et sonore exceptionnelle. Le groupe a savamment compilé le meilleur des performances live légendaires d'AC/DC pour créer un spectacle unique, enrichi de décors soignés, de vidéos captivantes et d'instruments authentiques. Fortement inspirés du PWR UP Tour, ils intègrent des écrans géants diffusant des visuels époustouflants qui transportent le public au cœur de l'univers AC/DC. POWEREDGE continue ainsi de conquérir les scènes de la région et d'ailleurs, perpétuant avec brio la tradition du tribute rock australien."
        ]
      }
    },
    en: {
      beginnings: {
        title: "The Early Days",
        content: [
          "It all started in 2023 when Alexandre (lead guitar/Angus Young), a former Royal Smash guitarist known for his exceptional talent and electrifying stage presence, met Yann (rhythm guitar/Malcolm Young), ex-Balls Out guitarist with deep AC/DC roots, and Alexis, who had been dreaming of creating the ultimate AC/DC tribute for years.",
          "In December 2023, Anthony completed the lineup on bass after witnessing Alexis nail his vocal audition. Spellbound was born – a homegrown Nice band with one mission: to bring AC/DC's legendary energy back to life on stage.",
          "Their debut gig at Altherax on February 9, 2024 kicked off an incredible run of sold-out shows and wild crowds. By May 2025, they had hit the big time, rocking the iconic Théâtre de Verdure in Nice for ROCKFEST – the very same stage where AC/DC themselves had unleashed their thunder back in 1979."
        ]
      },
      renaissance: {
        title: "The Rebirth",
        content: [
          "After ROCKFEST in May 2025, creative differences tore Spellbound apart. But you can't kill rock 'n' roll that easily. Alexandre, Alexis, and Anthony refused to let the music die and decided to keep the thunder rolling with a completely fresh lineup.",
          "Enter Antoine on drums – Alexandre's longtime buddy – and Corentin on rhythm guitar (stepping into Malcolm's shoes), who had actually reached out through TikTok. This new blood brought serious chops and an instant musical chemistry that was undeniable.",
          "And so POWEREDGE was born in 2025, hungrier and more fired up than ever. This powerhouse lineup has already proven they've got what it takes, absolutely destroying Villa Barbary and the Théâtre de Verdure during the completely sold-out NICE TRIBUTE FESTIVAL – proof that the magic is real.",
          "POWEREDGE delivers a meticulously crafted, explosive live experience that's second to none. The band has cherry-picked the greatest moments from AC/DC's legendary performances to create something truly special – complete with killer stage design, mind-blowing video content, and gear that's the real deal. Drawing heavy inspiration from the PWR UP Tour, they've incorporated massive screens with stunning visuals that completely immerse the audience in the AC/DC universe. POWEREDGE continues to dominate stages across the region and beyond, carrying the torch of Australian rock tribute with unmatched passion and precision."
        ]
      }
    }
  }
  return (
    <>
      <PageTitle >About us</PageTitle>
      
      <PageContent className="text-white font-avant-garde mt-6">
        <div className="max-w-sm sm:max-w-lg md:max-w-2xl xl:max-w-4xl 2xl:max-w-7xl mx-auto px-4">

          {/* Band Story */}
          <Image
            src="/images/PWR_Edge_Full.webp"
            width="500"
            height="150"
            alt="POWEREDGE Logo"
            className="mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 rounded-lg sm:rounded-xl border shadow-lg shadow-red-700/40 border-red-700/40 w-auto h-auto max-w-[175px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px] 2xl:max-w-[500px]"
          />
          
          <div className="bg-gradient-to-br from-black/90 to-gray-900/90 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-lg border border-gray-600/30 rounded-2xl sm:rounded-3xl relative mb-8 sm:mb-10 md:mb-12">
            {/* Language Toggle Button */}
            <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 right-3 sm:right-6 md:right-8 lg:right-10">
              <LanguageToggle 
                isEnglish={isEnglish} 
                onToggle={() => setIsEnglish(!isEnglish)}
              />
            </div>
            
            <h3 className="text-2xl text-red-500 mb-2 lg:text-3xl sm:mb-4 md:mb-6">
              {isEnglish ? translations.en.beginnings.title : translations.fr.beginnings.title}
            </h3>
            <div className="space-y-4 text-gray-200 text-sm xl:text-lg leading-relaxed font-body">
              {(isEnglish ? translations.en.beginnings.content : translations.fr.beginnings.content).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Band Members */}
          <div className="bg-gradient-to-br from-black/90 to-gray-900/90 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-lg border border-gray-600/30 rounded-2xl sm:rounded-3xl relative mb-8 sm:mb-10 md:mb-12">
            {/* Language Toggle Button */}
            <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 right-3 sm:right-6 md:right-8 lg:right-10">
              <LanguageToggle 
                isEnglish={isEnglish} 
                onToggle={() => setIsEnglish(!isEnglish)}
              />
            </div>
            
            <h3 className="text-2xl text-red-500 mb-2 lg:text-3xl sm:mb-4 md:mb-6">
              {isEnglish ? translations.en.renaissance.title : translations.fr.renaissance.title}
            </h3>
            <div className="space-y-4 text-gray-200 text-sm xl:text-lg leading-relaxed font-body">
              {(isEnglish ? translations.en.renaissance.content : translations.fr.renaissance.content).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* The Members Section */}
          <div className="bg-gradient-to-br from-black/90 to-gray-900/90 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-lg border border-gray-600/30 rounded-2xl sm:rounded-3xl relative mb-8 sm:mb-10 md:mb-12">
            {/* Language Toggle Button */}
            <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 right-3 sm:right-6 md:right-8 lg:right-10">
              <LanguageToggle 
                isEnglish={isEnglish} 
                onToggle={() => setIsEnglish(!isEnglish)}
              />
            </div>
            
            <h3 className="text-2xl  xl:text-3xl text-red-500 text-start mb-4 sm:mb-6 md:mb-8">
              {isEnglish ? "Meet the Thunder" : "Rencontrez le Tonnerre"}
            </h3>
            
            <div className="flex flex-col space-y-4 md:gap-10 lg:gap-12">
              {/* Member 1 - Left */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-1 sm:gap-6">
                <div className="w-36 h-44 sm:w-44 sm:h-52 flex-shrink-0">
                  <Image
                    src="/images/members/PWR_Edge_alexgus.webp"
                    alt="Alexandre - Lead Guitarist"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-lg border border-red-500/40 border-2 shadow-md shadow-yellow-400/20"
                  />
                </div>
                <div className="text-center text-sm md:text-left">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400">
                    {isEnglish ? "Lead Guitar" : "Guitare Lead"}
                  </h4>
                  <h5 className="text-red-500 text-lg  md:text-2xl">Alexandre <Lightning /> Angus Young</h5>
                  <p className="text-gray-200 text-sm  xl:text-lg font-body leading-relaxed">
                    {isEnglish 
                      ? "Alex often says he didn't start playing guitar to play AC/DC, but to BE Angus Young. That's exactly what he does today: SG in hand, he recreates the energy, sound, and electrifying solos that made Angus a legend. On stage, between the duckwalk and devilish riffs, it's hard not to be fooled."
                      : "Alex dit souvent qu'il ne s'est pas mis à la guitare pour jouer du AC/DC, mais pour faire Angus Young. C'est exactement ce qu'il fait aujourd'hui : sa SG à la main, il recrée l'énergie, le son et les solos survoltés qui ont fait d'Angus une légende. Sur scène, entre le duckwalk et les riffs endiablés, difficile de ne pas s'y tromper."
                    }
                  </p>
                </div>
              </div>

              {/* Member 2 - Right */}
              <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-1 sm:gap-6">
                <div className="w-36 h-44 sm:w-44 sm:h-52 flex-shrink-0">
                  <Image
                    src="/images/members/PWR_Edge_Alexis.webp"
                    alt="Alexis - Lead Vocalist"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-lg border border-red-500/40 border-2 shadow-md shadow-yellow-400/20"
                  />
                </div>
                <div className="text-center text-sm md:text-right">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400">
                    {isEnglish ? "Lead Vocal" : "Chant"}
                  </h4>
                  <h5 className="text-red-500 text-lg sm:text-xl md:text-2xl">Alexis <Lightning/> Brian Johnson</h5>
                  <p className="text-gray-200 text-sm xl:text-lg font-body leading-relaxed">
                    {isEnglish 
                      ? "As Brian used to say: 'it's not just about singing loud, but giving everything to every note.' And that's exactly what Alexis delivers. Whether he's attacking a Bon Scott track or a Brian Johnson classic, he brings the same energy, never wavering. On stage, he sets the tone and takes everyone along with him."
                      : "Comme Brian aimait le dire : « il ne s'agit pas juste de chanter fort, mais de tout donner à chaque note. » Et c'est exactement ce que nous fait vivre Alexis. Qu'il attaque un titre de Bon Scott ou un classique de Brian Johnson, il balance la même énergie, sans jamais faiblir. Sur scène, c'est lui qui donne le ton et qui embarque tout le monde avec lui."
                    }
                  </p>
                </div>
              </div>

              {/* Member 3 - Left */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-1 sm:gap-6">
                <div className="w-36 h-44 sm:w-44 sm:h-52 p-2 flex-shrink-0">
                  <Image
                    src="/images/members/PWR_Edge_coco.webp"
                    alt="Corentin - Rhythm Guitarist"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-lg border border-red-500/40 border-2 shadow-md shadow-yellow-400/20"
                  />
                </div>
                <div className="text-center text-sm md:text-left">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400">
                    {isEnglish ? "Rhythm Guitar - Back Vocals" : "Guitare Rythmique - Choeurs"}
                  </h4>
                  <h5 className="text-red-500 text-lg sm:text-xl md:text-2xl">Corentin <Lightning/> Malcolm Young</h5>
                  <p className="text-gray-200 text-sm xl:text-lg font-body leading-relaxed">
                    {isEnglish 
                      ? "One day, we got a TikTok notification: 'Hey guys, if you're looking for someone to play Malcolm's role, I'm an AC/DC fan.' That was Corentin. A few riffs later, it was obvious: he had the sound, the feel, and especially Malcolm's relentless sense of rhythm. Today, he holds the rhythm guitar like it always belonged to him."
                      : "Un jour, on reçoit une notif TikTok : « Salut les gars, si jamais vous cherchez quelqu'un pour jouer le rôle de Malcolm, je suis fan d'AC/DC. » C'était Corentin. Quelques riffs plus tard, c'était évident : il avait le son, le feeling et surtout le sens du rythme implacable de Malcolm. Aujourd'hui, il tient la guitare rythmique comme si elle lui avait toujours appartenu."
                    }
                  </p>
                </div>
              </div>

              {/* Member 4 - Right */}
              <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-1 sm:gap-6">
                <div className="w-36 h-44 sm:w-44 sm:h-52 p-2 flex-shrink-0">
                  <Image
                    src="/images/members/PWR_Edge_Antho.webp"
                    alt="Anthony - Bass Guitarist"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-lg border border-red-500/40 border-2 shadow-md shadow-yellow-400/20"
                  />
                </div>
                <div className="text-center text-sm md:text-right">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400">
                    {isEnglish ? "Bass Guitar - Back Vocals" : "Basse - Choeurs"}
                  </h4>
                  <h5 className="text-red-500 text-lg sm:text-xl md:text-2xl">Anthony <Lightning /> Cliff Williams</h5>
                  <p className="text-gray-200 text-sm  xl:text-lg font-body leading-relaxed">
                    {isEnglish 
                      ? "It all started the day of Alexis's audition. Antho, invited by his friend Alex, thought he was just going to watch... but he left as a band member. When offered to take up bass, he didn't hesitate long: being a huge AC/DC fan, he wanted to be part of the adventure. Since then, he embodies Cliff Williams with seriousness and consistency, staying true to Cliff's own motto: 'keep it simple and solid.'"
                      : "Tout a commencé le jour de l'audition d'Alexis. Antho, invité par son ami Alex, pensait juste assister… mais il est reparti membre du groupe. Quand on lui a proposé de prendre la basse, il n'a pas hésité longtemps : fan absolu d'AC/DC, il voulait faire partie de l'aventure. Depuis, il incarne Cliff Williams avec sérieux et régularité, fidèle à la devise de Cliff lui-même : « keep it simple and solid. »"
                    }
                  </p>
                </div>
              </div>

              {/* Member 5 - Left */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-1 sm:gap-6">
                <div className="w-36 h-44 sm:w-44 sm:h-52 p-2 flex-shrink-0">
                  <Image
                    src="/images/members/PWR_Edge_Antoine.webp"
                    alt="Antoine - Drummer"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-lg border border-red-500/40 border-2 shadow-md shadow-yellow-400/20"
                  />
                </div>
                <div className="text-center text-sm md:text-left">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400">
                    {isEnglish ? "Drums" : "Batterie"}
                  </h4>
                  <h5 className="text-red-500 text-lg sm:text-xl md:text-2xl">Antoine <Lightning /> Phil Rudd</h5>
                  <p className="text-gray-200 text-sm  xl:text-lg font-body leading-relaxed">
                    {isEnglish 
                      ? "Phil Rudd always said: 'I don't play drums to shine, I play to make the band move like a train.' That's exactly Antoine's spirit. His dry and steady playing is PowerEdge's engine, just like Rudd was for AC/DC throughout his career. And when more power is needed, Antoine adopts Chris Slade's massive strike, like during the legendary Donington concert in 1991. With him behind the drums, the PowerEdge train never stops."
                      : "Phil Rudd a toujours dit : « Je ne joue pas de la batterie pour briller, je joue pour que le groupe avance comme un train. » C'est exactement l'esprit d'Antoine. Son jeu sec et régulier est le moteur de PowerEdge, comme Rudd l'a été pour AC/DC toute sa carrière. Et quand il faut plus de puissance, Antoine adopte la frappe massive de Chris Slade, comme lors du mythique concert de Donington en 1991. Avec lui derrière les fûts, le train PowerEdge ne s'arrête jamais."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-black/30 p-8 rounded-lg sm:rounded-xl md:rounded-2xl border border-white text-center backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 text-red-500">Ready to Rock<span className="font-body ml-1">?</span></h3>
            <p className="mb-6 text-gray-200 font-body">Step into the ultimate AC/DC live experience!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full transition-colors">
                View Upcoming Shows
              </Link>
            </div>
          </div>

        </div>
      </PageContent>
    </>
  )
}