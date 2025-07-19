import { Link } from "react-router-dom"
import { Logo } from "../component-logo"
import { MdRestaurantMenu } from "react-icons/md"
import { BsTools } from "react-icons/bs"
import { UserMenu } from "../store-side/user-menu"
import { useState } from "react"

export const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-screen flex flex-col gap-2 py-8 md:flex-row md:px-9 items-center justify-center bg-white text-black shadow-md z-10">
            <Logo />
            <button
                className="sm:hidden flex flex-col justify-center items-center w-10 h-10 z-30"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Abrir menu"
            >
                <span
                    className={`block w-8 h-1 bg-black dark:bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                    className={`block w-8 h-1 bg-black dark:bg-white rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                    className={`block w-8 h-1 bg-black dark:bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
            </button>
            {localStorage.getItem('isLogged') == 'true' && (
                <>
                    <div className="relative">
                        <UserMenu
                            open={menuOpen}
                            fontSize={'text-sm'}
                        />
                    </div>
                </>
            )}
            <nav className="flex text-md md:-translate-x-[50px] md:text-lg  md:flex-1 md:justify-center">
                <ul className={`${menuOpen ? "" : "hidden sm:flex"} w-full max-w-[580px] md:w-[690px] text-lg flex flex-col sm:flex-row items-center justify-center mb-8 lg:mb-0 md:justify-around gap-2 sm:gap-4 sm:mt-12 lg:mt-0 translate-y-3.5 lg:translate-y-0 xl:translate-x-12 text-black dark:text-white`}>
                    <li className="flex justify-center rounded-full bg-primary px-4 py-1 transition-all duration-200 hover:scale-103">
                        <Link
                            to="/restaurantes"
                            className="flex items-center justify-center gap-2 text-center text-black"
                        >
                            <MdRestaurantMenu />
                            Restaurantes
                        </Link>
                    </li>
                    <li className="flex justify-center rounded-full bg-primary px-4 py-1 transition-all duration-200 hover:scale-103">
                        <Link
                            to="/criar-conta"
                            className="flex items-center justify-center gap-2 text-center text-black"
                        >
                            <BsTools />
                            Criar Restaurante
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}