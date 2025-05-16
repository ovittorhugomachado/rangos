import { CreateNewPasswordFormContainer } from "../../components/create-new-password-form";
import { useAppSettings } from "../../hooks/use-app-settings";
import { useState, useEffect } from "react";
import { AccountFormData } from "../../types/account-types.d";
import { ToggleThemeAndFont } from "../../components/toggle-theme-and-font";
import { createNewPassword, validateToken } from "../../services/create-new-password"; // Adicionei a nova função
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Logo } from "../../components/logo";

const CreateNewPasswordPage = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const validateTokenOnLoad = async () => {
            if (!token) {
                setError('Token inválido ou ausente.');
                return;
            }

            setLoading(true);
            try {
                const isValid = await validateToken(token);
                setIsValidToken(isValid);
                if (!isValid) {
                    setError('Link inválido ou expirado. Solicite um novo link.');
                }
            } catch (error) {
                const err = error as Error;
                setError(err.message || 'Erro ao validar o link');
                navigate('/login', { state: { error: err.message } });
            } finally {
                setLoading(false);
            }
        };

        validateTokenOnLoad();
    }, [token, navigate]);

    const handleNewPassword = async (formData: AccountFormData) => {
        if (!token || !isValidToken) {
            setError('Token inválido ou expirado.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await createNewPassword(formData.password, token);
            setMessage("nova senha cadastrada com sucesso")
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao redefinir senha');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && !isValidToken ? (
                <div className="loading-screen">Validando link...</div>
            ) : message ? (
                <div className="primary-component w-120 h-80 gap-3 mx-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">

                    <Logo />

                    <p className="span-success">{message}</p>
                    <Link
                        to="/login"
                        className="primary-button mt-2.5"
                    >
                        Fazer login
                    </Link>

                </div>
            ) : isValidToken ? (
                <CreateNewPasswordFormContainer
                    onSubmit={handleNewPassword}
                    message={message}
                    isLoading={loading}
                    error={error}
                />
            ) : (
                <div className="primary-component w-120 h-80 gap-3 mx-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
                    <Link
                        to="/login"
                        className="flex gap-2 items-center justify-center absolute top-2.5 left-4"
                    >
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>Fazer login
                    </Link>

                    <Logo />

                    {error || 'Link inválido ou expirado'}
                    <Link
                        to="/recover-password"
                        className="primary-button mt-3.5"
                    >
                        Solicitar novo link
                    </Link>
                </div>
            )}
            <ToggleThemeAndFont {...useAppSettings()} />
        </>
    );
};

export { CreateNewPasswordPage };