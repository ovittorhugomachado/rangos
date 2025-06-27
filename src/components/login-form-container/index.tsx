import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { InputEmail } from "../inputs/input-email";
import { InputPassword } from "../inputs/input-password";
import { AccountContainerProps, AccountData } from "../../types/account-types.d";
import { Logo } from "../logo";

const LoginFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountContainerProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        watch,
        formState: { errors },
    } = useForm<AccountData>({
        defaultValues: {
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleAccountData: SubmitHandler<AccountData> = (data) => {
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
            <Logo/>
            <form onSubmit={handleSubmit(handleAccountData)} noValidate className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-4">
                <InputEmail
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                />
                <InputPassword
                    register={register}
                    watch={watch}
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
                    to="/criar-conta"
                    className="link text-center"
                >
                    Ainda não tem conta?{" "}
                    <strong className="whitespace-nowrap">
                        Criar conta <FaArrowRight className="inline" />
                    </strong>
                </Link>

                <Link
                    to="/recuperar-senha"
                    className="link text-center"
                >
                    Esqueci minha senha
                </Link>
            </div>
        </div>
    );
};

export { LoginFormContainer };
