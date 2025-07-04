import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { UploadLogo } from "../../../../../services/upload-image";

export const Logo = ({ logo, onImageChange }: { logo: string; onImageChange: () => void; }) => {
    const [logoVersion, setLogoVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await UploadLogo(file);
                setLogoVersion(Date.now());
                setError(null);
                onImageChange();
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro ao enviar imagem. Por favor, tente novamente mais tarde.");
                }
            }
        }
    };

    return (
        <div className={"w-16 h-16 sm:w-23 sm:h-23 rounded-full relative mb-1.5"}>
            <img
                src={logo ? `${logo}?v=${logoVersion}` : "/logo-default.png"}
                alt="logo"
                className="w-full h-full object-cover rounded-full"
            />
            <button
                type="button"
                title="Alterar logo da loja"
                className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-70 border-2 border-black absolute bottom-0 left-0 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={handleButtonClick}
            >
                <FaCamera className="text-black" />
            </button>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
            />
            {error && (
                <div className="bg-red-600 text-white absolute top-2 right-2 px-3 py-1 rounded shadow text-xs z-10">
                    {error}
                </div>
            )}
        </div>
    );
};