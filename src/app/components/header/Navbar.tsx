import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {

 return (
   <>
   <nav className="text-white">
    <div className='flex justify-center items-center h-full w-full  mobile-landscape-nav'>
     <div className='text-2xl xl:text-3xl'>
      <ul className='flex gap-10 hidden lg:flex mobile-landscape-nav-left'>
        <Link href="#">
          <li className='navbar-item extrude-left-text'>SHOWS</li>
        </Link>
        <span className='text-[#FF1493] mt-2'>|</span>
        <Link href="#">
          <li className='navbar-item extrude-left-text'>MEDIAS</li>
        </Link>
      </ul>
     </div>
       <div className="navbar-logo flex-shrink-0">
        <Link href="#">
         <Image
           src="/images/chili-monks-logo.png"
           width={300}
           height={157}
           alt="chili-monks-logo"
           className="w-auto h-auto max-w-[125px] sm:max-w-[200x] md:max-w-[200px] 2xl:max-w-[200px] mobile-landscape-logo"
           unoptimized
           />
        </Link>
       </div>
     <div className='text-2xl xl:text-3xl'>
      <ul className='flex hidden space-x-10 lg:flex mobile-landscape-nav-right'>
        <Link href="#">
          <li className='navbar-item extrude-right-text'>ABOUT</li>
        </Link>
        <span className='text-[#FF1493] mt-2'>|</span>
        <Link href="#">
          <li className='navbar-item extrude-right-text -ml-1'>CONTACT</li>
        </Link>
      </ul>
     </div>
    </div>
   </nav>
     </>
 )
}