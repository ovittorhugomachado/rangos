import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/page-login";
import { RegisterPage } from "../pages/page-signup";
import { RecoverPasswordPage } from "../pages/page-recover-password";
import { CreateNewPasswordPage } from "../pages/page-create-new-password";
import { AdminDashboard } from "../pages/page-dashboard";
import { CustomizeMenuPage } from "../pages/page-customize-menu";
import { PlaygroundPage } from "../pages/page-playground";
import { Store } from "../pages/page-store";
import { PageListOfStores } from "../pages/page-list-of-stores";

export const AppRoutes = () => {
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
                <Route path="/restaurantes" element={<PageListOfStores />} />
                <Route path="/store" element={<Store />} />
                <Route path="/playground" element={<PlaygroundPage />} />
            </Routes>
        </BrowserRouter>
    )
};
