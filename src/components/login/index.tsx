import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { InputEmail } from "./input-email/intex";
import { LoginContainerProps, LoginFormData } from "../../types/login.d";
import { FaArrowRight } from "react-icons/fa";
import { InputPassword } from "./input-password";

const LoginContainer = ({
    onSubmit,
    initialValues = {},
    isLoading = false,
}: LoginContainerProps) => {

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<LoginFormData> = (data) => {
        onSubmit(data);
    };

    return (
        <div className="primary-component w-120 h-120 mx-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
            {/* <img
                className="w-35 ml-8 mb-3 hidden dark:block"
                src="../logo-white.png"
                alt="domus-logo"
            />
            <img
                className="w-35 ml-8 mb-3 block dark:hidden"
                src="../logo-black.png"
                alt="domus-logo"
            /> */}
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-4">
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

                <button
                    type="submit"
                    className="primary-button w-[250px] self-center mt-8"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Entrar"}
                </button>
            </form>

            <div className="flex flex-col gap-4">
                <a
                    href="#"
                    className="link text-center"
                >
                    Ainda não tem conta?{" "}
                    <strong className="whitespace-nowrap">
                        Criar conta <FaArrowRight className="inline" />
                    </strong>
                </a>

                <a
                    href="#"
                    className="link text-center"
                >
                    Esqueci minha senha{" "}
                </a>
            </div>
        </div>
    );
};

export { LoginContainer };
