import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/signup";
//import { HomePage } from "../pages/home-page";
import { RecoverPasswordPage } from "../pages/recover-password";
import { CreateNewPasswordPage } from "../pages/create-new-password";
import { AdminDashboard } from "../pages/dashboard";
import { CustomizeMenuPage } from "../pages/customize-menu";
import { PlaygroundPage } from "../pages/playground";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/entrar" element={<LoginPage />} />
                <Route path="/criar-conta" element={<RegisterPage />} />
                <Route path="/personalizar-cardapio" element={<CustomizeMenuPage />} />
                <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
                <Route path="/create-new-password/:token" element={<CreateNewPasswordPage />} />
                <Route path="/painel" element={<AdminDashboard />} />
                <Route path="/playground" element={<PlaygroundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
