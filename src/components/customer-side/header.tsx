import { Link } from "react-router-dom"
import { Logo } from "../component-logo"

export const Header = () => {
    return (
        <div className="w-screen flex flex-col sm:flex-row sm:px-9 sm:h-23 h-32 items-center justify-center bg-white text-black shadow-md z-10">
            <Logo />
            <nav className="flex space-x-4 text-md sm:-translate-x-[60px] sm:text-lg sm:flex-1 sm:justify-center">
                <ul className="flex gap-4 sm:gap-9 mt-2 sm:mt-0">
                    <li className="flex justify-center items-center rounded-lg px-4 py-2 bg-primary">
                        <Link to="/restaurantes">Restaurantes</Link>
                    </li>
                    <li className="flex justify-center items-center rounded-lg px-4 py-2 bg-primary">
                        <Link to="/criar-conta">Criar Restaurante</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}