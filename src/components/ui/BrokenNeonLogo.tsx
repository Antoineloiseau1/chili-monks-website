"use client"

import { useEffect, useState } from 'react'

interface BrokenNeonLogoProps {
  className?: string
}

export const BrokenNeonLogo = ({ className = '' }: BrokenNeonLogoProps) => {
  const [flickerState, setFlickerState] = useState({
    E1: true,
    D: true,
    G: true,
    E2: true
  })

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlickerState(prev => ({
        ...prev,
        E1: Math.random() > 0.3, // 70% chance to be on
        D: Math.random() > 0.1,  // 90% chance to be on
        G: Math.random() > 0.2,  // 80% chance to be on
        E2: Math.random() > 0.4  // 60% chance to be on (most broken)
      }))
    }, 150)

    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <div className={`relative inline-block ${className}`}>
      {/* CHILI text - stable */}
      <div className="text-center mb-1">
        <span className="text-yellow-400 text-2xl font-bold tracking-wider bg-gradient-to-b from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          CHILI
        </span>
      </div>
      
      {/* Lightning bolt divider */}
      <div className="text-center mb-1">
        <span className="text-yellow-400 text-xl">⚡</span>
      </div>
      
      {/* MONKS text - broken neon effect */}
      <div className="relative text-center">
        <div className="flex justify-center space-x-1 text-2xl font-bold tracking-wider">
          {/* E - first letter */}
          <span 
            className={`transition-all duration-100 ${
              flickerState.E1 
                ? 'text-red-500 drop-shadow-[0_0_8px_#ef4444] text-shadow-red-500' 
                : 'text-red-900 opacity-50'
            }`}
            style={{
              textShadow: flickerState.E1 ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' : 'none'
            }}
          >
            E
          </span>
          
          {/* D */}
          <span 
            className={`transition-all duration-100 ${
              flickerState.D 
                ? 'text-red-500 drop-shadow-[0_0_8px_#ef4444]' 
                : 'text-red-900 opacity-50'
            }`}
            style={{
              textShadow: flickerState.D ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' : 'none'
            }}
          >
            D
          </span>
          
          {/* G */}
          <span 
            className={`transition-all duration-100 ${
              flickerState.G 
                ? 'text-red-500 drop-shadow-[0_0_8px_#ef4444]' 
                : 'text-red-900 opacity-50'
            }`}
            style={{
              textShadow: flickerState.G ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' : 'none'
            }}
          >
            G
          </span>
          
          {/* E - last letter (most broken) */}
          <span 
            className={`transition-all duration-100 relative ${
              flickerState.E2 
                ? 'text-red-500 drop-shadow-[0_0_8px_#ef4444]' 
                : 'text-red-900 opacity-50'
            }`}
            style={{
              textShadow: flickerState.E2 ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' : 'none'
            }}
          >
            E
            {/* Sparks for the most broken letter */}
            {!flickerState.E2 && (
              <>
                <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✨</span>
                <span className="absolute -bottom-1 left-0 text-yellow-400 text-xs animate-ping">⚡</span>
                <span className="absolute top-1 -left-2 text-orange-400 text-xs animate-bounce">✦</span>
              </>
            )}
          </span>
        </div>
        
        {/* Additional spark effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Random sparks around the letters */}
          <span 
            className={`absolute top-0 left-1/4 text-yellow-300 text-xs transition-opacity duration-100 ${
              Math.random() > 0.7 ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
          >
            ✨
          </span>
          <span 
            className={`absolute bottom-0 right-1/4 text-orange-400 text-xs transition-opacity duration-150 ${
              Math.random() > 0.8 ? 'opacity-100 animate-ping' : 'opacity-0'
            }`}
          >
            ⚡
          </span>
          <span 
            className={`absolute top-1/2 left-0 text-yellow-400 text-xs transition-opacity duration-200 ${
              Math.random() > 0.6 ? 'opacity-100 animate-bounce' : 'opacity-0'
            }`}
          >
            ✦
          </span>
          <span 
            className={`absolute top-1/2 right-0 text-red-400 text-xs transition-opacity duration-100 ${
              Math.random() > 0.75 ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
          >
            💥
          </span>
        </div>
      </div>
      
      {/* Buzzing sound effect indicator (visual) */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div 
          className={`text-xs text-gray-400 transition-opacity duration-100 ${
            !flickerState.E2 ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        >
          ⚡ BZZT ⚡
        </div>
      </div>
    </div>
  )
}