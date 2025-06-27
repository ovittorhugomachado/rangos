//import { useEffect, useMemo, useState } from "react";
import { useState } from "react";
//import { Header } from "../../components/store-page/header-component";
//import { toMoney } from "../../utils/transform-to-money";
import { BottomNav } from "../components/store-page/style-toolbar";
//import { LoadingComponent } from "../../components/loading-component";

const CustomizeMenuPage = () => {

    const [ theme, setTheme ] = useState('dark')
    //const [ loading, setLoading ] = useState(true)
    //const [ error, setError ] = useState('')

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

    const changeTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="w-screen h-full px-[5%] lg:px-[15%] flex flex-col items-center bg-black text-black lg:text-base">
            {/* <nav className="w-[500px] h-[60px] fixed bottom-0 m-1.5 rounded-2xl p-4 flex flex-col items-center content-between bg-white dark:bg-zinc-950 border-[1px] border-gray-500">
                <button
                    onClick={changeTheme}
                >
                    trocar tem
                </button>
            </nav> */}
            <BottomNav
                theme={theme}
                onThemeChange={changeTheme}
                className="shadow-lg"
            />

            <main className="w-full flex flex-col items-center justify-center pb-24 mt-[130px]">
                <img src="../nemo.webp" alt="imagem-capa" className="w-screen hidden xs:block" />
                <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5">
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Promoções</button>
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Combos</button>
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Pratos</button>
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Vegetarianos</button>
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Bebidas</button>
                    <button className="bg-green-600 flex-grow min-w-28 h-8 lg:h-12 px-3 rounded-3xl">Sobremesas</button>
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

            <footer className="w-screen h-[100px] flex items-center justify-center bg-zinc-950">
                <h3 className="text-white absolute translate-x-[-75px] translate-y-[-20px]">by</h3>
                <img src="../logo.png" alt="restaurant-image" className="w-[120px] object-contain" />
            </footer>
        </div>
    )
}

export { CustomizeMenuPage }