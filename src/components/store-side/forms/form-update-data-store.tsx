import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getStoreData, updateStoreData } from "../../../services/service-store-data";
import { UpdateStoreDataFormProps } from "../../../types/types-data-forms.d";
import { AccountData } from "../../../types/types-account.d";
import { ErrorComponent } from "../../component-error";
import { LoadingComponent } from "../../component-loading";
import { CheckboxDeliveryTypesInput } from "../inputs/input-store-delivery-type";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputAddress } from "../inputs/input-store-address";
import { IoCloseOutline } from "react-icons/io5";
import { RestaurantData } from "../../../types/types-restaurante-data.d";

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
    } = useForm<RestaurantData>({
        defaultValues: {
            restaurantName: "",
            address: "",
            phoneNumber: "",
            delivery: false,
            pickup: false,
            ...initialValues,
        },
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [lastData, setLastData] = useState<Partial<RestaurantData> | null>(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                const response = await getStoreData();

                setValue("restaurantName", response.restaurantName);
                setValue("address", response.address);
                setValue("phoneNumber", response.phoneNumber);
                setValue("delivery", response.delivery);
                setValue("pickup", response.pickup);
                setLastData({
                    restaurantName: response.restaurantName,
                    address: response.address,
                    phoneNumber: response.phoneNumber,
                    delivery: response.delivery,
                    pickup: response.pickup,
                });
            } catch (error: unknown) {
                console.error(error);
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
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
            setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            setMessageSuccess("");
        }
    };

    return (
        <>
            {error ? (
                <div className="fixed z-30 flex items-center justify-center w-screen h-screen bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 flex flex-col items-center justify-center w-120 h-90 mx-3 p-5 pt-25 pb-20 bg-white dark:bg-black border border-zinc-400 rounded-xl">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <ErrorComponent message={error} />
                    </div>
                </div>
            ) : loading ? (
                <div className="fixed z-30 flex items-center justify-center w-screen h-screen bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 flex flex-col items-center justify-center w-120 h-90 mx-3 p-5 pt-25 pb-20 bg-white dark:bg-black border border-zinc-400 rounded-xl">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <LoadingComponent />
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 z-30 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        noValidate
                        className="relative z-50 flex flex-col items-center justify-center w-120 max-w-115 mx-3 mt-0 mb-5 p-5 py-4 gap-4 bg-white dark:bg-black primary-component"
                    >
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <div className="flex flex-col w-full max-w-105 mt-5 mb-5 gap-1">
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
                            <CheckboxDeliveryTypesInput register={register} />
                        </div>
                        {error && (
                            <p className="font-bold text-error">{error}</p>
                        )}
                        {messageSuccess && (
                            <p className="font-bold text-green-600">{messageSuccess}</p>
                        )}
                        <button
                            type="submit"
                            className="w-[250px] primary-button"
                        >
                            Atualizar Dados
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};