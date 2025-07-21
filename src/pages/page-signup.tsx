import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../hooks/use-app-settings";
import { registerUser } from "../services/service-register";
import { AccountData } from "../types/types-account.d";
import { SignupFormContainer } from "../components/store-side/forms/form-signup";
import { ToggleThemeAndFont } from "../components/component-display-settings";

export const RegisterPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate()

    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const handleRegister = async (data: AccountData) => {
        setLoading(true);
        try {
            const response = await registerUser(data);
            localStorage.setItem('token', response.token);

            navigate('/entrar')
            setError('');
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} w-full min-w-[300px] min-h-[700px] py-14 flex justify-center items-center`}>
            <SignupFormContainer
                onSubmit={handleRegister}
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
    );
};