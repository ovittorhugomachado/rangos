import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginContainerProps, LoginFormData } from "../../types/login.d";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { InputEmail } from "./input-email/index";


const RecoverPasswordContainer = ({
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
        <div className="primary-component w-120 h-110 gap-3 mx-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">

                <Link
                    to="/login"
                    className="flex gap-2 items-center justify-center absolute top-2.5 left-4"
                >
                    <span className="translate-y-[1px]"><FaArrowLeft /></span>Fazer login
                </Link>

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

                {error && (
                    <p className="text-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="primary-button w-[280px] self-center mt-4"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Recuperar senha"}
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
            </div>

        </div>
    );
};

export { RecoverPasswordContainer };