import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { Logo } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const RecoverPasswordFormContainer = ({
    onSubmit,
    error,
    message,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            email: '',
            ...initialValues,
        },
    });

    const handleRecoverPasswordSubmit: SubmitHandler<AccountData> = (data) => {
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
            {message === "" && (
                <>
                    <form
                        onSubmit={handleSubmit(handleRecoverPasswordSubmit)}
                        noValidate
                        className="w-full max-w-105 relative primary-component py-12 px-4 flex flex-col justify-center items-center gap-4"
                    >
                        <Link
                            to="/entrar"
                            className="absolute top-2.5 left-4 flex items-center justify-center gap-2"
                        >
                            <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                        </Link>
                        <Logo />
                        <InputEmail
                            register={register}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                        {error && (
                            <p className="text-error">{error}</p>
                        )}
                        <p className="text-center">{message}</p>
                        <button
                            type="submit"
                            className="w-[270px] primary-button mt-4 self-center"
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Recuperar senha"}
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
                        </div>
                    </form>
                </>
            )}
            {message !== "" && (
                <>
                    <Logo />
                    <h1 className="text-black dark:text-white my-4 text-center">{message}</h1>
                    <Link
                        to="/entrar"
                        className="flex items-center gap-3 primary-button"
                    >
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>
                        Fazer login
                    </Link>
                </>
            )}
        </div>
    );
};