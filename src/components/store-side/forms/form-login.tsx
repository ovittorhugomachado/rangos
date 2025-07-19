import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { Logo } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { InputPassword } from "../inputs/input-store-password";
import { FaArrowRight } from "react-icons/fa";
import { RestaurantData } from "../../../types/types-restaurante-data.d";

export const LoginFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleAccountData: SubmitHandler<RestaurantData> = (data) => {
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
        <div className="primary-component w-[90%] max-w-[450px] h-120 mx-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
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
                    className="primary-button self-center mt-4"
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

