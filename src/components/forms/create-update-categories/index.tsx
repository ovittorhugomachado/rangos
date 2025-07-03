import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export const CreateCategoryForm = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (name: string) => void }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <form
                className="max-w-[600px] h-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-between gap-4 w-full py-10 mx-1.5 relative"
                onSubmit={handleSubmit}
            >
                <button
                    type="button"
                    className="bg-red-600 text-white rounded-full p-2 absolute top-2 right-2 cursor-pointer transition-all duration-200"
                    onClick={onClose}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
                <h3 className="text-lg md:text-2xl">Criar nova categoria</h3>
                <div className="flex items-start justify-center flex-col w-full max-w-[300px]">
                    <label htmlFor="category-name" className="text-md">Nome</label>
                    <input
                        type="text"
                        id="category-name"
                        placeholder="Nome da categoria"
                        className="border rounded px-3 py-2 w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        type="submit"
                        className="confirm-button"
                    >
                        Criar categoria
                    </button>
                </div>
            </form>
        </div>
    );
};

export const UpdateCategoryForm = ({
    onClose, 
    onSubmit,
    initialName = ""
}: { onClose: () => void, 
    onSubmit: (name: string) => void,
    initialName?: string    
}) => {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(initialName);
    }, [initialName]);  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <form
                className="max-w-[600px] h-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-between gap-4 w-full py-10 mx-1.5 relative"
                onSubmit={handleSubmit}
            >
                <button
                    type="button"
                    className="bg-red-600 text-white rounded-full p-2 absolute top-2 right-2 cursor-pointer transition-all duration-200"
                    onClick={onClose}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
                <h3 className="text-lg md:text-2xl">Renomear categoria</h3>
                <div className="flex items-start justify-center flex-col w-full max-w-[300px]">
                    <label htmlFor="category-name" className="text-md">Nome</label>
                    <input
                        type="text"
                        id="category-name"
                        placeholder="Nome da categoria"
                        className="border rounded px-3 py-2 w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        type="submit"
                        className="confirm-button"
                    >
                        Atualizar categoria
                    </button>
                </div>
            </form>
        </div>
    );
};
