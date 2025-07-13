import { useEffect, useState } from "react";
import { ErrorComponent } from "../components/error";
import { LoadingComponent } from "../components/loading";
import { Header } from "../components/store-page/by-customer/header"
import { getStoreData } from "../services/store-data";
import { getPageStyle } from "../services/page-style";
import { getCategoriesStore } from "../services/menu-store";
import { DayOfWeek } from "../types/restaurante-data-types.d";
import { toMoney } from "../utils/transform-to-money";

type StoreData = {
    restaurantName: string,
    phoneNumber: string,
    address: string | null,
    logoUrl: string | null,
    bannerUrl: string | null,
    delivery: boolean,
    pickup: boolean,
    cartValue: string | number,
    openingHours: [
        {
            storeId: number,
            day: string,
            isOpen: boolean,
            status: string,
            timeRanges: Array<{
                start: string,
                end: string
            }>
        }
    ]
};

type StyleData = {
    primaryColor?: string | null;
    backgroundColor?: string | null;
    textColorButtons?: string | null;
};

export const Store = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState<StoreData | null>(null);
    const [storeStyle, setStoreStyle] = useState<StyleData | null>(null);

    const fetchStoreData = async () => {
        setLoading(true);
        try {

            const storeData = await getStoreData();

            const styleData = await getPageStyle();

            //const categoriesStore = await getCategoriesStore()

            if (!styleData) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            //setBannerUrl(storeData.bannerUrl ?? '');
            setStoreStyle(styleData);
            //setCategories(categoriesStore);

            //if (styleData.backgroundColor) setBackgroundColor(styleData.backgroundColor);
            //if (styleData.primaryColor) setButtonColor(styleData.primaryColor);
            //if (styleData.textButtonColor) setTextColorButtons(styleData.textButtonColor);

        } catch (error) {

            setError(error instanceof Error ? error.message : 'Erro ao carregar os dados da loja');

            setStoreStyle(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStoreData();
    }, []);

    console.log("Store Data:", storeData);
    console.log("Store Style:", storeStyle);

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : (loading) ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ backgroundColor: storeStyle?.backgroundColor || 'black', color: storeStyle?.textColorButtons || 'white' }}
                    className="w-screen h-full px-[5%] lg:px-[15%] flex flex-col items-center bg-black text-black lg:text-base"
                >
                    <Header
                        backgroundColor={storeStyle?.backgroundColor || ''}
                        restaurantImage={storeData?.logoUrl || 'store-logo-default.png'}
                        restaurantName={storeData?.restaurantName || 'Loja'}
                        cartValue={toMoney(0, 'BRL')}
                        openingHours={
                            Array.isArray(storeData?.openingHours)
                                ? storeData.openingHours.map((oh) => ({
                                    day: oh.day as DayOfWeek,
                                    open: oh.timeRanges?.[0]?.start ?? '',
                                    close: oh.timeRanges?.[0]?.end ?? '',
                                    isClosed: !oh.isOpen
                                }))
                                : []
                        }
                    />
                    <main className="pt-[387px]">
                        <h1>Bem-vindo à loja</h1>
                    </main>
                </div>
            )}
        </>
    )
}
