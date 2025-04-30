import { FaArrowRight } from "react-icons/fa";

const LoginContainer = () => {
    return (
        <>
            <main className="bg-amber-50 border-1 border-zinc-400 rounded-xl w-120 m-3 pt-15 pb-20 p-5 flex flex-col justify-center items-center">
                <img className="w-35 ml-8 mb-3" src="../logo.png" alt="domus-logo" />
                <div className="flex flex-col mt-[20px] mb-[20px] w-[100%] max-w-105 gap-1">
                    <label className="font-semibold" htmlFor="password">Email</label>
                    <input className="input mb-2" id="email" type="email" />
                    <label className="font-semibold" htmlFor="password">Senha</label>
                    <input className="input" id="password" type="password" />
                    <a className="link text-end" href="#">Esqueci minha senha</a>
                </div>
                <a className="link" href="#">Ainda não tem conta? <strong className="whitespace-nowrap">Criar conta <FaArrowRight className="inline" /></strong></a>
            </main>
        </>
    )
}

export { LoginContainer }