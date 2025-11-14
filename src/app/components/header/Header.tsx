import BurgerMenu from "./BurgerMenu";
import NavBar from "./Navbar";
import "./styles.css"

export default function Header() {
  return (
    <header className="fixed flex flex-col w-full xl:w-3/4 xl:left-1/2 items-center xl:-translate-x-1/2 bg-white/40 shadow-md/10 xs:rounded-none xl:rounded-b-[100px] justify-center z-10 mobile-landscape-header">
      <BurgerMenu />
      <div className="">
        <NavBar />
      </div>
    </header>
  )
}