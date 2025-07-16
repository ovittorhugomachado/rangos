import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { Logo } from "../../component-logo";
import { InputCNPJ } from "../inputs/input-store-cnpj";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputOwnersName } from "../inputs/input-store-owners-name";
import { InputCPF } from "../inputs/input-store-cpf";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputEmail } from "../inputs/input-store-email";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { FaArrowLeft } from "react-icons/fa";
import { RestaurantData } from "../../../types/types-restaurante-data.d";

export const SignupFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
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
