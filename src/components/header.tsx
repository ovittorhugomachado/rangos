import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "./component-logo";
import { UserMenu } from "./store-side/user-menu";

type HeaderButton = {
    to: string;
    title?: string;
    icon?: React.ReactNode;
    className?: string;
    target?: string;
};

export const Header = ({
    fontSize,
    buttons,
}: {
    fontSize: string;
    buttons: HeaderButton[];
}) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const isLogged = localStorage.getItem('isLogged') === 'true';

    return (
        <nav className="dark:border-b-[1px] dark:border-zinc-600 top-0 w-screen lg:h-42 xl:h-26 flex flex-col md:flex-row items-center justify-center px-4 pt-13 md:pt-8 pb-4 lg:py-0 md:gap-36 shadow-md">
            <div className="container-logo mt-0 md:absolute md:mt-[-55px] xl:mt-0 xl:left-8 xl:translate-y-1">
                <Logo />
            </div>
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-30"
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
            {isLogged && (
                <div className="md:hidden relative py-2">
                    <UserMenu
                        open={menuOpen}
                        fontSize={fontSize}
                    />
                </div>
            )}
            <ul
                style={{ fontSize: fontSize === 'text-sm' ? '18px' : '19px' }}
                className={`${menuOpen ? "" : "hidden md:flex"} w-full max-w-[720px] flex flex-col sm:flex-row items-center justify-center mb-8 xl:mb-0 gap-2 sm:gap-2 md:gap-4 md:mt-12 xl:mt-0 translate-y-3.5 xl:translate-y-0 xl:translate-x-12`}>
                {buttons.map((btn, idx) => (
                    <li key={idx}>
                        <Link
                            to={btn.to}
                            title={btn.title}
                            target={btn.target}
                            className={`${location.pathname === btn.to ? "border-2 border-black dark:border-white text-black dark:text-white cursor-auto" : "transition-all duration-200 hover:scale-103 bg-primary text-black cursor-pointer"} flex justify-center items-center gap-1 rounded-full px-4 py-1`}
                        >
                            {btn.icon}
                            {btn.title}
                        </Link>
                    </li>
                ))}
            </ul>
            {isLogged && (
                <div className="hidden md:block absolute right-16 lg:left-auto lg:right-18">
                    <UserMenu
                        open={true}
                        fontSize={fontSize}
                    />
                </div>
            )}
        </nav>
    );
};
