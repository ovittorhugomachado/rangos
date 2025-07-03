import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AccountData, AccountContainerProps } from "../../../types/account-types.d";
import { InputPasswordRegister } from "../../inputs/input-password-register";
import { Logo } from "../../logo";

const CreateNewPasswordFormContainer = ({
    onSubmit,
    message,
    initialValues = {},
    isLoading = false,
}: AccountContainerProps) => {

    const {
        register,
        handleSubmit,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<AccountData>({
        defaultValues: {
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<AccountData> = (data) => {
        onSubmit(data);
    };

    return (

        <div className="primary-component w-120 gap-3 mx-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col justify-center items-center mt-5 mb-5 w-full max-w-105 gap-4">

                <Link
                    to="/entrar"
                    className="flex gap-2 items-center justify-center absolute top-2.5 left-4"
                >
                    <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                </Link>

                <Logo />

                <div className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-1">

                    <InputPasswordRegister
                        register={register}
                        watch={watch}
                        errors={errors}
                        clearErrors={clearErrors}
                    />

                </div>

                {<p className="text-error">
                    {message}
                </p>}

                <button
                    type="submit"
                    className="primary-button w-[250px]"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Redefinir senha"}
                </button>
            </form>
        </div>

    );
};

export { CreateNewPasswordFormContainer };
