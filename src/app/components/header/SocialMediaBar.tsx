import Link from "next/link"
import { FaFacebook, FaInstagram, FaYoutube, FaYoutubeSquare} from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";

export default function SocialMediaBar() {
  return (
    <div className="-ml-5 xl:ml-15 mt-1 w-full text-white">
      <div className="flex gap-1 items-center hidden md:flex mobile-landscape-social">
        <Link href="https://www.instagram.com/acdcbypoweredge/" className="social-link">
          <FaInstagram className="social-icon social-icon-filled" size={30} />
          <RiInstagramFill className="social-icon social-icon-outline"size={30}/>
        </Link>
        <Link href="https://www.facebook.com/ACDCByPoweredge" className="social-link">
          <FaFacebook className="social-icon social-icon-filled" size={30} />
          <CiFacebook className="social-icon social-icon-outline" size={30}/>
        </Link>
        <Link href="https://www.youtube.com/@ACDCByPoweredge" className="social-link">
          <FaYoutube className="social-icon social-icon-filled" size={30}/>
          <FaYoutubeSquare className="social-icon social-icon-outline" size={30}/>
        </Link>
      </div>
    </div>
  )
}