import { CiShoppingCart } from "react-icons/ci";

const SettingsPage = () => {
    return (
        <div className="w-screen h-screen px-[5%] lg:px-[15%] flex flex-col items-center bg-white text-black lg:text-base">
            {/* <nav className="w-[500px] fixed bottom-0 m-1.5 rounded-2xl p-4 flex flex-col items-center content-between bg-white dark:bg-zinc-950 border-[1px] border-gray-500">
                <img src="../logo-r.png" alt="logo" width={40} />
            </nav> */}
            <header className="w-full py-4 sm:px-6 flex flex-col xs:flex-row items-center justify-between top-0 bg-white">
                <img src="../logo-restaurante.png" alt="restaurant-image" className="bg-red-800 rounded-full w-16 h-16 mb-1.5 sm:w-23 sm:h-23 xs:hidden" />
                <div className="flex items-center gap-3.5">
                    <img src="../logo-restaurante.png" alt="restaurant-image" className="bg-red-800 rounded-full w-16 h-16 sm:w-23 sm:h-23 hidden xs:block" />
                    <div className="text-center mx-1.5">
                        <h2 className="text-md font-bold mb-1">Nome Restaurante</h2>
                        <p
                            aria-live="polite"
                            className="flex flex-col mb-1">
                            <span className="bg-red-600 p-0.5 rounded-md text-white">Fechado</span>
                            Abre às 11:30
                        </p>
                    </div>
                </div >
                <div
                    aria-label="Carrinho de compras"
                    className="hidden xs:flex flex-col items-center text-center"
                >
                    <CiShoppingCart className="text-3xl cursor-pointer hover:scale-105 " />
                    <h3>R$ 00,00</h3>
                </div>
            </header >

            <main className="w-full flex flex-col items-center justify-center pb-24">
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
        </div>
    )
}

export { SettingsPage }