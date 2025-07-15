import { Link } from "react-router-dom";
import { Logo } from "../logo";
import { CgMenuGridR } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export const DashboardNav = () => {
  return (
    <nav className="absolute top-0 w-screen h-70 sm:h-38 lg:h-26 flex flex-col sm:flex-row items-center justify-center px-4 pt-16 sm:pt-12 py-12 lg:py-0 sm:gap-36 border-b border-zinc-800 dark:border-zinc-700">
      <div className="container-logo mt-0 sm:absolute sm:mt-[-35px] lg:mt-0 lg:left-8 lg:translate-y-1">
        <Logo />
      </div>
      <ul className="w-full md:w-[690px] flex flex-col sm:flex-row items-center justify-center md:justify-around gap-2 sm:gap-8 sm:mt-12 lg:mt-0 translate-y-3.5 lg:translate-y-0 xl:translate-x-12 lg:translate-x-20 text-black dark:text-white">
        <li className="flex justify-center border-b-2 border-primary sm:px-4">
          <Link
            to="/"
            title="Editar cardápio"
            className="flex items-center justify-center gap-2 text-lg text-center text-black dark:text-white transition-all duration-200 hover:scale-103"
          >
            <CgMenuGridR />
            Painel
          </Link>
        </li>
        <li className="flex justify-center border-b-2 border-primary sm:px-4">
          <Link
            to="/store"
            target="_blank"
            title="Criar pedido"
            className="flex items-center justify-center gap-2 text-lg text-center text-black dark:text-white transition-all duration-200 hover:scale-103"
          >
            <MdBorderColor />
            Criar pedido
          </Link>
        </li>
        <li className="flex justify-center sm:border-b-2 sm:border-primary sm:px-4">
          <Link
            to="/personalizar-cardapio"
            title="Editar loja"
            className="flex items-center justify-center gap-2 text-lg text-center text-black dark:text-white transition-all duration-200 hover:scale-103"
          >
            <IoMdSettings />
            Editar loja
          </Link>
        </li>
        <li className="flex justify-center border-t-2 border-primary p-2 sm:p-0 sm:border-0 sm:border-b-2 sm:border-primary sm:px-4">
          <Link
            to="/entrar"
            title="Sair"
            onClick={() => localStorage.removeItem("token")}
            className="flex items-center justify-center gap-2 text-lg text-center text-black dark:text-white transition-all duration-200 hover:scale-103"
          >
            <ImExit />
            Sair
          </Link>
        </li>
      </ul>
    </nav>
  );
};
