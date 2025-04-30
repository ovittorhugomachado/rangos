import { FaArrowRight } from "react-icons/fa";

const LoginContainer = () => {

    return (
        <>
            <div className="backdrop-blur-md bg-white/15 dark:bg-white/5 border-1 border-zinc-400 rounded-xl w-120 h-110 m-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
                <img className="w-35 ml-8 mb-3" src="../logo-white.png" alt="domus-logo" />
                <div className="flex flex-col mt-[20px] mb-[20px] w-[100%] max-w-105 gap-1">
                    <label className="font-semibold" text-white htmlFor="password">Email</label>
                    <input className="input mb-2" id="email" type="email" />
                    <label className="font-semibold text-white" htmlFor="password">Senha</label>
                    <input className="input" id="password" type="password" />
                    <a className="link text-end text-white" href="#">Esqueci minha senha</a>
                </div>
                <button className="primary-button">Entrar</button>
                <a className="link text-center text-white m-5" href="#">Ainda não tem conta? <strong className="whitespace-nowrap">Criar conta <FaArrowRight className="inline" /></strong></a>
            </div>
        </>
    )
}

export { LoginContainer }