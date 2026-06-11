import Link from "next/link"
import { FaFacebook, FaYoutube} from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri";

export default function SocialMediaBar() {
  return (
    <div className="text-white">
      <div className="flex gap-1 items-center">
        <Link href="https://www.instagram.com/chilimonks_tributeband/" className="social-link">
          <RiInstagramFill className="social-icon" size={30} />
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=61582356374397" className="social-link">
          <FaFacebook className="social-icon" size={30} />
        </Link>
        <Link href="https://www.youtube.com/@ChiliMonksTributeBand" className="social-link">
          <FaYoutube className="social-icon" size={30}/>
        </Link>
      </div>
    </div>
  )
}
