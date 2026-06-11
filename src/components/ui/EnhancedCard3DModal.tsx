"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FiX, FiRotateCw } from 'react-icons/fi'

interface EnhancedCard3DModalProps {
  imageSrc: string
  alt: string
  onClose: () => void
}

export const EnhancedCard3DModal = ({ imageSrc, alt, onClose }: EnhancedCard3DModalProps) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, rotateZ: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)

  // Physics-based momentum
  const applyMomentum = useCallback(() => {
    if (isInteracting) return

    setTransform(prev => {
      const newRotateX = prev.rotateX + velocity.y
      const newRotateY = prev.rotateY + velocity.x
      
      // Apply friction
      setVelocity(v => ({
        x: v.x * 0.95,
        y: v.y * 0.95
      }))

      // Clamp rotation
      return {
        rotateX: Math.max(-45, Math.min(45, newRotateX)),
        rotateY: Math.max(-45, Math.min(45, newRotateY)),
        rotateZ: prev.rotateZ
      }
    })

    // Continue animation if there's still momentum
    if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
      animationRef.current = requestAnimationFrame(applyMomentum)
    }
  }, [velocity, isInteracting])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isInteracting) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate velocity for momentum
    const velocityX = (e.clientX - lastMousePos.current.x) * 0.5
    const velocityY = (e.clientY - lastMousePos.current.y) * 0.5
    setVelocity({ x: velocityX, y: velocityY })

    lastMousePos.current = { x: e.clientX, y: e.clientY }

    // More realistic rotation calculation
    const rotateY = (mouseX / rect.width) * 35
    const rotateX = -(mouseY / rect.height) * 35
    const rotateZ = (mouseX / rect.width) * 5 // Slight Z rotation for realism

    setTransform({ rotateX, rotateY, rotateZ })
  }

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

    // Increased sensitivity for mobile touch (70 vs 35 for mouse)
    const rotateY = (touchX / rect.width) * 70
    const rotateX = -(touchY / rect.height) * 70
    const rotateZ = (touchX / rect.width) * 10

    setTransform({ rotateX, rotateY, rotateZ })
  }

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsInteracting(true)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    lastMousePos.current = { x: clientX, y: clientY }
  }

  const handleInteractionEnd = () => {
    setIsInteracting(false)
    // Start momentum animation
    animationRef.current = requestAnimationFrame(applyMomentum)
  }

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const resetCard = () => {
    setTransform({ rotateX: 0, rotateY: 0, rotateZ: 0 })
    setVelocity({ x: 0, y: 0 })
    setIsFlipped(false)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'r' || e.key === 'R') {
      resetCard()
    } else if (e.key === ' ') {
      e.preventDefault()
      setIsFlipped(!isFlipped)
    }
  }, [onClose, isFlipped])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleKeyDown])

  // Calculate lighting based on rotation
  const lightingIntensity = Math.abs(transform.rotateY) / 45
  const shadowBlur = Math.abs(transform.rotateX) + Math.abs(transform.rotateY)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Controls */}
      <div className="absolute top-8 right-8 z-10 flex gap-3">
        <button
          onClick={resetCard}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
          title="Reset card position (R)"
        >
          <FiRotateCw size={20} />
        </button>
        <button
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
          title="Close (ESC)"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-8 left-8 z-10 text-white/70 text-sm max-w-xs">
        <p className="mb-1">🃏 <strong>Click & drag</strong> to examine in 3D</p>
        <p className="mb-1 md:block hidden">🔄 <strong>Double-click</strong> or press <kbd className="bg-white/20 px-1 rounded">Space</kbd> to flip</p>
        <p className="mb-1 md:hidden block">🔄 <strong>Double-tap</strong> to flip card</p>
        <p className="text-xs opacity-60 md:hidden">✨ Light touch movement for mobile interaction</p>
        <p className="text-xs hidden md:block">Press <kbd className="bg-white/20 px-1 rounded">R</kbd> to reset • <kbd className="bg-white/20 px-1 rounded">ESC</kbd> to close</p>
      </div>

      {/* 3D Card Container */}
      <div
        ref={cardRef}
        className={`relative ${isInteracting ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        style={{
          transform: `
            rotateX(${transform.rotateX}deg) 
            rotateY(${transform.rotateY + (isFlipped ? 180 : 0)}deg) 
            rotateZ(${transform.rotateZ}deg)
          `,
          transformStyle: 'preserve-3d',
          transition: isInteracting ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          maxWidth: '85vw',
          maxHeight: '85vh',
          filter: `drop-shadow(0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0, 0, 0, 0.4))`,
        }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        onDoubleClick={handleDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Front */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
            padding: '8px',
          }}
        >
          {/* Card border with metallic effect */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none z-10"
            style={{
              background: `linear-gradient(
                ${135 + transform.rotateY * 2}deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.3) 25%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(0, 0, 0, 0.2) 75%,
                rgba(0, 0, 0, 0.4) 100%
              )`,
            }}
          />
          
          {/* Dynamic shine effect */}
          <div 
            className="absolute inset-2 pointer-events-none z-20 rounded-2xl"
            style={{
              background: `linear-gradient(
                ${90 + transform.rotateY * 1.5}deg,
                transparent 20%,
                rgba(255, 255, 255, ${lightingIntensity * 0.3}) 50%,
                transparent 80%
              )`,
            }}
          />
          
          {/* Image container */}
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <Image
              src={imageSrc}
              alt={alt}
              width={800}
              height={600}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              style={{
                filter: `
                  brightness(${1 + lightingIntensity * 0.2})
                  contrast(${1 + Math.abs(transform.rotateX) * 0.01})
                  saturate(${1 + lightingIntensity * 0.1})
                `,
              }}

              draggable={false}
            />
            
            {/* Holographic edge effect */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `conic-gradient(
                  from ${transform.rotateY * 2}deg,
                  transparent 0deg,
                  rgba(255, 0, 255, ${lightingIntensity * 0.1}) 90deg,
                  rgba(0, 255, 255, ${lightingIntensity * 0.1}) 180deg,
                  rgba(255, 255, 0, ${lightingIntensity * 0.1}) 270deg,
                  transparent 360deg
                )`,
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        </div>

        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center"
          style={{
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(145deg, #2d1810, #1a0f08)',
            border: '8px solid #8b4513',
          }}
        >
          <div className="text-center text-white/80 p-8">
            <div className="text-8xl mb-6 filter drop-shadow-lg">🎴</div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Chili Monks
            </h3>
            <p className="text-lg mb-1">Event Memory</p>
            <p className="text-sm opacity-70">Collectible Card</p>
            
            {/* Decorative pattern */}
            <div className="absolute inset-4 border-2 border-yellow-600/30 rounded-2xl pointer-events-none">
              <div className="absolute inset-2 border border-yellow-500/20 rounded-xl">
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-500/40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-500/40"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-500/40"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-500/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic background that responds to card rotation */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `
            radial-gradient(
              ellipse at ${50 + transform.rotateY * 0.5}% ${50 + transform.rotateX * 0.5}%,
              rgba(139, 69, 19, ${lightingIntensity * 0.2}) 0%,
              rgba(0, 0, 0, 0.9) 70%
            )
          `,
        }}
      />
    </div>
  )
}