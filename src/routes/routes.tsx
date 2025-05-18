import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { HomePage } from "../pages/home-page";
import { RecoverPasswordPage } from "../pages/recover-password-page";
import { CreateNewPasswordPage } from "../pages/create-new-password-page";
import { AdminDashboard } from "../pages/admin-dashboard-page";
import { SettingsPage } from "../pages/settings-page";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin/settings-page" element={<SettingsPage />} />
                <Route path="/recover-password" element={<RecoverPasswordPage />} />
                <Route path="/create-new-password/:token" element={<CreateNewPasswordPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
