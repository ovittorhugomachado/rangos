import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { user, loading, error } = useAuth();
    const navigate = useNavigate();

    if (error) {
        navigate('/entrar', { state: { error } });
        return null;
    }

    return (
        <main className="flex flex-col items-center gap-6">
            {user && (
                <div className="user-data">
                    <h2>Bem-vindo, {user.restaurantName}</h2>
                    <p>Email: {user.email}</p>
                </div>
            )}
            {loading && <p>carregando</p>}
            <Link
                to="/entrar"
                className="primary-button"
                onClick={() => localStorage.removeItem('token')}
            >
                Sair
            </Link>
        </main>
    );
};

export { AdminDashboard };

