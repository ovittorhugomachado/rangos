import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { HomePage } from "../pages/home-page/home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/ForgotPassword" ></Route>
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
            )
}

export { AppRoutes }
