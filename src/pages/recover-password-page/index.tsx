import { useState } from "react";
import { useAppSettings } from "../../hooks/use-app-settings";
import { LoginFormData } from "../../types/login.d";
import { recoverPassword } from "../../services/recover-password";
import { RecoverPasswordContainer } from "../../components/recover-password";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";

const RecoverPasswordPage = () => {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();


    const HandleRecoverPassword = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const response= await recoverPassword(data);
            setError('')
            setMessage(response.message)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} min-h-[550px] min-w-[300px] flex justify-center items-center`}>
            <RecoverPasswordContainer
                onSubmit={HandleRecoverPassword}
                isLoading={loading}
                message={message}
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