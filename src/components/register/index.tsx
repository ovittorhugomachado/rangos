import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { useState } from "react";

type Inputs = {
    restaurantName: string;
    cnpj: string;
    ownersName: string;
    cpf: string;
    number: string;
    email: string;
    password: string;
};

interface RegisterContainerProps {
    restaurantName: string;
    CNPJ: string;
    ownersName: string;
    CPF: string;
    phoneNumber: string;
    email: string;
    password: string;
    error: string;
    loading: boolean;
    setRestaurantName: (restaurantName: string) => void;
    setCNPJ: (restaurantName: string) => void;
    setOwnersName: (ownersName: string) => void;
    setCPF: (ownersName: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    onLogin: () => void;
}

const RegisterContainer = ({
    restaurantName,
    CNPJ,
    ownersName,
    CPF,
    phoneNumber,
    email,
    password,
    //error,
    loading,
    setRestaurantName,
    //setCNPJ,
    setOwnersName,
    //setCPF,
    //setPhoneNumber,
    //setEmail,
    //setPassword,
    onLogin
}: RegisterContainerProps) => {

    const [showPassword, setShowPassword] = useState(false)

    console.log('nome do restaurante:', restaurantName, 'nome do proprietário:', ownersName, 'cnpj:', CNPJ, 'cpf:', CPF, 'celular:', phoneNumber, 'email:', email, 'senha:', password)
    const { register, handleSubmit, control, clearErrors, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="primary-component w-120 m-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
            <img
                className="w-35 ml-8 mb-3 hidden dark:block"
                src="../logo-white.png"
                alt="domus-logo"
            />
            <img
                className="w-35 ml-8 mb-3 block dark:hidden"
                src="../logo-black.png"
                alt="domus-logo"
            />
            <div className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-1">

                <label htmlFor="restaurantName" className="label">
                    Nome do Restaurante *
                    {errors.restaurantName && (
                        <span className="span-error">
                            {errors.restaurantName.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    id="restaurantName"
                    type="text"
                    className={`input mb-2 ${errors.restaurantName ? "input-error" : ""} autofill:text-black`}
                    placeholder="Restaurante"
                    {...register("restaurantName", {
                        required: "Campo obrigatório",
                        minLength: {
                            value: 2,
                            message: "Campo obrigatório"
                        },
                        onChange: (e) => {
                            if (e.target.value.length > 4) {
                                clearErrors("restaurantName");
                            }
                            setRestaurantName(e.target.value);
                        }
                    })}
                />

                <Controller
                    name="cnpj"
                    control={control}
                    rules={{
                        validate: (value) => {
                            const digits = value?.replace(/\D/g, '') || '';
                            if (digits.length > 0 && digits.length < 14) {
                                return "Digite os 14 dígitos do CNPJ";
                            }
                            return true;
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor="cnpj" className="label">
                                CNPJ
                                {fieldState.error && (
                                    <span className="span-error">
                                        {fieldState.error.message}
                                    </span>
                                )}
                            </label>

                            <IMaskInput
                                {...field}
                                mask="00.000.000/0000-00"
                                placeholder="00.000.000/0000-00"
                                className={`input mb-2 ${fieldState.error ? "input-error" : ""}`}
                                onAccept={(value) => field.onChange(value)}
                            />
                        </>
                    )}
                />

                <label htmlFor="ownersName" className="label">
                    Nome do Proprietário *
                    {errors.ownersName && (
                        <span className="span-error">
                            {errors.ownersName.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    id="ownersName"
                    type="text"
                    className={`input mb-2 ${errors.ownersName ? "input-error" : ""} autofill:text-black`}
                    placeholder="Proprietário"
                    {...register("ownersName", {
                        required: "Campo obrigatório",
                        minLength: {
                            value: 2,
                            message: "Campo obrigatório"
                        },
                        onChange: (e) => {
                            if (e.target.value.length > 4) {
                                clearErrors("ownersName");
                            }
                            setOwnersName(e.target.value);
                        }
                    })}
                />

                <Controller
                    name="cpf"
                    control={control}
                    rules={{
                        required: "Campo obrigatório",
                        validate: (value) => {
                            const digits = value?.replace(/\D/g, '') || '';
                            if (digits.length > 0 && digits.length < 11) {
                                return "Digite os 11 dígitos do CPF";
                            }
                            return true;
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor="cpf" className="label">
                                CPF *
                                {fieldState.error && (
                                    <span className="span-error">
                                        {fieldState.error.message}
                                    </span>
                                )}
                            </label>

                            <IMaskInput
                                {...field}
                                mask="000.000.000-00"
                                placeholder="000.000.000-00"
                                className={`input mb-2 ${fieldState.error ? "input-error" : ""}`}
                                onAccept={(value) => field.onChange(value)}
                            />
                        </>
                    )}
                />

                <Controller
                    name="number"
                    control={control}
                    rules={{
                        required: "Campo obrigatório",
                        pattern: {
                            value: /^\(\d{2}\) \d{5}-\d{4}$/,
                            message: "Digite no formato (99) 99999-9999",
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor="cpf" className="label">
                                Celular *
                                {fieldState.error && (
                                    <span className="span-error">
                                        {fieldState.error.message}
                                    </span>
                                )}
                            </label>
                            <IMaskInput
                                {...field}
                                mask="(00) 00000-0000"
                                placeholder="(99) 99999-9999"
                                className={`input mb-2 ${errors.number ? 'input-error' : ''}`}
                                onAccept={(value) => field.onChange(value)}
                            />
                        </>

                    )}
                />

                <label htmlFor="email" className="label">
                    Email *
                    {errors.email && (
                        <span className="span-error">
                            {errors.email.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    id="email"
                    type="email"
                    className={`input mb-2 ${errors.email ? "input-error" : ""}`}
                    placeholder="restaurante@email.com"
                    {...register("email", {
                        required: "Campo obrigatório",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Digite um e-mail válido",
                        },
                    })}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Senha é obrigatória",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message: "Campo obrigatório",
                        },
                    }}
                    render={({ field, fieldState }) => {
                        const password = field.value || '';
                        const requirements = [
                            { id: 1, text: "8 caracteres", regex: /.{8,}/ },
                            { id: 2, text: "Letra maiúscula", regex: /[A-Z]/ },
                            { id: 3, text: "Letra minúscula", regex: /[a-z]/ },
                            { id: 4, text: "Número", regex: /\d/ },
                            { id: 5, text: "Caractere especial", regex: /[\W_]/ }
                        ];

                        return (
                            <div className="relative">
                                <label htmlFor="password" className="label">
                                    Senha *
                                    {fieldState.error && (
                                        <span className="span-error">
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </label>

                                <div className="relative flex items-center">
                                    <input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="crie sua senha"
                                        className={`input mb-2 mt-1 !pr-10 ${fieldState.error ? "input-error" : ""}`}
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                                    </button>
                                </div>

                                <div className="mb-4 text-sm text-gray-500">
                                    {requirements.map(req => (
                                        <div
                                            key={req.id}
                                            className={`flex items-center ${req.regex.test(password) ? 'text-green-700' : ''}`}
                                        >
                                            {req.regex.test(password) ? (
                                                <IoCheckmarkCircleOutline className="w-4 h-4 mr-1" />
                                            ) : (
                                                <IoCheckmarkCircleSharp className="w-4 h-4 mr-1 text-gray-300" />
                                            )}
                                            {req.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }}
                />
            </div>

            <button
                className="primary-button w-[250px] "
                onClick={handleSubmit(onLogin)}
                disabled={loading}
            >
                {loading ? 'Carregando...' : 'Criar conta'}
            </button>
        </form>
    );
};

export { RegisterContainer };
