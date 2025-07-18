import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../../hooks/use-auth"
import { useState } from "react";
import { Link } from "react-router-dom";

export const UserMenu = ({ open }: { open: boolean }) => {
    const { style } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${open ? "block" : "hidden"} flex flex-col items-center w-16 h-16 rounded-full bg-red-600 z-50`}>
            <img src={style?.logoUrl} alt="logo" />
            <IoIosArrowDown
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`${menuOpen ? "rotate-180" : ""} text-xl text-black dark:text-white cursor-pointer absolute right-[-21px] top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-300`} />

            <div
                style={{ zIndex: 1000 }}
                className={`${menuOpen ? "block" : "hidden"} w-18 rounded-xl flex flex-col absolute bottom-3 sm:bottom-1 lg:-bottom-6 -right-18 lg:-right-1 bg-zinc-600 dark:bg-zinc-900`}
            >
                <Link
                    to="/entrar"
                    onClick={() => localStorage.removeItem('token')}
                    className="text-center hover:scale-110 transition-all duration-200 text-white"
                >
                    Sair
                </Link>
            </div>
        </div>

    )
}