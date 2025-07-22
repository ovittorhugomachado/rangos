import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
        <nav
            className="w-screen lg:h-42 xl:h-26 px-4 pt-13 md:pt-8 pb-4 lg:py-0 md:gap-36 shadow-md flex flex-col md:flex-row items-center justify-center dark:border-b-[1px] dark:border-zinc-600"
        >
            <div className="mt-0 md:absolute md:mt-[-55px] xl:mt-0 xl:left-8 xl:translate-y-1">
                <Logo />
            </div>
            <button
                className="w-10 h-10 md:hidden flex flex-col justify-center items-center z-30"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Abrir menu"
            >
                <span className={`w-8 h-1 rounded bg-black dark:bg-white transition-all duration-300${menuOpen ? " rotate-45 translate-y-2" : ""}`}></span>
                <span className={`w-8 h-1 rounded my-1 bg-black dark:bg-white transition-all duration-300${menuOpen ? " opacity-0" : ""}`}></span>
                <span className={`w-8 h-1 rounded bg-black dark:bg-white transition-all duration-300${menuOpen ? " -rotate-45 -translate-y-2" : ""}`}></span>
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
                className={`${fontSize} w-full max-w-[720px] mb-8 xl:mb-0 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-4 md:mt-12 xl:mt-0 translate-y-3.5 xl:translate-y-0 xl:translate-x-12${menuOpen ? "" : " hidden md:flex"}`}
            >
                {buttons.map((btn, idx) => (
                    <li key={idx}>
                        <Link
                            to={btn.to}
                            title={btn.title}
                            target={btn.target}
                            className={`flex justify-center items-center gap-1 rounded-full px-4 py-1 ${location.pathname === btn.to ? "border-2 border-black dark:border-white text-black dark:text-white cursor-auto" : "bg-primary text-black cursor-pointer transition-all duration-200 hover:scale-103"}`}
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
