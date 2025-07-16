import { useState } from "react";
import { useAppSettings } from "../hooks/use-app-settings.ts";
import { AccountData } from "../types/account-types.d.tsx";
import { recoverPassword } from "../services/recover-password.ts";
import { RecoverPasswordFormContainer } from "../components/store-side/forms/recover-password-form.tsx";
import { ToggleThemeAndFont } from "../components/store-side/display-settings-component.tsx";

export const RecoverPasswordPage = () => {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();


    const HandleRecoverPassword = async (data: AccountData) => {
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
            <RecoverPasswordFormContainer
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

};