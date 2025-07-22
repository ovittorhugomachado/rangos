export const StoreBanner = ({ banner }: { banner: string }) => {
    
    return (
        <div className="w-full h-full relative hidden xs:block">
            <img src={banner}
                alt="banner-restaurante"
                className="w-screen h-full object-cover" />
        </div>
    );
};