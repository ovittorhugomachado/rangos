import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../services/user-data";
import { AccountData } from "../types/account-types.d";

export const useAuth = () => { //função que verifica se o usuário tem o token e retorna dados do usuário
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AccountData | null>(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const userDataResponse = await userData();
            if (!userDataResponse) {
                throw new Error('Dados do usuário não encontrados');
            }
            setUser(prevUser => {

                return JSON.stringify(prevUser) === JSON.stringify(userDataResponse)
                    ? prevUser
                    : userDataResponse;
            });
            setError('');
        } catch (error) {
            const err = error as Error;

            setError(err.message);

            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();

    }, [fetchData]);

    useEffect(() => {
        if (error && !loading) {
            navigate('/entrar', { state: { error } });
        }
    }, [error, loading, navigate]);

    return { user, loading, error, refreshData: fetchData };  
};

