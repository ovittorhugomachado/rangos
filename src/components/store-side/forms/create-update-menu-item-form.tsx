import React, { useEffect, useState } from "react";
import { createMenuItemService, updateMenuItemByCategoryService } from "../../../services/menu-store";
import { ErrorComponent } from "../../error-component";
import { LoadingComponent } from "../../loading-component";
import { IoCloseOutline } from "react-icons/io5";
import { InputName } from "../inputs/store-menu-item-name-input";
import { useForm } from "react-hook-form";
import { InputPrice } from "../inputs/store-menu-item-price-input";

interface CreateMenuItemProps {
    onClose: () => void;
    onCreated?: () => void;
    isLoading?: boolean;
    error?: string;
    message?: string;
    categoryId?: number;
}

interface UpdateMenuItemProps {
    onClose: () => void;
    onUpdated?: () => void;
    categoryId: number;
    itemId: number;
    initialData: {
        name: string;
        description: string;
        price: number | string;
    };
}

interface MenuItemFormData {
    name: string;
    description: string;
    price: string;
    itemId?: number;
    message: string;
    error: unknown;
}

export const MenuItemCreationForm: React.FC<CreateMenuItemProps> = ({
    onClose,
    onCreated,
    categoryId
}) => {

    const {
        register,
        clearErrors,
        setError,
        formState: { errors },
        handleSubmit
    } = useForm<MenuItemFormData>();

    const [error, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");

    useEffect(() => {
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);

    const handleFormSubmit = async (data: MenuItemFormData) => {
        setLoading(true);
        setErrorMessage("");

        const priceRegex = /^\d+,\d{2}$/;
        if (!priceRegex.test(data.price)) {
            setError("price", { message: "Valor inválido" });
            setLoading(false);
            return;
        }

        const parsedPrice = Number(data.price.replace(',', '.'));
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("price", { message: "Preço inválido" });
            setLoading(false);
            return;
        }
        try {
            if (categoryId === undefined) {
                setErrorMessage("Categoria não selecionada.");
                setLoading(false);
                return;
            }
            await createMenuItemService(categoryId, {
                name: data.name,
                description: data.description ?? undefined,
                price: parsedPrice,
            });
            if (onCreated) onCreated();

            setMessageSuccess("Item criado com sucesso!");
            onClose()
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Erro ao criar item");
        } finally {
            setLoading(false);
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
                            <h3 className="text-lg md:text-2xl text-center mb-3">Cria novo</h3>
                            <InputName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <label
                                htmlFor="description"
                                className="flex justify-between"
                            >
                                Descrição
                                {errors.description && (
                                    <span className="span-error">
                                        {errors.description.message?.toString()}
                                    </span>
                                )}
                            </label>
                            <textarea
                                {...register("description", { required: "Descrição obrigatória" })}
                                className={`input h-32 mb-2.5 ${errors.description ? "input-error" : ""}`}
                                placeholder="Descrição"
                            />
                            <InputPrice
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                initialValues={{}}
                            />
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
                            Criar item
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export const UpdateMenuItemForm: React.FC<UpdateMenuItemProps> = ({
    onClose,
    onUpdated,
    categoryId,
    itemId,
    initialData
}) => {
    const {
        register,
        clearErrors,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm<MenuItemFormData>({
        defaultValues: {
            name: initialData.name,
            description: initialData.description,
            price: typeof initialData.price === "number"
                ? initialData.price.toFixed(2).replace('.', ',')
                : Number(initialData.price.toString().replace(',', '.')).toFixed(2).replace('.', ','),
        }
    });

    const [error, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");

    useEffect(() => {
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);

    const handleFormSubmit = async (data: MenuItemFormData) => {
        setLoading(true);
        setErrorMessage("");

        const priceRegex = /^\d+,\d{2}$/;
        if (!priceRegex.test(data.price)) {
            setError("price", { message: "Valor inválido" });
            setLoading(false);
            return;
        }

        const parsedPrice = Number(data.price.replace(',', '.'));
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("price", { message: "Preço inválido" });
            setLoading(false);
            return;
        }
        try {
            await updateMenuItemByCategoryService(categoryId, itemId, {
                name: data.name,
                description: data.description,
                price: parsedPrice,
            });
            if (onUpdated) onUpdated();

            setMessageSuccess("Item atualizado com sucesso!");
            onClose();
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Erro ao atualizar item");
        } finally {
            setLoading(false);
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
                            <h3 className="text-lg md:text-2xl text-center mb-3">Editar item</h3>
                            <InputName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <label
                                htmlFor="description"
                                className="flex justify-between"
                            >
                                Descrição
                                {errors.description && (
                                    <span className="span-error">
                                        {errors.description.message?.toString()}
                                    </span>
                                )}
                            </label>
                            <textarea
                                {...register("description", { required: "Descrição obrigatória" })}
                                className={`input h-32 mb-2.5 ${errors.description ? "input-error" : ""}`}
                                placeholder="Descrição"
                            />
                            <InputPrice
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                initialValues={{}}
                            />
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
                            Salvar alterações
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};