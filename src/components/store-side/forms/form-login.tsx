import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { Logo } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { InputPassword } from "../inputs/input-store-password";
import { FaArrowRight } from "react-icons/fa";

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
        <div className="w-[90%] max-w-[450px] pt-10 pb-10 flex flex-col justify-center items-center gap-3">
            <form
                onSubmit={handleSubmit(handleAccountData)}
                noValidate
                className="w-full max-w-105 primary-component py-8 px-4 flex flex-col justify-center items-center gap-4"
            >
                <Logo />
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
                    className="w-[250px] primary-button mt-4 self-center"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Entrar"}
                </button>
                <div className="mb-5 flex flex-col gap-4">
                    <Link
                        to="/criar-conta"
                        className="text-center"
                    >
                        Ainda não tem conta?{" "}
                        <strong className="whitespace-nowrap">
                            Criar conta <FaArrowRight className="inline" />
                        </strong>
                    </Link>
                    <Link
                        to="/recuperar-senha"
                        className="text-center"
                    >
                        Esqueci minha senha
                    </Link>
                </div>
            </form>

        </div>
    );
};

