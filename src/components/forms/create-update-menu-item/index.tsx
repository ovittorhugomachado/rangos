import React, { useEffect, useState } from "react";
import { createMenuItemService } from "../../../services/menu-store";
import { ErrorComponent } from "../../error";
import { LoadingComponent } from "../../loading";
import { IoCloseOutline } from "react-icons/io5";

interface CreateMenuItemProps {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    message?: string;
    categoryId?: number; 
}

export const MenuItemCreationForm: React.FC<CreateMenuItemProps> = ({
    onClose,
    categoryId
}) => {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                console.log("teste")

            } catch (error: unknown) {
                console.log(error);
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, []);

    useEffect(() => {
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (categoryId === undefined) {
                setError("Categoria não selecionada.");
                return;
            }
            await createMenuItemService(categoryId, {
                name,
                description,
                price: Number(price),
            });
            setMessageSuccess("Item criado com sucesso!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro ao criar item");
            }
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
                        onSubmit={handleFormSubmit}
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
                                                        <label htmlFor="imageUrl">Imagem do item</label>
                            <input
                                id="imageUrl"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="URL da imagem"
                                className="input"
                            />
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={e =>
                                    setName(e.target.value)}
                                placeholder="Nome" 
                                className="input"
                                />
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Descrição"
                                className="input h-32"
                            />
                            <label htmlFor="price">Preço</label>
                            <input
                                id="price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Preço"
                                className="input"
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