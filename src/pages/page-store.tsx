import { useEffect, useState } from "react";
import { getStoreData } from "../services/service-store-data";
import { getPageStyle } from "../services/service-page-style";
import { getCategoriesStore } from "../services/service-manage-menu-store";
import { Category } from "../types/types-menu.d";
import { StyleStorePage } from "../types/types-style-store-page.d";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { ErrorComponent } from "../components/component-error";
import { LoadingComponent } from "../components/component-loading";
import { Header } from "../components/customer-side/store-header-by-customer";
import { StoreBanner } from "../components/customer-side/store-banner-customer";
import { CategoryButtons } from "../components/customer-side/store-categories-buttons-by-customer";
import { MenuItems } from "../components/customer-side/store-container-items-by-customer";
import { StoreFooterComponent } from "../components/customer-side/store-footer-by-customer";

export const Store = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState<RestaurantData | null>(null);
    const [storeStyle, setStoreStyle] = useState<StyleStorePage | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchStoreData = async () => {
        setLoading(true);
        try {

            const storeData = await getStoreData();

            const styleData = await getPageStyle();

            const categoriesStore = await getCategoriesStore()

            if (!styleData) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            setStoreStyle(styleData);
            setCategories(categoriesStore);

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
                    style={{ backgroundColor: storeStyle?.backgroundColor ?? undefined }}
                    className="w-screen h-full min-h-[100vh] px-[5%] lg:px-[15%] flex flex-col items-center"
                >
                    <Header
                        backgroundColor={storeData?.backgroundColor ?? 'white'}
                        restaurantImage={storeData?.logoUrl}
                        restaurantName={storeData?.restaurantName}
                        openingHours={
                            Array.isArray(storeData?.openingHours)
                                ? storeData.openingHours.map((oh) => ({
                                    day: oh.day,
                                    isOpen: oh.isOpen ?? true,
                                    status: oh.status ?? "",
                                    timeRanges: Array.isArray(oh.timeRanges) && oh.timeRanges.length > 0
                                        ? oh.timeRanges
                                        : [{ start: "", end: "" }],
                                }))
                                : []
                        }
                    />
                    <main className="w-full max-w-[1140px] flex flex-col items-center justify-center pb-24 mt-[110px] xs:mt-[87px] sm:mt-[115px] xl:mt-[132px]">
                        {storeData?.bannerUrl && (
                            <StoreBanner banner={storeData?.bannerUrl || 'store-banner-default.png'} />
                        )}
                        <CategoryButtons
                            categories={categories}
                            buttonColor={storeStyle?.primaryColor ?? ''}
                            textColor={storeStyle?.textColorButton ?? 'black'}
    
                        />
                        <MenuItems
                            categories={categories}
                            backgroundColor={storeStyle?.backgroundColor ?? ''}
                            buttonColor={storeStyle?.primaryColor ?? ''}
                        />
                    </main>
                    <StoreFooterComponent backgroundColor={storeStyle?.backgroundColor ?? ''} />
                </div>
            )}
        </>
    )
};
