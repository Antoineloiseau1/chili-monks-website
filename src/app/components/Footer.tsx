import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import Lightning from './Lightning'

export default function Footer() {
  return (
    <footer className="bg-red-500/95 border-t border-white text-white pt-2 mt-4">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1 mb-2">
            <h3 className="text-xl text-yellow-300 ">FOLLOW US</h3>
            <div className="flex space-x-1 justify-center lg:justify-start">
              <Link href="https://www.instagram.com/acdcbypoweredge/" className="hover:text-red-500 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://www.facebook.com/ACDCByPoweredge" className="hover:text-red-500 transition-colors">
                <FaFacebook size={20} />
              </Link>
              <Link href="https://www.youtube.com/@ACDCByPoweredge" className="hover:text-red-500 transition-colors">
                <FaYoutube size={20} />
              </Link>
              <Link href="https://www.tiktok.com/@acdcbypoweredge" className="hover:text-red-500 transition-colors">
                <FaTiktok size={20} />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          {/* <div className="flex flex-col items-center lg:items-end lg:flex-1">
            <h4 className="text-xl text-yellow-300">Get In Touch</h4>
            <Link href="/contact" className=" text-sm bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition-colors">
              Contact Us
            </Link>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 text-center text-xs text-gray-400 mb-3">
          <p className='mt-3'><span className='font-body'></span>Copyright 2025 POWER<Lightning />EDGE - <span className='font-body'>&copy; </span>Aseca prod</p>
        </div>
      </div>
    </footer>
  )
}