import { useEffect, useState } from "react";
import { BottomNav } from "../components/store-page/by-store/style-toolbar";
import { getPageStyle } from "../services/page-style";
import { LoadingComponent } from "../components/loading";
import { StoreBanner } from "../components/store-page/by-store/banner";
import { useAppSettings } from "../hooks/use-app-settings";
import { StoreFooterComponent } from "../components/store-page/by-store/footer";
import { ErrorComponent } from "../components/error";
import { getCategoriesStore } from "../services/menu-store";
import { DayOfWeek, Category } from "../types/restaurante-data-types.d";
import { CategoryButtons } from "../components/store-page/by-store/categories-butttons";
import { getStoreData } from "../services/store-data";
import { Header } from "../components/store-page/by-store/header";
import { UpdateStoreDataForm } from "../components/forms/update-data-store";
import { UpdateSchedulesForm } from "../components/forms/update-schedules";
import { toMoney } from "../utils/transform-to-money";
import { MenuItemsContainer } from "../components/store-page/by-store/menu-items";

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

const CustomizeMenuPage = () => {
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
            console.log(error)

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

    console.log(buttonColor)

    console.log(backgroundColor)

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
                        cartValue={toMoney(0, 'BRL')}
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
                    <main className="w-full max-w-[1140px] flex flex-col items-center justify-center pb-24 mt-[110px] xs:mt-[89px] sm:mt-[115px] xl:mt-[132px]">
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
}

export { CustomizeMenuPage }
