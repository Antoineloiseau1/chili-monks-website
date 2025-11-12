"use client"

import { useState, useEffect, useRef } from 'react'
import { UI_CONSTANTS } from '@/config'

interface UseCarouselProps {
  itemCount: number
  autoScroll?: boolean
}

export const useCarousel = ({ autoScroll = true }: UseCarouselProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 })
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  // Auto-scroll animation
  useEffect(() => {
    if (!autoScroll || isAnimationPaused) return

    const animate = () => {
      if (!carouselRef.current || isAnimationPaused) return
      
      const carousel = carouselRef.current
      carousel.scrollLeft += 1 // Simple 1px scroll per frame
      
      // Reset when reaching the end
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = 0
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [autoScroll, isAnimationPaused])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      setIsDragging(true)
      setIsAnimationPaused(true)
      setDragStart({
        x: e.pageX - carouselRef.current.offsetLeft,
        scrollLeft: carouselRef.current.scrollLeft,
      })
      carouselRef.current.style.cursor = 'grabbing'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - dragStart.x) * 2
    carouselRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
    setTimeout(() => setIsAnimationPaused(false), UI_CONSTANTS.CAROUSEL.ANIMATION_RESUME_DELAY)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
    setTimeout(() => setIsAnimationPaused(false), UI_CONSTANTS.CAROUSEL.ANIMATION_RESUME_DELAY)
  }

  return {
    carouselRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  }
}