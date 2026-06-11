import BurgerMenu from "./BurgerMenu";
import NavBar from "./Navbar";
import HeaderLanguageToggle from "./HeaderLanguageToggle";
import DesktopLanguageToggle from "./DesktopLanguageToggle";
import SocialMediaBar from "./SocialMediaBar";
import "./styles.css"

export default function Header() {
  return (
    <>
      <header className="header fixed flex flex-col w-full xl:w-3/4 xl:left-1/2 items-center xl:-translate-x-1/2 shadow-md/10 xs:rounded-none xl:rounded-b-[100px] justify-center z-10 mobile-landscape-header">
        <HeaderLanguageToggle />
        <BurgerMenu />
        <div className="flex w-full items-center gap-4 px-5">
          <div className="flex-1 hidden lg:flex justify-center">
            <SocialMediaBar />
          </div>
          <div className="flex-1 lg:flex-none flex justify-center">
            <NavBar />
          </div>
          <div className="flex-1 hidden lg:flex justify-center">
            <DesktopLanguageToggle />
          </div>
        </div>
      </header>
    </>
  )
}
