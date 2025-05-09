import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { RegisterFormData, RegisterContainerProps } from "../../types/register.d";
import { InputCNPJ } from "./inputs/input-cnpj";
import { InputRestaurantName } from "./inputs/input-restaurent-name";
import { InputOwnersName } from "./inputs/input-owners-name";
import { InputCPF } from "./inputs/input-cpf";
import { InputPhoneNumber } from "./inputs/input-phone-number";
import { InputEmail } from "./inputs/input-email";

const RegisterContainer = ({
    onSubmit,
    initialValues = {},
    isLoading = false,
}: RegisterContainerProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            restaurantName: '',
            cnpj: '',
            ownersName: '',
            cpf: '',
            number: '',
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<RegisterFormData> = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="primary-component w-120 m-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
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

                <InputRestaurantName
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                />

                <InputCNPJ
                    control={control}
                    initialValues={initialValues}
                />

                <InputOwnersName
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                />

                <InputCPF
                    control={control}
                    initialValues={initialValues}
                />

                <InputPhoneNumber
                    control={control}
                    initialValues={initialValues}
                />

                <InputEmail
                    control={control}
                    initialValues={initialValues}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Campo obrigatório",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message: "digite uma senha válida",
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

                                <div className="mb-4 text-gray-500">
                                    {requirements.map(req => (
                                        <div
                                            key={req.id}
                                            className="flex items-center"
                                        >
                                            {req.regex.test(password) ? (
                                                <IoCheckmarkCircleOutline className="w-4 h-4 mr-1 text-green-700" />
                                            ) : (
                                                <IoCheckmarkCircleSharp className="w-4 h-4 mr-1 text-zinc-600" />
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
                type="submit"
                className="primary-button w-[250px]"
                disabled={isLoading}
            >
                {isLoading ? "Carregando..." : "Criar conta"}
            </button>
        </form>
    );
};

export { RegisterContainer };
