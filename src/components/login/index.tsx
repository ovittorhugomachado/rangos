import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginContainerProps, LoginFormData } from "../../types/login.d";
import { FaArrowRight } from "react-icons/fa";
import { InputEmail } from "./input-email";
import { InputPassword } from "./input-password";

const LoginContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: LoginContainerProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleLoginSubmit: SubmitHandler<LoginFormData> = (data) => {
        try {
            onSubmit(data);
            clearErrors();
        } catch (error) {
            if (error instanceof Error) {
                setError('root.serverError', {
                    type: 'server',
                    message: error.message,
                });
            } else {
                setError('root.serverError', {
                    type: 'server',
                    message: 'Erro desconhecido',
                });
            }
        }
    };

    return (
        <div className="primary-component w-120 h-120 mx-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
            <img
                className="w-35 hidden dark:block"
                src="../logo-white.png"
                alt="domus-logo"
            />
            <img
                className="w-35 block dark:hidden"
                src="../logo-black.png"
                alt="domus-logo"
            />
            <form onSubmit={handleSubmit(handleLoginSubmit)} noValidate className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-4">
                <InputEmail
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                />
                <InputPassword
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                />
                {error && (
                    <p className="text-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="primary-button w-[250px] self-center mt-4"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Entrar"}
                </button>
            </form>

            <div className="flex flex-col mb-5 gap-4">
                <Link
                    to="/register"
                    className="link text-center"
                >
                    Ainda não tem conta?{" "}
                    <strong className="whitespace-nowrap">
                        Criar conta <FaArrowRight className="inline" />
                    </strong>
                </Link>

                <Link
                    to="/recover-password"
                    className="link text-center"
                >
                    Esqueci minha senha
                </Link>
            </div>
        </div>
    );
};

export { LoginContainer };
