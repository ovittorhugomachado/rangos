export const LoadingComponent = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-2 border-primary border-t-0 animate-spin rounded-full"/>
            <p className="text-white dark:text-white">Carregando</p>
        </div>

    )
}