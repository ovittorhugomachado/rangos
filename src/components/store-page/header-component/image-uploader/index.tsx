import React, { useRef } from "react";
import { UploadProfileImage } from "../../../../utils/upload-profile-image";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useAuth } from "../../../../hooks/use-auth";

interface ImageUploaderProps {
    userId: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = () => {

    const { user } = useAuth(); //hook que autentifica o usuário e retorna dados da conta logada

    const fileInputRef = useRef<HTMLInputElement>(null); //cria uma ref para o <input type="file" />
    //Isso permite acessar diretamente o elemento DOM para, por exemplo, disparar um clique programaticamente.

    const handleClick = () => {
        fileInputRef.current?.click(); //Abre o seletor de arquivos
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { //Função asspincrona chamada quando o valor do input muda
        const file = e.target.files?.[0]; //Pega o primeiro arquivo selecionado
        if (!file) return;

        const token = localStorage.getItem('token'); //Pega o token no localstorage

        if (!token) { //executa se não tiver token
            alert('Usuário não autenticado');
            return;
        }

        try {
            const id = Number(user?.id) //pega o user.id que vem do hook auth e atribui a variável id tranformando em número
            await UploadProfileImage(id, file); //Faz a requisição para subir imagem colocando os dois parametros;
            //id: identifica o registro de qual usuário vai mudar, file: o arquvio enviado
            alert('Upload concluído!');
            window.location.reload();//depois do sucesso da requisição recarrega página
        } catch (error) {
            console.error(error);
            alert('Erro no upload');
        }
    };

    return (
        <>
            <span
                className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gray-300 absolute right-[-9px] translate-y-[-2px] xs:translate-y-[-32px] cursor-pointer flex items-center justify-center"
                onClick={handleClick}
            >
                <MdOutlinePhotoCamera className="w-8 text-black" />
            </span>

            <input
                type="file"
                accept="image/*"
                className="sr-only"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>
    );
};