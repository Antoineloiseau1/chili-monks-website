"use client"

import Link from 'next/link'
import { FaFacebook, FaYoutube } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri";
import { useLanguage } from '@/context'
import { t } from '../data/translations'

export default function Footer() {
  const { language } = useLanguage()
  const tr = t.footer[language]
  return (
    <footer className="bg-[#e8e9e5] shadow-md/10 xl:translate-x-1/16 pt-2 mt-4 xl:w-7/8 xl:rounded-t-[50px]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Footer Content */}
        <div className="flex flex-col items-center">

          {/* Brand Section */}
          <div className="flex flex-col items-center lg:flex-1 mb-2">
            <h3 className="text-xl font-medium" style={{ fontFamily: 'var(--font-anybody)', fontStretch: '110%' }}>{tr.followUs}</h3>
            <div className="flex justify-center gap-1">
              <Link href="https://www.instagram.com/acdcbypoweredge/" className="text-[#344d97] transition-transform duration-200 ease-out hover:scale-115">
                <RiInstagramFill size={20} />
              </Link>
              <Link href="https://www.facebook.com/ACDCByPoweredge" className="text-[#344d97] transition-transform duration-200 ease-out hover:scale-115">
                <FaFacebook size={20} />
              </Link>
              <Link href="https://www.youtube.com/@ChiliMonksTributeBand" className="text-[#344d97] transition-transform duration-200 ease-out hover:scale-115">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FF1493] text-center text-xs text-gray-400 mb-3">
          <p className='mt-3'><span className=''></span>&copy; 2026 Chili Monks</p>
        </div>
      </div>
    </footer>
  )
}
