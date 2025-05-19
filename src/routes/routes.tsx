import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { HomePage } from "../pages/home-page";
import { RecoverPasswordPage } from "../pages/recover-password-page";
import { CreateNewPasswordPage } from "../pages/create-new-password-page";
import { AdminDashboard } from "../pages/admin-dashboard-page";
import { CustomizeMenuPage } from "../pages/customize-menu-page";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/entrar" element={<LoginPage />} />
                <Route path="/criar-conta" element={<RegisterPage />} />
                <Route path="/personalizar-cardapio" element={<CustomizeMenuPage />} />
                <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
                <Route path="/criar-nova-senha/:token" element={<CreateNewPasswordPage />} />
                <Route path="/painel" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
