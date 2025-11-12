import { Video } from '@/types'
import { getYouTubeEmbedUrl } from '@/utils'

interface VideoEmbedProps {
  video: Video
  className?: string
}

export const VideoEmbed = ({ video, className = "" }: VideoEmbedProps) => {
  try {
    const embedUrl = getYouTubeEmbedUrl(video.url)
    
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm ${className}`}>
        <iframe
          src={embedUrl}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  } catch {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden bg-red-500/20 backdrop-blur-sm flex items-center justify-center ${className}`}>
        <p className="text-white text-center p-4">
          Error loading video: {video.title}
        </p>
      </div>
    )
  }
}