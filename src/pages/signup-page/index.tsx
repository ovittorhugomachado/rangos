import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/register";
import { useAppSettings } from "../../hooks/use-app-settings";
import { AccountData } from "../../types/account-types.d";
import { SignupFormContainer } from "../../components/signup-form-container";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";


const RegisterPage = () => {

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
            console.log(data)
            navigate('/painel')
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
            />
        </main>
    );
};

export { RegisterPage }; 