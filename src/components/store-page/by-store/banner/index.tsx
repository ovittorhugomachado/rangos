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
                setError("Erro ao enviar imagem. Por favor, tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="relative hidden xs:block">
            <img src={banner ? `${banner}?v=${bannerVersion}` : "/store-banner-default.png"} alt="imagem-capa" className="w-screen h-full object-cover" />
            <div className="flex items-center gap-2 absolute bottom-2 left-2">
                <button
                    type="button"
                    title="Configurar Banner da loja"
                    className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-white bg-opacity-70 xl:m-2 border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={handleButtonClick}
                >
                    <FaCamera className="text-black" />
                </button>
                <span className="h-5 hidden sm:flex items-center text-[10px] bg-white rounded-full text-zinc-700 px-2 py-1 shadow">
                    *Recomenda-se 2000x527px
                </span>
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
        </div>
    );
};

export { StoreBanner };