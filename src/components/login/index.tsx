import { FaArrowRight } from "react-icons/fa";

interface LoginContainerProps {
    email: string;
    password: string;
    error: string;
    loading: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    onLogin: () => void;
}

const LoginContainer = ({
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    onLogin
}: LoginContainerProps) => {
    return (
        <div className="primary-component w-120 h-110 m-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
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
                <label htmlFor="email" className="font-semibold ">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="input mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className="font-semibold">
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <a href="#" className="link text-end">
                    Esqueci minha senha
                </a>
            </div>

            {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}

            <button
                className="primary-button w-[200px]"
                onClick={onLogin}
                disabled={loading}
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <a
                href="#"
                className="link text-center m-5"
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
