import { Logo } from "../logo"
import { CgMenuGridR } from "react-icons/cg"
import { Link } from "react-router-dom"
import { ImExit } from "react-icons/im"

export const DashboardNav = () => {
    return (
        <>
            <nav className="w-screen h-54 sm:gap-36 absolute top-0 flex flex-col sm:flex-row sm:h-26 items-center justify-center py-12 px-4">
                <div className="container-logo sm:absolute sm:left-8 mt-2 mb-4">
                    <Logo />
                </div>
                <ul className="w-full sm:w-[330px] lg:w-[400px] flex flex-col sm:flex-row sm:translate-x-20 lg:translate-x-0 items-center justify-center gap-2 sm:gap-8 sm:mt-0 sm:justify-around text-black dark:text-white">
                    <li className="flex justify-center sm:border-b-2 sm:border-primary sm:px-4">
                        <Link
                            to="/personalizar-cardapio"
                            className="text-center text-lg flex items-center gap-2 hover:scale-103 transition-all duration-200"
                            title="Editar cardápio"
                        >
                            <CgMenuGridR />
                            Editar cardápio
                        </Link>
                    </li>
                    <li className="flex justify-center sm:border-b-2 border-primary sm:px-4">
                        <Link
                            to="/entrar"
                            className="text-center text-lg flex items-center gap-2 border-t-2 border-primary p-2 sm:p-0 sm:border-0  hover:scale-103 transition-all duration-200"
                            title="Sair"
                            onClick={() => localStorage.removeItem('token')}
                        >
                            <ImExit />
                            Sair
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
};