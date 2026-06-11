"use client"
import { FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    const newMenuState = !menuOpen
    setMenuOpen(newMenuState)
    
    if (newMenuState) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
    document.body.classList.remove('no-scroll')
  }

  return(
    <>
  <button type="button" onClick={handleMenuOpen} className='cursor-pointer m-5 hover:bg-[#344d97] hover:text-white lg:hidden border border-2 rounded-md top-0 right-0 absolute border-[#344d97] text-[#344d97] z-50'>
    {
      menuOpen ? (
        <FaTimes className="m-2" size={20}/>
      ) : (
        <FaBars className="m-2" size={20}/>
      )
    }
  </button>
  <div className={
    menuOpen ? "fixed flex flex-col top-0 lg:hidden transition-all duration-150 w-full h-full backdrop-blur-md ease-in z-40" : "fixed top-0 left-[-100%] z-40"
  }>
    <div className="flex flex-col text-center text-2xl w-full h-full relative">
      {/* Top menu items - spaced between themselves */}
      <div className="flex flex-col justify-evenly items-center h-2/5 pt-8">
        <Link href="/news" onClick={handleLinkClick}>
          <div className='navbar-item extrude-right-text sm:text-4xl'>NEWS</div>
        </Link>
        <Link href="/events" onClick={handleLinkClick}>
          <div className='navbar-item extrude-right-text sm:text-4xl'>SHOWS</div>
        </Link>
      </div>

      {/* Center logo - absolutely positioned in the middle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6">
        <div className="navbar-logo">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/images/chili-monks-logo.png"
              width="220"
              height="75"
              alt="chili-monks-logo"

              className="h-auto w-auto max-w-[220px]"
            />
          </Link>
        </div>
      </div>

      {/* Bottom menu items - spaced between themselves */}
      <div className="flex flex-col justify-evenly items-center h-3/6 pb-8 absolute bottom-0 w-full">
        <Link href="/about" onClick={handleLinkClick}>
          <div className='navbar-item extrude-right-text sm:text-4xl'>ABOUT</div>
        </Link>
        <Link href="/contact" onClick={handleLinkClick}>
          <div className='navbar-item  extrude-right-text sm:text-4xl'>CONTACT</div>
        </Link>
      </div>
    </div>
  </div>
    </>
  )
}