import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppSettings } from "../hooks/use-app-settings";
import { createNewPassword, validateToken } from "../services/service-create-new-password";
import { AccountData } from "../types/types-account.d";
import { CreateNewPasswordFormContainer } from "../components/store-side/forms/form-create-new-password";
import { ToggleThemeAndFont } from "../components/component-display-settings";
import { Logo } from "../components/component-logo";
import { FaArrowLeft } from "react-icons/fa";

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
                <div className={`w-full h-80 flex items-center justify-center text-lg`}>
                    Validando link...
                </div>
            ) : message ? (
                <div className={`w-120 h-80 mx-3 pt-10 pb-10 p-5 flex flex-col gap-3 justify-center items-center text-base rounded bg-white`}>
                    <Logo />
                    <p>{message}</p>
                    <Link to="/entrar" className={`mt-2.5 text-base rounded bg-primary text-white px-4 py-2 text-center`}>
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
                <div className={`w-120 h-80 mx-3 pt-10 pb-10 p-5 flex flex-col gap-3 justify-center items-center text-base rounded bg-white`}>
                    <Link to="/entrar" className={`absolute top-2.5 left-4 flex gap-2 items-center justify-center text-base`}>
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                    </Link>
                    <Logo />
                    {error || 'Link inválido ou expirado'}
                    <Link to="/recuperar-senha" className={`mt-3.5 text-base rounded bg-primary text-white px-4 py-2 text-center`}>
                        Solicitar novo link
                    </Link>
                </div>
            )}
            <ToggleThemeAndFont {...useAppSettings()} />
        </>
    )
};