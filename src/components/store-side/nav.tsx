import { Link } from "react-router-dom";
import { Logo } from "../component-logo";
import { UserMenu } from "./user-menu";
import { CgMenuGridR } from "react-icons/cg";
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

export const DashboardNav = ({fontSize}: {fontSize: string}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="dark:border-b-[1px] dark:border-zinc-600 top-0 w-screen lg:h-26 flex flex-col sm:flex-row items-center justify-center px-4 pt-13 sm:pt-8 pb-4 lg:py-0 sm:gap-36 shadow-md">
            <div className="container-logo mt-0 sm:absolute sm:mt-[-35px] lg:mt-0 lg:left-8 lg:translate-y-1">
                <Logo />
            </div>
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
            <div className="sm:hidden relative py-2">
                <UserMenu
                    open={menuOpen}
                    fontSize={fontSize}
                />
            </div>
            <ul className={`${menuOpen ? "" : "hidden sm:flex"} ${fontSize === 'text-sm' ? 'text-lg' : 'text-xl'} w-full max-w-[580px] md:w-[690px] flex flex-col sm:flex-row items-center justify-center mb-8 lg:mb-0 md:justify-around gap-2 sm:gap-4 sm:mt-12 lg:mt-0 translate-y-3.5 lg:translate-y-0 xl:translate-x-12 text-black dark:text-white`}>
                <li className="flex justify-center rounded-full bg-primary px-4">
                    <Link
                        to="/"
                        title="Editar cardápio"
                        className="flex items-center justify-center gap-2 text-center text-black transition-all duration-200 hover:scale-103"
                    >
                        <CgMenuGridR />
                        Painel
                    </Link>
                </li>
                <li className="flex justify-center rounded-full bg-primary px-4">
                    <Link
                        to="/store"
                        target="_blank"
                        title="Criar pedido"
                        className="flex items-center justify-center gap-2 text-center text-black transition-all duration-200 hover:scale-103"
                    >
                        <MdBorderColor />
                        Criar pedido
                    </Link>
                </li>
                <li className="flex justify-center rounded-full bg-primary px-4">
                    <Link
                        to="/personalizar-cardapio"
                        title="Editar loja"
                        className="flex items-center justify-center gap-2 text-center text-black transition-all duration-200 hover:scale-103"
                    >
                        <IoMdSettings />
                        Editar loja
                    </Link>
                </li>
            </ul>
            <div className="hidden sm:block absolute right-16 lg:left-auto lg:right-18">
                <UserMenu
                    open={true}
                    fontSize={fontSize}
                />
            </div>
        </nav>
    );
};
