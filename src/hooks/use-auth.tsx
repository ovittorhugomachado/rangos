import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../services/user-data";
import { AccountFormData } from "../types/account-types.d";

export const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<AccountFormData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const confirmUserLogged = async () => {
            setLoading(true);
            try {
                const userDataResponse = await userData();
                setUser(userDataResponse);
            } catch (error) {
                const err = error as Error;
                setError(err.message || 'Erro ao validar o usuário');
                navigate('/entrar', { state: { error: err.message } });
            } finally {
                setLoading(false);
            }
        };

        confirmUserLogged();
    }, [navigate]);

    return { user, loading, error };
};