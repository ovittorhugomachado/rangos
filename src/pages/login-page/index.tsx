import { useState } from "react";
import { login } from "../../services/auth-service";
import { LoginContainer } from "../../components/login";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.token);
            console.log(response)
            setError('');
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full h-full flex justify-center items-center">
            <LoginContainer
                email={email}
                password={password}
                error={error}
                loading={loading}
                setEmail={setEmail}
                setPassword={setPassword}
                onLogin={handleLogin}
            />
        </main>
    );
};

export { LoginPage };
