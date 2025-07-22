import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { Logo } from "../../component-logo";
import { InputCNPJ } from "../inputs/input-store-cnpj";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputOwnersName } from "../inputs/input-store-owners-name";
import { InputCPF } from "../inputs/input-store-cpf";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputEmail } from "../inputs/input-store-email";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { FaArrowLeft } from "react-icons/fa";

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
        <div className="w-[90%] max-w-[450px] pt-10 pb-10 flex flex-col justify-center items-center gap-3">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                className="w-full max-w-105 relative primary-component py-12 px-4 flex flex-col justify-center items-center gap-4"
            >
                <Link
                    to="/entrar"
                    className="absolute top-2.5 left-4 flex items-center justify-center gap-2"
                >
                    <span className="translate-y-[1px]"><FaArrowLeft /></span>Fazer login
                </Link>
                <Logo />
                <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
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
                    className="w-[250px] primary-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Criar conta"}
                </button>
            </form>
        </div>
    );
};
