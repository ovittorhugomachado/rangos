import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { HomePage } from "../pages/home-page";
import { RecoverPasswordPage } from "../pages/recover-password-page";
import { CreateNewPassword } from "../pages/create-new-password";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recover-password" element={<RecoverPasswordPage />} />
                <Route path="/create-new-password" element={<CreateNewPassword />} />
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
            )
}

export { AppRoutes }
