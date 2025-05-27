import React, { useRef } from "react";
import { UploadProfileImage } from "../../../../utils/upload-profile-image";
import { MdOutlinePhotoCamera } from "react-icons/md";

export const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // abre o seletor de arquivo
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado');
      return;
    }

    try {
      await UploadProfileImage(1, file); // exemplo com userId = 1, adapte conforme seu contexto
      alert('Upload concluído!');
    } catch (error) {
      console.error(error);
      alert('Erro no upload');
    }
  };

  return (
    <>
      <span
        className="w-6 h-6 rounded-full bg-gray-300 absolute right-[-9px] translate-y-[-32px] cursor-pointer flex items-center justify-center"
        onClick={handleClick}
      >
        <MdOutlinePhotoCamera className="w-8" />
      </span>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};