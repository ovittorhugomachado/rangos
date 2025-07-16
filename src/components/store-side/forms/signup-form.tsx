import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AccountData, AccountContainerProps } from "../../../types/types-account.d";
import { InputCNPJ } from "../inputs/store-cnpj-input";
import { InputRestaurantName } from "../inputs/store-restaurant-name-input";
import { InputOwnersName } from "../inputs/store-owners-name-input";
import { InputCPF } from "../inputs/store-cpf-input";
import { InputPhoneNumber } from "../inputs/store-phone-number-input";
import { InputEmail } from "../inputs/store-email-input";
import { InputPasswordRegister } from "../inputs/store-password-register-input";
import { Logo } from "../../logo-component";

export const SignupFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountContainerProps) => {

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<AccountData>({
        defaultValues: {
            restaurantName: '',
            cnpj: '',
            ownersName: '',
            cpf: '',
            phoneNumber: '',
            email: '',
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

                    <InputRestaurantName
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />

                    <InputCNPJ
                        control={control}
                        initialValues={initialValues}
                    />

                    <InputOwnersName
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />

                    <InputCPF
                        control={control}
                        initialValues={initialValues}
                    />

                    <InputPhoneNumber
                        control={control}
                        initialValues={initialValues}
                    />

                    <InputEmail
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />

                    <InputPasswordRegister
                        register={register}
                        watch={watch}
                        errors={errors}
                        clearErrors={clearErrors}
                    />

                </div>
                {error && (
                    <p className="text-error">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    className="primary-button w-[250px]"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Criar conta"}
                </button>
            </form>
        </div>
    );
};
