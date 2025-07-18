import { useEffect, useState } from "react";
import { getPageStyle } from "../services/service-page-style";
import { getCategoriesStore } from "../services/service-manage-menu-store";
import { getStoreData } from "../services/service-store-data";
import { useAppSettings } from "../hooks/use-app-settings";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { StyleStorePage } from "../types/types-style-store-page.d";
import { Category } from "../types/types-menu.d";
import { BottomNav } from "../components/store-side/store-page-components/store-style-toolbar";
import { LoadingComponent } from "../components/component-loading";
import { StoreBanner } from "../components/store-side/store-page-components/store-banner";
import { StoreFooterComponent } from "../components/store-side/store-page-components/store-footer";
import { ErrorComponent } from "../components/component-error";
import { CategoryButtons } from "../components/store-side/store-page-components/store-categories-buttons";
import { Header } from "../components/store-side/store-page-components/store-header";
import { UpdateStoreDataForm } from "../components/store-side/forms/form-update-data-store";
import { UpdateSchedulesForm } from "../components/store-side/forms/form-update-schedules";
import { MenuItems } from "../components/store-side/store-page-components/store-container-items";

export const CustomizeMenuPage = () => {
    useAppSettings();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [storeData, setStoreData] = useState<RestaurantData | null>(null);
    const [showStoreDataUpdateForm, setStoreDataUpdateForm] = useState(false)
    const [showStoreSchedulesUpdateForm, setShowStoreSchedulesUpdateForm] = useState(false)
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [storeStyle, setStoreStyle] = useState<StyleStorePage | null>(null);
    const [initialButtonColor, setInitialButtonColor] = useState('');
    const [initialBackgroundColor, setInitialBackgroundColor] = useState('');
    const [initialTextColorButtons, setInitialTextColorButtons] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);
    const [textColorButtons, setTextColorButtons] = useState<string>('');
    const [buttonColor, setButtonColor] = useState<string>('');

    const fetchStoreData = async () => {
        setLoading(true);
        try {

            const storeData = await getStoreData();

            const styleData = await getPageStyle();
            console.log("styleData", styleData.textButtonColor);

            const categoriesStore = await getCategoriesStore()

            if (!styleData) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            setBannerUrl(storeData.bannerUrl ?? '');
            setStoreStyle(styleData);
            setCategories(categoriesStore);
            setInitialButtonColor(styleData.primaryColor ?? '');
            setInitialBackgroundColor(styleData.backgroundColor ?? '');
            setInitialTextColorButtons(styleData.textButtonColor ?? '');

            if (styleData.backgroundColor) setBackgroundColor(styleData.backgroundColor);
            if (styleData.primaryColor) setButtonColor(styleData.primaryColor);
            if (styleData.textButtonColor) setTextColorButtons(styleData.textButtonColor);

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

    const handleStoreDataUpdated = async () => {
        const updatedStoreData = await getStoreData();
        setStoreData(updatedStoreData);
        setStoreDataUpdateForm(false)
    };

    const handleSchedulesUpdated = async () => {
        const updatedStoreData = await getStoreData();
        setStoreData(updatedStoreData);
        setShowStoreSchedulesUpdateForm(false);
    };

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : (loading || !storeStyle) ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ backgroundColor: backgroundColor }}
                    className="w-screen h-full px-[5%] lg:px-[15%] flex flex-col items-center bg-black text-black lg:text-base"
                >
                    <BottomNav
                        backgroundColorStore={backgroundColor === "black" || backgroundColor === "white" ? backgroundColor : "white"}
                        setBackgroundColor={setBackgroundColor}
                        initialButtonColor={initialButtonColor}
                        initialBackgroundColor={initialBackgroundColor === "black" || initialBackgroundColor === "white" ? initialBackgroundColor : "white"}
                        initialTextColorButtons={initialTextColorButtons === "black" || initialTextColorButtons === "white" ? initialTextColorButtons : "black"}
                        buttonColor={buttonColor ?? ''}
                        setButtonColor={setButtonColor}
                        textColorButtons={textColorButtons === "black" || textColorButtons === "white" ? textColorButtons : "white"}
                        setTextColorButtons={setTextColorButtons}
                    />
                    <Header
                        backgroundColor={backgroundColor ?? ''}
                        restaurantImage={storeData?.logoUrl ?? 'store-logo-default.png'}
                        restaurantName={storeData?.restaurantName ?? ''}
                        openingHours={
                            Array.isArray(storeData?.openingHours)
                                ? storeData.openingHours.map((oh) => ({
                                    day: oh.day as import("../types/types-schedules.d").DayOfWeek,
                                    isOpen: !!oh.isOpen,
                                    isClosed: !!oh.isOpen,
                                    status: oh.status ?? "",
                                    timeRanges: Array.isArray(oh.timeRanges) && oh.timeRanges.length > 0
                                        ? oh.timeRanges
                                        : [{ start: "", end: "" }],
                                }))
                                : []
                        }
                        openFormUpdateDataStore={() => setStoreDataUpdateForm(true)}
                        openFormUpdateSchedules={() => setShowStoreSchedulesUpdateForm(true)}
                    />
                    {showStoreDataUpdateForm && (
                        <UpdateStoreDataForm
                            onClose={handleStoreDataUpdated}
                        />
                    )}
                    {showStoreSchedulesUpdateForm && (
                        <UpdateSchedulesForm
                            onClose={handleSchedulesUpdated}
                        />
                    )}
                    <main className="w-full max-w-[1140px] flex flex-col items-center justify-center pb-24 mt-[110px] xs:mt-[125px] sm:mt-[115px] xl:mt-[132px]">
                        <StoreBanner
                            banner={bannerUrl}
                            onBannerChange={async () => {
                                const updatedStoreData = await getStoreData();
                                setBannerUrl(updatedStoreData.bannerUrl ?? '');
                            }}
                        />
                        <CategoryButtons
                            backgroundColor={backgroundColor ?? ''}
                            categories={categories}
                            setCategories={setCategories}
                            textColor={textColorButtons}
                            buttonColor={buttonColor}
                        />
                        <MenuItems
                            categories={categories}
                            backgroundColor={backgroundColor ?? ''}
                            buttonColor={buttonColor ?? ''}
                        />
                    </main>
                    <StoreFooterComponent backgroundColor={backgroundColor ?? ''} />
                </div>
            )}
        </>
    )
};
