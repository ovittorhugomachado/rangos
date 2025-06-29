import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorComponent = ({ message }: { message: string }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24 m-2">
            <Link
                to="/"
                className="flex text-black dark:text-zinc-200 gap-2 items-center justify-center absolute top-2.5 left-4"
            >
                <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
            </Link>
            <img src="../error.png" alt="Erro" className="w-24 h-24" />
            <h2 className="text-red-600 text-xl font-bold mb-4">Oops</h2>
            <p className="text-lg text-center font-extralight text-black dark:text-zinc-200">{message}</p>
        </div>
    );
};

export default ErrorComponent;
