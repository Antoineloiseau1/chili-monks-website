'use client'

import { useRef, useState } from 'react'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

import { mediaUrl } from '@/lib/media'

interface FeaturedVideoProps {
  title?: string
  showTitle?: boolean
  className?: string
}

/**
 * Featured demo video: an optional title above a card that hugs an
 * autoplaying video served from the public R2 bucket (muted + loop so
 * autoplay is allowed by browsers). No controls — clicking the video toggles
 * the sound, with a volume/mute icon flashing in the top-right corner before
 * fading out.
 */
export default function FeaturedVideo({ title = 'Demo', showTitle = false, className = '' }: FeaturedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [muted, setMuted] = useState(true)
  const [showIcon, setShowIcon] = useState(false)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setMuted(nextMuted)

    setShowIcon(true)
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => setShowIcon(false), 1200)
  }

  return (
    <div className={className}>
      {/* Title above the card */}
      {showTitle && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-avant-garde leading-tight mb-4 text-center">
          {title}
        </h2>
      )}

      {/* Card adapted to the vertical video size */}
      <div
        className="video-inset relative -mt-15 md:mt-0 max-w-xl mx-auto rounded-lg overflow-hidden cursor-pointer"
        onClick={toggleSound}
      >
        <video
          ref={videoRef}
          src={mediaUrl('/teaser.mov')}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="block w-full h-auto pointer-events-none"
        />

        {/* Ombres internes au-dessus de la vidéo pour l'effet "creusé" */}
        <div className="video-inset-shadow absolute inset-0 rounded-lg pointer-events-none" aria-hidden="true" />

        {/* Volume feedback icon, top-right, fades out after a click */}
        <div
          className={`absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white transition-opacity duration-500 ${
            showIcon ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          {muted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
        </div>
      </div>
    </div>
  )
}
