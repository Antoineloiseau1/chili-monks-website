import { mediaUrl } from '@/lib/media'

/**
 * Full-screen background video, fixed behind all content (-z-10).
 * Muted + loop so browsers allow autoplay; the CSS gradient on <body>
 * stays visible while the video loads (and as fallback).
 */
export default function BackgroundVideo() {
  return (
    <video
      src={mediaUrl('/teaser.mov')}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden="true"
      className="fixed inset-0 -z-10 w-full h-full object-cover pointer-events-none"
    />
  )
}
