import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getStoreData, updateStoreData } from "../../../services/store-data";
import { ErrorComponent } from "../../error";
import { LoadingComponent } from "../../loading";
import { AccountData } from "../../../types/account-types.d";
import { CheckboxDeliveryTypesInput } from "../../inputs/input-delivery-types";
import { InputRestaurantName } from "../../inputs/input-restaurent-name";
import { InputPhoneNumber } from "../../inputs/input-phone-number";
import { InputAddress } from "../../inputs/input-address";
import { IoCloseOutline } from "react-icons/io5";

interface UpdateStoreDataFormProps {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    initialValues?: Partial<AccountData>;
    message?: string;
};

export const UpdateStoreDataForm: React.FC<UpdateStoreDataFormProps> = ({
    onClose,
    initialValues = {},
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        clearErrors,
        formState: { errors },
    } = useForm<AccountData>({
        defaultValues: {
            restaurantName: "",
            address: "",
            phoneNumber: "",
            delivery: false,
            pickup: false,
            ...initialValues,
        },
    });

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [messageSuccess, setMessageSuccess] = useState("")
    const [lastData, setLastData] = useState<Partial<AccountData> | null>(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true)
            try {
                const response = await getStoreData();

                setValue("restaurantName", response.restaurantName)
                setValue("address", response.address)
                setValue("phoneNumber", response.phoneNumber)
                setValue("delivery", response.delivery)
                setValue("pickup", response.pickup)
                setLastData({
                    restaurantName: response.restaurantName,
                    address: response.address,
                    phoneNumber: response.phoneNumber,
                    delivery: response.delivery,
                    pickup: response.pickup,
                });

            } catch (error: unknown) {
                console.log(error)
                setError(error instanceof Error ? error.message : 'Erro ao carregar os dados da loja');

            } finally {
                setLoading(false)
            }
        };

        fetchStoreData()
    }, [setValue]);

    useEffect(() => {
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);

    const handleFormSubmit: SubmitHandler<AccountData> = async (data) => {
        if (
            lastData &&
            data.restaurantName === lastData.restaurantName &&
            data.address === lastData.address &&
            data.phoneNumber === lastData.phoneNumber &&
            data.delivery === lastData.delivery &&
            data.pickup === lastData.pickup
        ) {
            console.log()
            setMessageSuccess("");
            return;
        }

        try {
            await updateStoreData(data);
            setMessageSuccess("Dados atualizados com sucesso!");
            setError("");
            setLastData({
                restaurantName: data.restaurantName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                delivery: data.delivery,
                pickup: data.pickup,
            });
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Erro ao carregar os dados da loja');
            setMessageSuccess("");
        }
    };

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : (loading) ? (
                <div className="primary-component w-120 h-90 mx-3 pt-25 pb-20 p-5 flex flex-col justify-center items-center">
                    <LoadingComponent />
                </div>
            ) : (
                <div className="fixed inset-0 z-30 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        noValidate
                        className="primary-component z-50 relative bg-white mx-3 pt-25 pb-20 p-5 w-120 h-110 flex flex-col justify-center items-center mt-0 mb-5 max-w-105 gap-4"
                    >
                        <button
                            type="button"
                            className="bg-red-600 text-white rounded-full p-2 absolute top-2 right-2 cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <div className="flex flex-col mt-5 mb-5 w-full max-w-105 gap-1">
                            <InputRestaurantName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                initialValues={initialValues}
                            />
                            <InputAddress
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                initialValues={initialValues}
                            />
                            <InputPhoneNumber
                                control={control}
                                initialValues={initialValues}
                            />
                            <CheckboxDeliveryTypesInput
                                register={register}
                            />

                        </div>
                        {error && (
                            <p className="text-error">
                                {error}
                            </p>
                        )}
                        {messageSuccess && (
                            <p className="text-green-600 font-bold">
                                {messageSuccess}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="primary-button w-[250px]"
                        >
                            Atualizar Dados
                        </button>
                    </form>
                </div>
            )
            }
        </>

    );
};
