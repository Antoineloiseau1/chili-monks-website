import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import Lightning from './Lightning'

export default function Footer() {
  return (
    <footer className="bg-white/30 shadow-md/10 xl:translate-x-1/16 pt-2 mt-4 xl:w-7/8 xl:rounded-t-[50px]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center center lg:items-start lg:flex-1 mb-2">
            <h3 className="text-xl font-avant-garde-condensed">FOLLOW US</h3>
            <div className="flex justify-center">
              <Link href="https://www.instagram.com/acdcbypoweredge/" className="hover:text-red-500 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://www.facebook.com/ACDCByPoweredge" className="hover:text-red-500 transition-colors">
                <FaFacebook size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FF1493] text-center text-xs text-gray-400 mb-3">
          <p className='mt-3'><span className=''></span>&copy; 2025 Chili Monks</p>
        </div>
      </div>
    </footer>
  )
}