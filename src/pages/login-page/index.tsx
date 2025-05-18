import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../hooks/use-app-settings";
import { login } from "../../services/auth-service";
import { AccountFormData } from "../../types/account-types.d";
import { LoginFormContainer } from "../../components/login-form-container";
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

    const handleLogin = async (data: AccountFormData) => {
        setLoading(true);
        try {
            const { token } = await login(data);
            localStorage.setItem('token', token);
            navigate('/admin/dashboard')

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} min-h-[590px] min-w-[300px] flex justify-center items-center`}>
            <LoginFormContainer
                onSubmit={handleLogin}
                isLoading={loading}
                message=""
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
