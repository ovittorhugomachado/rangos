import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AccountFormData, AccountContainerProps } from "../../types/account-types.d";
import { InputPasswordRegister } from "../inputs/input-password-register";

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
    } = useForm<AccountFormData>({
        defaultValues: {
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<AccountFormData> = (data) => {
        onSubmit(data);
    };

    return (

        <div className="primary-component w-120 gap-3 mx-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col justify-center items-center mt-5 mb-5 w-full max-w-105 gap-4">

                <Link
                    to="/login"
                    className="flex gap-2 items-center justify-center absolute top-2.5 left-4"
                >
                    <span className="translate-y-[1px]"><FaArrowLeft /></span>Fazer login
                </Link>

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
