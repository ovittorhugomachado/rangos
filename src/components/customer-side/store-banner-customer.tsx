export const StoreBanner = ({ banner }: { banner: string }) => {
    return (
        <div className="relative hidden xs:block">
            <img src={banner}
                alt="banner-restaurante"
                className="w-screen h-full object-cover" />
        </div>
    );
};