import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { UpdateMenuItemForm } from "../../../../forms/create-update-menu-item";
import { deleteMenuItemService } from "../../../../../services/menu-store";
import { MdOutlineEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { uploadMenuItemImage } from "../../../../../services/upload-image";

interface ItemProps {
    image?: string;
    name: string;
    description: string;
    price: number | string;
    categoryId: number;
    id: number;
    onUpdated?: () => void;
}

export const Item = ({
    image,
    name,
    description,
    price,
    categoryId,
    id,
    onUpdated,
}: ItemProps) => {

    const [error, setError] = useState<string | null>(null);
    const [imageVersion, setImageVersion] = useState(Date.now());
    const [showFormUpdateMenuItem, setShowFormUpdateMenuItem] = useState<number | null>(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await uploadMenuItemImage(categoryId, id, file);
                setImageVersion(Date.now());
                setError(null);
                if (onUpdated) onUpdated();
            } catch (error) {
                console.error("Erro ao enviar imagem:", error);
                setError(error instanceof Error ? error.message : 'Erro ao enviar imagem');
            }
        }
    };

    return (
        <>
            <div className="w-[150px] h-[150px] relative">
                <img src={image ? `${image}?v=${imageVersion}` : "../prato.png"} alt="" className="w-[150px] h-[150px] object-cover" />
                <button
                    type="button"
                    title="Configurar Banner da loja"
                    className="w-6 h-6 sm:w-8 sm:h-8 absolute bottom-0 text-black bg-white bg-opacity-70 m-2 border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={handleButtonClick}
                >
                    <FaCamera className="text-black" />
                </button>
            </div>
            <div className="flex flex-col justify-between py-4 px-4">
                <h1 className="font-bold">{name}</h1>
                <p className="font-light">{description}</p>
                <h3>R$ {Number(price.toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h3>
            </div>
            {showFormUpdateMenuItem === id && (
                <UpdateMenuItemForm
                    onClose={() => setShowFormUpdateMenuItem(null)}
                    categoryId={categoryId}
                    onUpdated={() => onUpdated && onUpdated()}
                    itemId={id}
                    initialData={{ name, description, price }}
                />
            )}
            <div className="flex top-[-11px] right-[10px] absolute">
                <button
                    title="Renomear categoria"
                    className="rounded-full w-5 h-5 z-2 flex items-center justify-center bg-blue-800 text-white border-[1px] border-amber-50 cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => setShowFormUpdateMenuItem(id)}
                >
                    <MdOutlineEdit className="text-sm" />
                </button>
                <button
                    title="Excluir categoria"
                    className="w-5 h-5 ml-2 z-2 flex items-center justify-center bg-red-600 text-white rounded-full border-[1px] border-amber-50 cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={async () => {
                        await deleteMenuItemService(id);
                        if (onUpdated) onUpdated();
                    }}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
            />
            {error && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded shadow text-xs z-10">
                    {error}
                </div>
            )}
        </>
    )
}