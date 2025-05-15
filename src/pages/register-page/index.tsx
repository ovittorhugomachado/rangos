import { useState } from "react";
import { registerUser } from "../../services/register";
import { useAppSettings } from "../../hooks/use-app-settings";
import { AccountFormData } from "../../types/account-types.d";
import { RegisterFormContainer } from "../../components/register-form-container";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";


const RegisterPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

        const {
            fontSize,
            increaseFontSize,
            decreaseFontSize,
            toggleTheme,
        } = useAppSettings();

    const handleRegister = async (data: AccountFormData) => {
        setLoading(true);
        try {
            const response = await registerUser(data); 
            console.log(response.token)
            localStorage.setItem('token', response.token);
            setError('');
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${fontSize} min-h-[700px] min-w-[300px] py-14 flex justify-center items-center`}>
            <RegisterFormContainer
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
            />
        </main>
    );
};

export { RegisterPage }; 