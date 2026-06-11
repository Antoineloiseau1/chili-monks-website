"use client"

import { useEffect, useState } from 'react'

interface EnhancedNeonLogoProps {
  className?: string
}

export const EnhancedNeonLogo = ({ className = '' }: EnhancedNeonLogoProps) => {
  const [flickerState, setFlickerState] = useState({
    E1: true,
    D: true, 
    G: true,
    E2: true
  })

  const [sparkPositions, setSparkPositions] = useState<Array<{id: number, x: number, y: number, type: string}>>([])

  useEffect(() => {
    // Main flicker effect
    const flickerInterval = setInterval(() => {
      setFlickerState(prev => ({
        ...prev,
        E1: Math.random() > 0.3,
        D: Math.random() > 0.1, 
        G: Math.random() > 0.2,
        E2: Math.random() > 0.5 // Most problematic letter
      }))
    }, 120)

    // Spark generation
    const sparkInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newSpark = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: ['✨', '⚡', '✦', '💥'][Math.floor(Math.random() * 4)]
        }
        
        setSparkPositions(prev => [...prev.slice(-5), newSpark]) // Keep only last 6 sparks
      }
    }, 200)

    return () => {
      clearInterval(flickerInterval)
      clearInterval(sparkInterval)
    }
  }, [])

  // Clean up old sparks
  useEffect(() => {
    const cleanup = setTimeout(() => {
      setSparkPositions(prev => prev.slice(-3))
    }, 1000)
    
    return () => clearTimeout(cleanup)
  }, [sparkPositions])

  return (
    <div className={`relative inline-block ${className}`}>
      <style jsx>{`
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes electricSpark {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 2px currentColor) 
                   drop-shadow(0 0 4px currentColor) 
                   drop-shadow(0 0 8px currentColor);
        }
        
        .broken-neon {
          filter: drop-shadow(0 0 1px currentColor) brightness(0.7);
          animation: neonFlicker 0.1s infinite alternate;
        }
        
        .spark {
          animation: electricSpark 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* CHILI text - stable neon */}
      <div className="text-center mb-2">
        <span className="text-yellow-400 text-3xl font-bold tracking-wider neon-glow bg-gradient-to-b from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          CHILI
        </span>
      </div>
      
      {/* Lightning bolt divider */}
      <div className="text-center mb-2">
        <span className="text-yellow-400 text-2xl neon-glow animate-pulse">⚡</span>
      </div>
      
      {/* MONKS text - broken neon effect */}
      <div className="relative text-center">
        <div className="flex justify-center space-x-2 text-3xl font-bold tracking-wider">
          {/* E - first letter */}
          <span 
            className={`transition-all duration-75 relative ${
              flickerState.E1 
                ? 'text-red-500 neon-glow' 
                : 'text-red-800 broken-neon'
            }`}
          >
            E
            {!flickerState.E1 && Math.random() > 0.7 && (
              <span className="absolute -top-2 -right-1 text-yellow-300 text-sm spark">⚡</span>
            )}
          </span>
          
          {/* D */}
          <span 
            className={`transition-all duration-75 relative ${
              flickerState.D 
                ? 'text-red-500 neon-glow' 
                : 'text-red-800 broken-neon'
            }`}
          >
            D
            {!flickerState.D && Math.random() > 0.8 && (
              <span className="absolute -bottom-2 left-0 text-orange-400 text-sm spark">✨</span>
            )}
          </span>
          
          {/* G */}
          <span 
            className={`transition-all duration-75 relative ${
              flickerState.G 
                ? 'text-red-500 neon-glow' 
                : 'text-red-800 broken-neon'
            }`}
          >
            G
            {!flickerState.G && Math.random() > 0.6 && (
              <span className="absolute top-0 -left-2 text-yellow-400 text-sm spark">✦</span>
            )}
          </span>
          
          {/* E - last letter (most broken) */}
          <span 
            className={`transition-all duration-50 relative ${
              flickerState.E2 
                ? 'text-red-500 neon-glow' 
                : 'text-red-800 broken-neon'
            }`}
          >
            E
            {/* More frequent sparks on the most broken letter */}
            {!flickerState.E2 && (
              <>
                <span className="absolute -top-3 -right-2 text-yellow-300 text-sm spark">⚡</span>
                <span className="absolute -bottom-3 left-1 text-orange-400 text-sm spark">💥</span>
                <span className="absolute top-1 -left-3 text-yellow-400 text-sm spark">✨</span>
              </>
            )}
            {flickerState.E2 && Math.random() > 0.9 && (
              <span className="absolute -right-1 top-1 text-blue-300 text-xs spark">⚡</span>
            )}
          </span>
        </div>
        
        {/* Dynamic spark effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sparkPositions.map((spark) => (
            <span
              key={spark.id}
              className={`absolute text-sm spark`}
              style={{
                left: `${spark.x}%`,
                top: `${spark.y}%`,
                color: ['#fbbf24', '#f97316', '#ef4444', '#3b82f6'][Math.floor(Math.random() * 4)]
              }}
            >
              {spark.type}
            </span>
          ))}
        </div>
        
        {/* Electrical discharge lines */}
        {!flickerState.E2 && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <path
                d={`M${20 + Math.random() * 60},${10 + Math.random() * 30} L${30 + Math.random() * 40},${20 + Math.random() * 20}`}
                stroke="#fbbf24"
                strokeWidth="0.5"
                fill="none"
                opacity="0.8"
                className="animate-pulse"
              />
              <path
                d={`M${40 + Math.random() * 20},${15 + Math.random() * 20} L${60 + Math.random() * 20},${25 + Math.random() * 15}`}
                stroke="#f97316"
                strokeWidth="0.3"
                fill="none"
                opacity="0.6"
                className="animate-ping"
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Electrical humming effect indicator */}
      {(!flickerState.E2 || !flickerState.G) && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-gray-500 animate-pulse opacity-60">
            ~ bzzt ~ crackle ~
          </div>
        </div>
      )}
    </div>
  )
}