export const ErrorComponent = ({ message }: { message: string }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24 m-2">
            <img src="../error.png" alt="Erro" className="w-24 h-24" />
            <h2 className="text-red-600 text-xl font-bold mb-4">Oops</h2>
            <p className="text-lg text-center font-extralight text-black dark:text-zinc-200">{message}</p>
        </div>
    );
};

