import BurgerMenu from "./BurgerMenu";
import NavBar from "./Navbar";
import SocialMediaBar from "./SocialMediaBar";
import "./styles.css"

export default function Header() {
  return (
    <header className="fixed flex flex-col w-full items-center bg-white/95 justify-center z-10 mobile-landscape-header">
      <BurgerMenu />
      <div className="w-3/4">
        <div className="hidden lg:block">
          <SocialMediaBar />
        </div>
        <NavBar />
      </div>
    </header>
  )
}