import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormData, RegisterContainerProps } from "../../types/register.d";
import { InputCNPJ } from "./inputs/input-cnpj";
import { InputRestaurantName } from "./inputs/input-restaurent-name";
import { InputOwnersName } from "./inputs/input-owners-name";
import { InputCPF } from "./inputs/input-cpf";
import { InputPhoneNumber } from "./inputs/input-phone-number";
import { InputEmail } from "./inputs/input-email";
import { InputPassword } from "./inputs/input-password";

const RegisterContainer = ({
    onSubmit,
    initialValues = {},
    isLoading = false,
}: RegisterContainerProps) => {

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            restaurantName: '',
            cnpj: '',
            ownersName: '',
            cpf: '',
            number: '',
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<RegisterFormData> = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="primary-component w-120 mx-3 pt-10 pb-10 p-5 flex flex-col justify-center items-center">
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
                    control={control}
                    initialValues={initialValues}
                />

                <InputPassword
                    register={register}
                    watch={watch}
                    errors={errors}
                    clearErrors={clearErrors}
                />

            </div>

            <button
                type="submit"
                className="primary-button w-[250px]"
                disabled={isLoading}
            >
                {isLoading ? "Carregando..." : "Criar conta"}
            </button>
        </form>
    );
};

export { RegisterContainer };
