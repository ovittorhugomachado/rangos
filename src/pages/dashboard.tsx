import { OpeningHoursForm } from "../components/opening-hours-form";
import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const { user, loading, error } = useAuth();
    const navigate = useNavigate();

    console.log(user)

    if (error) {
        navigate('/entrar', { state: { error } });
        return null;
    }

    return (
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
    );
};

export { AdminDashboard };

