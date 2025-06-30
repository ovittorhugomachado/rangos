import { useEffect, useState } from "react";
import { BottomNav } from "../components/store-page/style-toolbar";
import { getPageStyle } from "../services/page-style";
import { LoadingComponent } from "../components/loading-component";
import { StoreBanner } from "../components/store-banner";
import { useAppSettings } from "../hooks/use-app-settings";
import { StoreFooterComponent } from "../components/store-page/by-store/footer-component";
import ErrorComponent from "../components/error-component";
import { Logo } from "../components/logo";
import { getCategoriesStore } from "../services/menu-store";
import { Category } from "../types/restaurante-data-types.d";
import { CategoryButtons } from "../components/store-page/by-store/category-buttons/categories-butttons";

type StyleData = {
    primaryColor?: string | null;
    backgroundColor?: string | null;
    textColorButtons?: string | null;
};

const CustomizeMenuPage = () => {

    useAppSettings();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [storeStyle, setStoreStyle] = useState<StyleData | null>(null);
    const [initialButtonColor, setInitialButtonColor] = useState('');
    const [initialBackgroundColor, setInitialBackgroundColor] = useState('');
    const [initialTextColorButtons, setInitialTextColorButtons] = useState('');
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<Category[]>([]);
    const [textColorButtons, setTextColorButtons] = useState<string>('');
    const [buttonColor, setButtonColor] = useState<string>('');

    // const defaultPreferences = useMemo(() => ({
    //     openingHours: [
    //         {
    //             day: 'terça' as const,
    //             open: '11:00',
    //             close: '14:30'
    //         },
    //         {
    //             day: 'quarta' as const,
    //             open: '11:00',
    //             close: '17:00'
    //         },
    //         {
    //             day: 'quinta' as const,
    //             open: '11:00',
    //             close: '17:00'
    //         },
    //         {
    //             day: 'sexta' as const,
    //             open: '11:00',
    //             close: '17:00'
    //         }
    //     ],
    //     cartItems: [],
    //     cartValue: toMoney(123.4),
    //     cetegories: {
    //         pratos: [
    //             { id: 1, nome: "Risoto de Cogumelos", preco: 34.90 },
    //             { id: 2, nome: "Frango ao Curry", preco: 29.50 },
    //             { id: 3, nome: "Lasanha Vegetariana", preco: 31.00 },
    //         ],
    //         bebidas: [
    //             { id: 4, nome: "Suco de Laranja Natural", preco: 8.00 },
    //             { id: 5, nome: "Refrigerante Lata", preco: 6.50 },
    //             { id: 6, nome: "Água com Gás", preco: 5.00 },
    //         ],
    //         sobremesas: [
    //             { id: 7, nome: "Brownie com Sorvete", preco: 14.90 },
    //             { id: 8, nome: "Cheesecake de Frutas Vermelhas", preco: 16.00 },
    //             { id: 9, nome: "Pudim de Leite", preco: 12.00 },
    //         ],
    //     }
    // }), []);


    // if (error) {
    //     return <div>Erro: {error}</div>;
    // }

    // const changeTheme = () => {
    //     setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    // }

    // The initial color states are set after fetching styleData in fetchStoreData

    const fetchStoreData = async () => {
        setLoading(true);
        try {
            const styleData = await getPageStyle();

            const categoriesStore = await getCategoriesStore()

            if (!styleData) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreStyle(styleData);
            setCategories(categoriesStore);
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

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                    <Logo />
                </div>
            ) : (loading || !storeStyle) ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ backgroundColor: backgroundColor }}
                    className="w-screen h-full px-[5%] lg:px-[15%] flex flex-col items-center bg-black text-black lg:text-base">
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

                    <main className="w-full flex flex-col items-center justify-center pb-24 mt-[130px]">
                        <StoreBanner banner="../nemo.webp" />
                        <div className="w-full ">
                            <CategoryButtons
                                categories={categories}
                                setCategories={setCategories}
                                textColor={textColorButtons}
                                buttonColor={buttonColor} />

                        </div>

                        <h1 className="self-start ml-3 text-2xl mt-6.5">Promoções</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 mx-auto w-full max-w-6xl">
                            <div className="bg-zinc-950 flex border-[1px] border-zinc-800">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className=" text-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                        </div>
                        <h1 className="self-start pl-3 pr-16 text-2xl mt-6.5 border-b-2 border-green-600">Combos</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 mx-auto w-full max-w-6xl">
                            <div className="flex border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex max-w-7xl border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                            <div className="flex border-[1px] border-zinc-300">
                                <img src="../prato.webp" alt="" className="w-[150px] h-[150px] object-cover" />
                                <div className="bg-white flex flex-col justify-between py-2 px-4">
                                    <h1 className="font-bold">Milano</h1>
                                    <h3>Espaguete, galeto e polenta</h3>
                                    <h3>R$ 24,90</h3>
                                </div>
                            </div>
                        </div>

                    </main>

                    <StoreFooterComponent backgroundColor={backgroundColor ?? ''} />
                </div>
            )}
        </>
    )
}

export { CustomizeMenuPage }