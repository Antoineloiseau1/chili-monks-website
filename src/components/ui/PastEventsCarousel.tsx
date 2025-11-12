"use client"

import Image from 'next/image'
import { CombinedPastEvent } from '@/types'
import { useCarousel } from '@/hooks'

interface PastEventsCarouselProps {
  events: CombinedPastEvent[]
  onImageClick: (imageSrc: string, imageList: string[]) => void
}

export const PastEventsCarousel = ({ events, onImageClick }: PastEventsCarouselProps) => {
  // Create infinite loop by repeating events multiple times
  const infiniteEvents = [...events, ...events, ...events, ...events]
  const imageList = events.map(event => event.image)
  
  const { 
    carouselRef, 
    isDragging, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    handleMouseLeave 
  } = useCarousel({ itemCount: infiniteEvents.length })

  return (
    <div className="mt-5 w-full max-w-[87.5%] lg:max-w-[100%] mx-auto">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-5 px-4 py-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          cursor: 'grab',
          scrollBehavior: 'auto'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {infiniteEvents.map((event, index) => (
          <div
            key={`infinite-${index}`}
            className="flex-shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
            onClick={() => !isDragging && onImageClick(event.image, imageList)}
          >
            <div className="w-45 h-30 lg:w-52 lg:h-36 xl:w-60 xl:h-40 relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={event.image}
                fill
                alt={event.name || `Past Event ${event.date.toLocaleDateString('fr-FR')}`}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                sizes="320px"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}