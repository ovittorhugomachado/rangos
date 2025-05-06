import { useState } from "react";
import { login } from "../../services/auth-service";
import { FaArrowRight } from "react-icons/fa";

const LoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            const result = await login({ email, password });
            localStorage.setItem('token', result.token);
            setError('')
            console.log("Login realizado com sucesso");
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false)
        }
    }

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
                className="primary-button"
                onClick={handleLogin}
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