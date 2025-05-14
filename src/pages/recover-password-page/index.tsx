import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../hooks/use-app-settings";
import { LoginFormData } from "../../types/login.d";
import { recoverPassword } from "../../services/recover-password";
import { RecoverPasswordContainer } from "../../components/recover-password";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";

const RecoverPasswordPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const navigate = useNavigate()

    const HandleRecoverPassword = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const { token } = await recoverPassword(data);
            localStorage.setItem('token', token);
            navigate('/home')

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} min-h-[700px] min-w-[300px] py-14 flex justify-center items-center`}>
            <RecoverPasswordContainer
                onSubmit={HandleRecoverPassword}
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
    )

}

export { RecoverPasswordPage }