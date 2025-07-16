import { useEffect, useState } from "react";
import { ErrorComponent } from "../components/error-component";
import { LoadingComponent } from "../components/loading-component";
import { Header } from "../components/customer-side/header-store";
import { getStoreData } from "../services/service-store-data";
import { getPageStyle } from "../services/service-page-style";
import { getCategoriesStore } from "../services/service-manage-menu-store";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { Category } from "../types/types-menu.d";
import { StoreBanner } from "../components/customer-side/banner-store";
import { CategoryButtons } from "../components/customer-side/categories-buttons-store";
import { MenuItemsContainer } from "../components/customer-side/container-items-store";
import { StoreFooterComponent } from "../components/customer-side/footer-store";
import { StyleStorePage } from "../types/types-style-store-page.d";

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
                        <MenuItemsContainer
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
}
