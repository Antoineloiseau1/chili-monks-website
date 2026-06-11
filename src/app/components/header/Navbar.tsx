import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {

 return (
   <>
   <nav className="text-white">
    <div className='flex justify-center items-center gap-3 2xl:gap-6 h-full w-full mobile-landscape-nav'>
     <div className='text-2xl xl:text-3xl'>
      <ul className='flex gap-4 2xl:gap-10 hidden lg:flex mobile-landscape-nav-left'>
        <Link href="/news">
          <li className='navbar-item extrude-left-text'>NEWS</li>
        </Link>
        <span className='text-[#344d97] mt-2'>|</span>
        <Link href="/events">
          <li className='navbar-item extrude-left-text'>SHOWS</li>
        </Link>
      </ul>
     </div>
       <div className="navbar-logo flex-shrink-0">
        <Link href="/">
         <Image
           src="/images/chili-monks-logo.png"
           width={300}
           height={157}
           alt="chili-monks-logo"
           className="logo-anime w-auto h-auto max-w-[125px] lg:max-w-[140px] xl:max-w-[160px] 2xl:max-w-[200px] mobile-landscape-logo"

           />
        </Link>
       </div>
     <div className='text-2xl xl:text-3xl'>
      <ul className='flex hidden space-x-4 2xl:space-x-10 lg:flex mobile-landscape-nav-right'>
        <Link href="/about">
          <li className='navbar-item extrude-right-text'>ABOUT</li>
        </Link>
        <span className='text-[#344d97] mt-2'>|</span>
        <Link href="/contact">
          <li className='navbar-item extrude-right-text -ml-1'>CONTACT</li>
        </Link>
      </ul>
     </div>
    </div>
   </nav>
     </>
 )
}