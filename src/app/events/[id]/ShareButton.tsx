"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { FiShare2 } from "react-icons/fi"
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa"

interface ShareButtonProps {
  eventName: string
  eventDate: string
}

export default function ShareButton({ eventName, eventDate }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out ${eventName} with PWR⚡EDGE - ${eventDate}`

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank')
        break
    }
    setShowShareMenu(false)
  }

  const toggleMenu = () => {
    if (!showShareMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 192 // 192px = w-48
      })
    }
    setShowShareMenu(!showShareMenu)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isClickOnButton = buttonRef.current && buttonRef.current.contains(target)
      const isClickOnMenu = document.querySelector('.share-menu')?.contains(target)
      
      if (!isClickOnButton && !isClickOnMenu) {
        setShowShareMenu(false)
      }
    }

    if (showShareMenu) {
      // Add slight delay to prevent immediate closing
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showShareMenu])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
      >
        <FiShare2 className="text-yellow-400" />
      </button>
      {showShareMenu && typeof window !== 'undefined' && createPortal(
        <div 
          className="share-menu fixed bg-black/90 border border-white/20 rounded-lg py-2 w-48 z-[9999]"
          style={{ 
            top: `${menuPosition.top}px`, 
            left: `${menuPosition.left}px` 
          }}
        >
          <button
            onClick={() => handleShare('facebook')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-white"
          >
            <FaFacebook className="text-blue-500" />
            Facebook
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-white"
          >
            <FaTwitter className="text-blue-400" />
            Twitter
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-white"
          >
            <FaWhatsapp className="text-green-500" />
            WhatsApp
          </button>
        </div>,
        document.body
      )}
    </>
  )
}