import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../hooks/use-app-settings";
import { login } from "../services/service-auth";
import { AccountData } from "../types/types-account.d";
import { LoginFormContainer } from "../components/store-side/forms/form-login";
import { ToggleThemeAndFont } from "../components/component-display-settings";

export const LoginPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const navigate = useNavigate()

    const handleLogin = async (data: AccountData) => {
        setLoading(true);
        try {
            const { isLogged } = await login(data);
            localStorage.setItem('isLogged', JSON.stringify(isLogged));
            navigate('/')

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} w-full min-w-[280px] min-h-[590px] flex justify-center items-center`}>
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
                byStore={true}
            />
        </main>
    )
};
