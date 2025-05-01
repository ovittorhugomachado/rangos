import { FaArrowRight } from "react-icons/fa";

const LoginContainer = () => {
  return (
    <div className="backdrop-blur-md bg-white/5 dark:bg-white/5 border border-zinc-400 rounded-xl w-120 h-110 m-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
      <img
        className="w-35 ml-8 mb-3 hidden dark:block"
        src="../logo-white.png"
        alt="domus-logo"
      />
      <img
        className="w-35 ml-8 mb-3 block dark:hidden"
        src="../logo-black.png"
        alt="domus-logo"
      />
      <div className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-1">
        <label htmlFor="email" className="font-semibold text-black dark:text-white">
          Email
        </label>
        <input id="email" type="email" className="input mb-2" />

        <label htmlFor="password" className="font-semibold text-black dark:text-white">
          Senha
        </label>
        <input id="password" type="password" className="input" />

        <a href="#" className="link text-end text-black dark:text-white">
          Esqueci minha senha
        </a>
      </div>

      <button className="primary-button">Entrar</button>

      <a
        href="#"
        className="link text-center text-black dark:text-white m-5"
      >
        Ainda não tem conta?{" "}
        <strong className="whitespace-nowrap">
          Criar conta <FaArrowRight className="inline" />
        </strong>
      </a>
    </div>
  );
};

export { LoginContainer };