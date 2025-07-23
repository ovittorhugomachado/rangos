import { useEffect, useState, useCallback } from "react";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { getStoreData } from "../services/service-store-data";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/component-error";
import { LoadingComponent } from "../components/component-loading";
import { Header } from "../components/customer-side/store-page-components/store-header-by-customer";
import { StoreBanner } from "../components/customer-side/store-page-components/store-banner-customer";
import { StoreFooterComponent } from "../components/store-side/store-page-components/store-footer";
import { getPageStyle } from "../services/service-page-style";
import { StyleStorePage } from "../types/types-style-store-page.d";
import { getCategories } from "../services/service-manage-menu-store";
import { CategoryButtons } from "../components/customer-side/store-page-components/store-categories-buttons-by-customer";
import { Category } from "../types/types-menu.d";
import { MenuItems } from "../components/customer-side/store-page-components/store-container-items-by-customer";


export const StorePage = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState<RestaurantData | null>(null);
    const [storeStyle, setStoreStyle] = useState<StyleStorePage | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchStoreData = useCallback(async () => {
        setLoading(true);
        try {
            if (typeof id === "undefined") {
                throw new Error("Store ID is missing");
            }
            const numericId = Number(id);
            if (isNaN(numericId)) {
                throw new Error("Store ID is not a valid number");
            }
            const storeData = await getStoreData(numericId);
            const styleData = await getPageStyle(numericId);
            const categoriesStore = await getCategories(numericId)

            if (!storeData || !styleData || !categoriesStore) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            setStoreStyle(styleData);
            setCategories(categoriesStore);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error loading store data');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStoreData();
    }, [fetchStoreData]);

    return (
        <>
            {error ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                <div style={{ backgroundColor: storeStyle?.backgroundColor ?? undefined }} className="w-screen min-h-[100vh] px-[5%] lg:px-[15%] flex flex-col items-center">
                    <Header
                        backgroundColor={storeStyle?.backgroundColor ?? ''}
                        restaurantImage={storeData?.logoUrl ?? '/store-logo-default.png'}
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
                    <main className="w-full max-w-[1140px] pb-24 mt-[110px] xs:mt-[87px] sm:mt-[115px] xl:mt-[132px] flex flex-col items-center justify-center">
                        {storeData?.bannerUrl && (
                            <StoreBanner banner={storeData?.bannerUrl || 'store-banner-default.png'} />
                        )}
                        <CategoryButtons
                            categories={categories}
                            buttonColor={storeStyle?.primaryColor ?? ''}
                            textColor={storeStyle?.textButtonColor}
                        />
                        <MenuItems
                            storeId={storeData?.id ?? 0}
                            categories={categories}
                            backgroundColor={storeStyle?.backgroundColor ?? ''}
                            buttonColor={storeStyle?.primaryColor ?? ''}
                        />
                    </main>
                    <StoreFooterComponent backgroundColor={storeStyle?.backgroundColor ?? ''} />
                </div>
            )}
        </>
    );
};