import { useEffect, useState } from "react";
import { BottomNav } from "../components/store-side/store-page-components/style-toolbar-store";
import { getPageStyle } from "../services/service-page-style";
import { LoadingComponent } from "../components/loading-component";
import { StoreBanner } from "../components/store-side/store-page-components/banner-store";
import { useAppSettings } from "../hooks/use-app-settings";
import { StoreFooterComponent } from "../components/store-side/store-page-components/footer-store";
import { ErrorComponent } from "../components/error-component";
import { getCategoriesStore } from "../services/service-manage-menu-store";
import { DayOfWeek, Category } from "../types/restaurante-data-types.d";
import { CategoryButtons } from "../components/store-side/store-page-components/categories-buttons-store";
import { getStoreData } from "../services/service-store-data";
import { Header } from "../components/store-side/store-page-components/header-store";
import { UpdateStoreDataForm } from "../components/store-side/forms/update-data-store-form";
import { UpdateSchedulesForm } from "../components/store-side/forms/update-schedules-form";
import { MenuItemsContainer } from "../components/store-side/store-page-components/container-items-store";

type StoreData = {
    restaurantName: string,
    phoneNumber: string,
    address: string | null,
    logoUrl: string | null,
    bannerUrl: string | null,
    delivery: boolean,
    pickup: boolean,
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

export const CustomizeMenuPage = () => {
    useAppSettings();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [storeData, setStoreData] = useState<StoreData | null>(null);
    const [showStoreDataUpdateForm, setStoreDataUpdateForm] = useState(false)
    const [showStoreSchedulesUpdateForm, setShowStoreSchedulesUpdateForm] = useState(false)
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [storeStyle, setStoreStyle] = useState<StyleData | null>(null);
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
                        textColorButtons={textColorButtons === "black" || textColorButtons === "white" ? textColorButtons : "black"}
                        setTextColorButtons={setTextColorButtons}
                    />
                    <Header
                        backgroundColor={backgroundColor ?? ''}
                        restaurantImage={storeData?.logoUrl ?? 'store-logo-default.png'}
                        restaurantName={storeData?.restaurantName ?? ''}
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
                        <MenuItemsContainer
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
