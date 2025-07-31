import { useState } from "react";
import { useAppSettings } from "../hooks/use-app-settings.ts";
import { recoverPassword } from "../services/service-recover-password.ts";
import { AccountData } from "../types/types-account.d.tsx";
import { RecoverPasswordFormContainer } from "../components/store-side/forms/form-recover-password.tsx";
import { ToggleThemeAndFont } from "../components/component-display-settings.tsx";

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
            const response = await recoverPassword(data);
            setError('')
            setMessage(response.message)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} w-full min-w-[250px] min-h-[550px] flex justify-center items-center`}>
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
                byStore={true}
            />
        </main>
    )
};