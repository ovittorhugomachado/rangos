import { Logo } from "../logo"
import { Link } from "react-router-dom"
import { CgMenuGridR } from "react-icons/cg"
import { ImExit } from "react-icons/im"
import { LiaPaintBrushSolid } from "react-icons/lia";

export const DashboardNav = () => {
    return (
        <>
            <nav className="w-screen h-54 sm:gap-36 absolute top-0 flex flex-col sm:flex-row sm:h-26 items-center justify-center py-12 px-4">
                <div className="container-logo sm:absolute md:left-8 mt-2 mb-4">
                    <Logo />
                </div>
                <ul className="w-full sm:w-[490px] lg:w-[550px] flex flex-col sm:flex-row md:translate-x-20 lg:translate-x-0 items-center justify-center gap-2 sm:gap-8 sm:mt-18 md:mt-0 md:justify-around text-black dark:text-white">
                    
                    <li className="flex justify-center border-b-2 border-primary sm:px-4">
                        <Link
                            to="/"
                            className="text-center text-lg flex items-center gap-2 hover:scale-103 transition-all duration-200"
                            title="Editar cardápio"
                        >
                            <CgMenuGridR />
                            Painel
                        </Link>
                    </li>
                    <li className="flex justify-center sm:border-b-2 sm:border-primary sm:px-4">
                        <Link
                            to="/personalizar-cardapio"
                            className="text-center text-lg flex items-center gap-2 hover:scale-103 transition-all duration-200"
                            title="Editar cardápio"
                        >
                            <LiaPaintBrushSolid />
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