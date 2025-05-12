import { useState } from "react";
import { registerUser } from "../../services/register";
import { useAppSettings } from "../../hooks/use-app-settings";
import { RegisterFormData } from "../../types/register.d";
import { RegisterContainer } from "../../components/register";
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

    const handleRegister = async (data: RegisterFormData) => {
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
            <RegisterContainer
                onSubmit={handleRegister}
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

export { RegisterPage }; 