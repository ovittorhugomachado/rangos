import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../../hooks/use-auth"
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/service-auth";

export const UserMenu = ({ open, fontSize }: { open: boolean, fontSize: string }) => {
    const { style } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${open ? "block" : "hidden"} flex flex-col items-center w-16 h-16 rounded-full sm:-translate-y-10 sm:-translate-x-2 lg:translate-0 `}>
            <img src={style?.logoUrl ?? 'default-logo.png'} alt="logo" className="rounded-full" />
            <IoIosArrowDown
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`${menuOpen ? "rotate-180" : ""} text-xl text-black dark:text-white cursor-pointer absolute right-[-21px] top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-300`} />

            <div
                style={{ zIndex: 1000 }}
                className={`${menuOpen ? "block" : "hidden"} w-18 rounded-xl flex flex-col absolute bottom-0 translate-y-2 sm:translate-y-3 bg-zinc-600 dark:bg-zinc-900`}
            >
                <Link
                    to="/entrar"
                    onClick={() => logout()}
                    className={`${fontSize} text-center hover:scale-110 transition-all duration-200 text-white`}
                >
                    Sair
                </Link>
            </div>
        </div>

    )
}