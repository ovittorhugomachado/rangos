import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth"
import { logout } from "../../services/service-auth";
import { IoIosArrowDown } from "react-icons/io";

export const UserMenu = ({ open, fontSize }: { open: boolean, fontSize: string }) => {
    
    const { style } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${open ? "block" : "hidden"} w-16 h-16 rounded-full flex flex-col items-center md:-translate-y-10 xl:translate-y-0 md:-translate-x-2 lg:translate-x-0`}>
            <img
                src={style?.logoUrl ?? 'default-logo.png'}
                alt="logo"
                className="w-full h-full rounded-full"
            />
            <IoIosArrowDown
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`text-xl ${menuOpen ? "rotate-180" : ""} text-black dark:text-white absolute right-[-21px] top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-300`}
            />

            <div
                style={{ zIndex: 1000 }}
                className={`${menuOpen ? "block" : "hidden"} w-18 rounded-xl flex flex-col absolute bottom-0 translate-y-2 sm:translate-y-3 bg-zinc-600 dark:bg-zinc-900`}
            >
                <Link
                    to="/entrar"
                    onClick={() => {
                        logout()
                        localStorage.setItem('isLogged', JSON.stringify(false));
                        localStorage.removeItem('token');
                    }}
                    className={`${fontSize} text-center text-white hover:scale-110 transition-all duration-200`}
                >
                    Sair
                </Link>
            </div>
        </div>
    );
};