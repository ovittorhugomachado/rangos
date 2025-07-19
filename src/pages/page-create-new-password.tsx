import { CreateNewPasswordFormContainer } from "../components/store-side/forms/form-create-new-password";
import { useAppSettings } from "../hooks/use-app-settings";
import { useState, useEffect } from "react";
import { AccountData } from "../types/types-account.d";
import { ToggleThemeAndFont } from "../components/component-display-settings";
import { createNewPassword, validateToken } from "../services/service-create-new-password"; // Adicionei a nova função
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Logo } from "../components/component-logo";

export const CreateNewPasswordPage = () => {

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
                navigate('/entrar', { state: { error: err.message } });
            } finally {
                setLoading(false);
            }
        };

        validateTokenOnLoad();
    }, [token, navigate]);

    const handleNewPassword = async (formData: AccountData) => {
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

                    <p>{message}</p>
                    <Link
                        to="/entrar"
                        className="primary-button mt-2.5"
                    >
                        Entrar na conta
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
                        to="/entrar"
                        className="flex gap-2 items-center justify-center absolute top-2.5 left-4"
                    >
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                    </Link>

                    <Logo />

                    {error || 'Link inválido ou expirado'}
                    <Link
                        to="/recuperar-senha"
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