import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountContainerProps, AccountFormData } from "../../types/account-types.d";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { InputEmail } from "../inputs/input-email";


const RecoverPasswordFormContainer = ({
    onSubmit,
    error,
    message,
    initialValues = {},
    isLoading = false,
}: AccountContainerProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<AccountFormData>({
        defaultValues: {
            email: '',
            ...initialValues,
        },
    });

    const handleLoginSubmit: SubmitHandler<AccountFormData> = (data) => {
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
        <div className="primary-component w-120 gap-3 mx-3 pt-20 pb-10 p-5 flex flex-col justify-center items-center">

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

            {message === "" && (
                <>
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

                        <p className="text-center">{message}</p>

                        <button
                            type="submit"
                            className="primary-button self-center mt-4"
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
                </>
            )}
            {message !== "" && (
                <>
                    <h1 className="text-center mt-4 mb-12">{message}</h1>
                </>
            )}

        </div>
    );
};

export { RecoverPasswordFormContainer };