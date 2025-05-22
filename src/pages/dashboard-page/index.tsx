import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userData } from "../../services/user-data";
import { AccountFormData } from "../../types/account-types.d";

const AdminDashboard = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AccountFormData | null>(null)
    const navigate = useNavigate()

    useEffect(() => {

        setLoading(true)

        const consfirmUserLogged = async () => {
            try {
                const user = await userData()
                setData(user)
            } catch (error) {
                const err = error as Error;
                setError(err.message || 'Erro ao validar o link');
                navigate('/entrar', { state: { error: err.message } });
            } finally {
                setLoading(false)
            }
        }

        consfirmUserLogged()

    }, [navigate])

        if (error) {
        navigate('/entrar', { state: { error } });
        return;
    }
    
    return (
        <main className="flex flex-col items-center gap-6">
            {data && (
                <div className="user-data">
                    <h2>Bem-vindo, {data.restaurantName}</h2>
                    <p>Email: {data.email}</p>
                </div>
            )}
            {loading && (<p>carregando</p>)}
            <Link
                to={"/entrar"}
                className="primary-button"
                onClick={() => localStorage.removeItem('token')}
            >
                Sair
            </Link>
        </main>

    )
}

export { AdminDashboard }


