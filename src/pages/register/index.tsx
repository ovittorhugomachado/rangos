import { useState } from "react";
import { login } from "../../services/auth-service";
import { RegisterContainer } from "../../components/register"

const RegisterPage = () => {

    const [restaurantName, setRestaurantName] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [ownersName, setOwnersName] = useState('');
    const [CPF, setCPF] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const result = await login({ email, password });
            localStorage.setItem('token', result.token);
            setError('');
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className=" w-full min-h-[700px] min-w-[300px] py-14 flex justify-center items-center">
            <RegisterContainer
                restaurantName={restaurantName}
                CNPJ={CNPJ}
                ownersName={ownersName}
                CPF={CPF}
                phoneNumber={phoneNumber}
                email={email}
                password={password}
                error={error}
                loading={loading}
                setRestaurantName={setRestaurantName}
                setCNPJ={setCNPJ}
                setOwnersName={setOwnersName}
                setCPF={setCPF}
                setPhoneNumber={setPhoneNumber}
                setEmail={setEmail}
                setPassword={setPassword}
                onLogin={handleRegister}
            />
        </main>
    )
}

export { RegisterPage }