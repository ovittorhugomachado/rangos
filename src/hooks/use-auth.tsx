import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../services/user-data";
import { getPageStyle } from "../services/page-style";
import { AccountData } from "../types/account-types.d";

export const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<AccountData | null>(null);
    const [styleStorePage, setStyleStorePage] = useState<AccountData | null>(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const userDataResponse = await userData();
            setUser(userDataResponse);

            if (userDataResponse?.id) {
                const styleDataPage = await getPageStyle(Number(userDataResponse.id));
                setStyleStorePage(styleDataPage);
            }
        } catch (error) {
            const err = error as Error;
            setError(err.message);
            navigate('/entrar', { state: { error: err.message } });
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 30000);

        return () => clearInterval(intervalId);
    }, [fetchData]);

    return { user, styleStorePage, loading, error, refreshData: fetchData };
};