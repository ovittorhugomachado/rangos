//import { UpdateSchedulesForm } from "../components/forms/update-schedules";
import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../components/loading";
import { Logo } from "../components/logo";
import { CgMenuGridR } from "react-icons/cg";
import { ImExit } from "react-icons/im";

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
                <>
                    <nav className="w-screen h-54 sm:gap-36 fixed top-0 flex flex-col sm:flex-row sm:h-26 items-center justify-center py-12 px-4">
                        <div className="container-logo sm:absolute sm:left-8 mt-2 mb-4">
                            <Logo />
                        </div>
                        <ul className="w-full sm:w-[330px] lg:w-[400px] flex flex-col sm:flex-row sm:translate-x-20 lg:translate-x-0 items-center justify-center gap-2 sm:gap-8 sm:mt-0 sm:justify-around text-black dark:text-primary">
                            <li className="flex justify-center sm:border-b-2 sm:border-primary sm:px-4">
                                <a href="/personalizar-cardapio" className="text-center text-lg flex items-center gap-2 hover:scale-103 transition-all duration-200">
                                    <CgMenuGridR />
                                    Editar cardápio
                                </a>
                            </li>
                            <li className="flex justify-center sm:border-b-2 border-primary sm:px-4">
                                <Link
                                    to="/entrar"
                                    className="text-center text-lg flex items-center gap-2 border-t-2 border-primary p-2 sm:p-0 sm:border-0  hover:scale-103 transition-all duration-200"
                                    onClick={() => localStorage.removeItem('token')}
                                >
                                    <ImExit />
                                    Sair
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <main className={`${fontSize} flex flex-col text-black dark:text-white items-center gap-6 w-screen`}>
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
                        <ToggleThemeAndFont
                            toggleTheme={toggleTheme}
                            fontSize={fontSize}
                            increaseFontSize={increaseFontSize}
                            decreaseFontSize={decreaseFontSize}
                        />
                    </main>
                </>
            )}
        </>
    );
};

export { AdminDashboard };