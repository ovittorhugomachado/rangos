import { useAppSettings } from "../hooks/use-app-settings"

export const LoadingComponent = () => {

    const { fontSize } = useAppSettings();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 border-2 border-primary border-t-0 rounded-full animate-spin" />
            <p className={`${fontSize} text-black dark:text-white`}>
                Carregando
            </p>
        </div>
    );
};