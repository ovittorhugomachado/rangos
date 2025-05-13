import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../hooks/use-app-settings";
import { login } from "../../services/auth-service";
import { LoginFormData } from "../../types/login.d";
import { LoginContainer } from "../../components/login";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";

const LoginPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const navigate = useNavigate()

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const { token } = await login(data);
            localStorage.setItem('token', token);
            navigate('/home')

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} min-h-[590px] min-w-[300px] flex justify-center items-center`}>
            <LoginContainer
                onSubmit={handleLogin}
                isLoading={loading}
                error={error}
            />
            <ToggleThemeAndFont
                toggleTheme={toggleTheme}
                fontSize={fontSize}
                increaseFontSize={increaseFontSize}
                decreaseFontSize={decreaseFontSize}
            />
        </main>
    );
};

export { LoginPage };
