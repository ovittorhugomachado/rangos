import { OpeningHoursForm } from "../components/opening-hours-form";
import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../components/loading-component";

const AdminDashboard = () => {
    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const { user, loading, error } = useAuth();

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h2 className="text-red-600 text-xl font-bold mb-4">Erro ao carregar dados</h2>
                    <p className="text-zinc-700">{error}</p>
                    <Link to="/entrar" className="primary-button mt-4">
                        Ir para login
                    </Link>
                </div>
            ) : (loading || !user) ? (
                <LoadingComponent />
            ) : (
                <main className={`${fontSize} flex flex-col text-black dark:text-white items-center gap-6 w-screen`}>
                    {user && (
                        <div className="user-data">
                            <h2>Bem-vindo, {user.restaurantName}</h2>
                            <p>Email: {user.email}</p>
                        </div>
                    )}
                    <OpeningHoursForm />
                    {loading && <p>carregando</p>}
                    <Link
                        to="/entrar"
                        className="primary-button"
                        onClick={() => localStorage.removeItem('token')}
                    >
                        Sair
                    </Link>
                    <ToggleThemeAndFont
                        toggleTheme={toggleTheme}
                        fontSize={fontSize}
                        increaseFontSize={increaseFontSize}
                        decreaseFontSize={decreaseFontSize}
                    />
                </main>
            )}
        </>
    );
};

export { AdminDashboard };