"use client"
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface PhotoCarouselProps {
  photos: string[]
  autoPlayInterval?: number
  className?: string
}

export default function PhotoCarousel({
  photos,
  autoPlayInterval = 4000,
  className = ""
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextPhoto = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1

      if (nextIndex >= photos.length) {
        // Reset to beginning immediately
        setTimeout(() => setIsTransitioning(false), 600)
        return 0
      }

      setTimeout(() => setIsTransitioning(false), 600)
      return nextIndex
    })
  }, [photos.length, isTransitioning])

  const prevPhoto = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      setTimeout(() => setIsTransitioning(false), 600)
      return newIndex
    })
  }, [photos.length, isTransitioning])

  const goToPhoto = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [currentIndex, isTransitioning])

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextPhoto()
    } else if (isRightSwipe) {
      prevPhoto()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  useEffect(() => {
    if (photos.length <= 1) return

    const interval = setInterval(nextPhoto, autoPlayInterval)
    return () => clearInterval(interval)
  }, [photos.length, autoPlayInterval, nextPhoto])

  if (photos.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-900/50 rounded-lg ${className}`}>
        <p className="text-gray-400">No photos available</p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className} group`}>
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => {
          const isLandscape = photo.includes('DSC03429');

          return (
            <div key={index} className="min-w-full relative flex items-center justify-center min-h-[400px]">
              <div className={`relative ${
                isLandscape
                  ? 'w-full max-w-4xl h-[60vh]'
                  : 'w-80 h-[70vh] max-h-[600px]'
              } overflow-hidden rounded-xl shadow-lg`}>
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority={index <= 2}
                  loading={index <= 2 ? 'eager' : 'lazy'}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Desktop) */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-md -skew-x-12 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center z-10 cursor-pointer ${
              isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
            }`}
            aria-label="Previous photo"
          >
            <FaChevronLeft className="text-lg skew-x-12" />
          </button>
          <button
            onClick={nextPhoto}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-md -skew-x-12 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center z-10 cursor-pointer ${
              isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
            }`}
            aria-label="Next photo"
          >
            <FaChevronRight className="text-lg skew-x-12" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPhoto(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              } ${isTransitioning ? 'pointer-events-none' : ''}`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}