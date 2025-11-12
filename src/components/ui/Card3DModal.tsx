"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Card3DModalProps {
  imageSrc: string
  alt: string
  onClose: () => void
  images?: string[]
  currentIndex?: number
  onNavigate?: (index: number) => void
}

export const Card3DModal = ({ imageSrc, alt, onClose, images = [], currentIndex = 0, onNavigate }: Card3DModalProps) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!cardRef.current || !isInteracting) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    // Increased sensitivity for more dramatic effect but limit rotation
    const rotateY = Math.max(-45, Math.min(45, (mouseX / rect.width) * 30))
    const rotateX = Math.max(-45, Math.min(45, -(mouseY / rect.height) * 30))

    setTransform({ rotateX, rotateY })
  }, [isInteracting])

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current || !isInteracting) return
    e.preventDefault()

    const touch = e.touches[0]
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const touchX = touch.clientX - centerX
    const touchY = touch.clientY - centerY

    // Increased sensitivity for mobile touch (60 vs 30 for mouse)
    const rotateY = Math.max(-45, Math.min(45, (touchX / rect.width) * 60))
    const rotateX = Math.max(-45, Math.min(45, -(touchY / rect.height) * 60))

    setTransform({ rotateX, rotateY })
  }

  const handleInteractionStart = () => {
    setIsInteracting(true)
  }

  const handleInteractionEnd = () => {
    setIsInteracting(false)
    // Smooth return to center position
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && onNavigate) {
      onNavigate(currentIndex - 1)
    }
  }, [currentIndex, onNavigate])

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1 && onNavigate) {
      onNavigate(currentIndex + 1)
    }
  }, [currentIndex, images.length, onNavigate])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft') {
      handlePrevious()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    }
  }, [onClose, handlePrevious, handleNext])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isInteracting) {
        handleMouseMove(e)
      }
    }

    const handleGlobalMouseUp = () => {
      if (isInteracting) {
        handleInteractionEnd()
      }
    }

    // Prevent page scrolling when modal is open
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      // Restore page scrolling when modal closes
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isInteracting, handleKeyDown, handleMouseMove])

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center md:items-start md:pt-20 justify-center bg-black/90 backdrop-blur-md"
      style={{ perspective: '1000px' }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
      >
        <FiX size={24} />
      </button>

      {/* Navigation arrows for desktop */}
      {images.length > 1 && onNavigate && (
        <>
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-200 ${
              currentIndex === 0 
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 hover:bg-white/30 text-white hover:scale-110'
            }`}
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-200 ${
              currentIndex === images.length - 1 
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 hover:bg-white/30 text-white hover:scale-110'
            }`}
          >
            <FiChevronRight size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}

      {/* 3D Card Container */}
      <div
        ref={cardRef}
        className="relative cursor-grab active:cursor-grabbing w-full max-w-[280px] md:max-w-sm lg:max-w-sm mx-auto"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isInteracting ? 'none' : 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          maxHeight: '60vh',
        }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        onClick={handleClick}
      >
        {/* Card Front */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            border: '6px solid #d4af37',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 ${Math.abs(transform.rotateX) * 2}px ${Math.abs(transform.rotateX) * 4}px rgba(0, 0, 0, 0.3),
              ${transform.rotateY * 2}px 0 ${Math.abs(transform.rotateY) * 2}px rgba(0, 0, 0, 0.2),
              inset 0 0 0 2px #f4d03f,
              0 0 20px rgba(212, 175, 55, 0.3)
            `,
          }}
        >
          {/* Card border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 rounded-2xl pointer-events-none z-10" />
          
          {/* Enhanced shine effect based on rotation */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
            style={{
              background: `linear-gradient(
                ${90 + transform.rotateY * 2}deg,
                transparent 20%,
                rgba(255, 255, 255, ${Math.abs(transform.rotateY) * 0.02 + 0.1}) 35%,
                rgba(255, 255, 255, ${Math.abs(transform.rotateY) * 0.03 + 0.15}) 50%,
                rgba(255, 255, 255, ${Math.abs(transform.rotateY) * 0.02 + 0.1}) 65%,
                transparent 80%
              )`,
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Secondary shine layer for more depth */}
          <div 
            className="absolute inset-1 pointer-events-none z-21 rounded-2xl"
            style={{
              background: `linear-gradient(
                ${45 + transform.rotateX * 1.5}deg,
                transparent 40%,
                rgba(255, 255, 255, ${Math.abs(transform.rotateX) * 0.015}) 50%,
                transparent 60%
              )`,
              mixBlendMode: 'soft-light',
            }}
          />
          
          {/* Holographic effect */}
          <div 
            className="absolute inset-3 pointer-events-none z-22 rounded-xl"
            style={{
              background: `conic-gradient(
                from ${transform.rotateY * 3}deg,
                transparent 0deg,
                rgba(255, 215, 0, ${Math.abs(transform.rotateY) * 0.008}) 90deg,
                rgba(255, 165, 0, ${Math.abs(transform.rotateY) * 0.008}) 180deg,
                rgba(255, 140, 0, ${Math.abs(transform.rotateY) * 0.008}) 270deg,
                transparent 360deg
              )`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Logo in top left corner - black circle */}
          <div className="absolute top-2 left-2 z-30 w-10 h-10 bg-black rounded-full flex items-center justify-center opacity-100 shadow-lg">
            <Image
              src="/images/icon.png"
              alt="PWR⚡EDGE"
              width={28}
              height={14}
              className="object-contain"
              unoptimized
            />
          </div>
          
          {/* Image */}
          <Image
            src={imageSrc}
            alt={alt}
            width={250}
            height={180}
            className="w-full h-auto max-w-full max-h-full object-contain rounded-2xl"
            style={{
              filter: `
                brightness(${1 + Math.abs(transform.rotateY) * 0.005})
                contrast(${1 + Math.abs(transform.rotateX) * 0.005})
              `,
            }}
            unoptimized
            draggable={false}
          />
          
          {/* Reflection effect on the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
            style={{
              background: `linear-gradient(
                to top,
                rgba(255, 255, 255, ${Math.abs(transform.rotateX) * 0.005}) 0%,
                transparent 100%
              )`,
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
            }}
          />
        </div>

      </div>

      {/* Background gradient that responds to card rotation */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at ${50 + transform.rotateY}% ${50 + transform.rotateX}%,
            rgba(139, 69, 19, 0.1) 0%,
            rgba(0, 0, 0, 0.8) 70%
          )`,
        }}
      />
    </div>
  )
}