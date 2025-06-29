const StoreBanner = ({ banner }: { banner: string }) => {
    return (
        <>
            <img src={banner} alt="imagem-capa" className="w-screen hidden xs:block" />
        </>
    );
};

export { StoreBanner };