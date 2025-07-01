import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { UploadBannerImage } from "../../../../services/upload-image";

const StoreBanner = ({ banner, onBannerChange }: { banner: string, onBannerChange: () => void }) => {
    const [bannerVersion, setBannerVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await UploadBannerImage(file);
                setBannerVersion(Date.now());
                setError(null);
                onBannerChange();
            } catch (error) {
                console.error("Erro ao enviar imagem:", error);
                setError("Erro ao enviar imagem. Por favor, tente novamente.");
            }
        }
    };

    return (
        <div className="relative hidden xs:block">
            <img src={banner ? `${banner}?v=${bannerVersion}` : ""} alt="imagem-capa" className="w-screen h-40 md:h-56 lg:h-72 object-cover" />
            <button
                type="button"
                className="rounded-full absolute bottom-2 left-2 border-2 bg-white bg-opacity-40 border-black cursor-pointer px-4 py-1 hover:scale-105 transition-all duration-200"
                onClick={handleButtonClick}
            >

                <span className="flex items-center justify-center gap-1 text-xs text-zinc-700">
                    <FaCamera className="text-black" />
                    Alterar imagem do banner
                </span>
                <span className=" text-[10px] text-zinc-700 px-2 py-1 shadow">
                    *Recomenda-se 2000x527px
                </span>
            </button>
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
        </div>
    );
};

export { StoreBanner };