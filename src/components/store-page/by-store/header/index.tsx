import { Logo } from "./logo";
import { DayOfWeek } from "../../../../types/restaurante-data-types.d";
import { getRestaurantStatus } from "../../../../utils/restaurant-status";
import { FaGear } from "react-icons/fa6";
import { RiListSettingsFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

interface HeaderProps {
    backgroundColor?: string;
    restaurantImage?: string;
    restaurantName?: string;
    openingHours?: {
        day: DayOfWeek
        open: string;
        close: string;
        isClosed?: boolean;
    }[];
    openFormUpdateDataStore: () => void;
    openFormUpdateSchedules: () => void;
};

export const Header: React.FC<HeaderProps> = ({
    backgroundColor = '',
    restaurantImage,
    restaurantName,
    openingHours = [],
    openFormUpdateDataStore,
    openFormUpdateSchedules,
}) => {

    const { isOpen, message } = getRestaurantStatus(openingHours);

    return (
        <header
            className={`w-screen bg-${backgroundColor} ${backgroundColor === 'white' ? 'text-black' : 'text-white'} max-h-[387px] z-10 px-[5%] lg:px-[15%] fixed py-2 xl:py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between top-0 border-b-[1px] `}>
            <div className="flex items-center gap-3.5">
                <Logo
                    logo={restaurantImage || ""}
                    onImageChange={() => { }}
                />
                <div className="text-center mx-1.5">
                    <div className="flex items-center gap-1 m-1">
                        <h2 className="text-md font-bold mb-1">{restaurantName}</h2>
                        <button
                            onClick={openFormUpdateDataStore}
                            title="Configurar dados da loja"
                            className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-white bg-opacity-70 border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                        >
                            <FaGear />
                        </button>
                    </div>
                    {isOpen ?
                        <div className="flex items-center flex-shrink-0">
                            <p
                                aria-live="polite"
                                className="min-w-28 flex flex-col font-extralight mb-1 text-xs sm:text-base">
                                <span className="bg-green-600 p-0.5 rounded-md text-white">aberto</span>
                                {message}
                            </p>
                            <button
                                onClick={openFormUpdateSchedules}
                                title="Configurar dados da loja"
                                className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-white bg-opacity-70 m-2 border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 flex-shrink-0"
                            >
                                <RiListSettingsFill />
                            </button>
                        </div>

                        :
                        <div className="flex items-center">
                            <p
                                aria-live="polite"
                                className="min-w-28 flex flex-col font-extralight mb-1 text-xs sm:text-base">
                                <span className="bg-red-600 p-0.5 rounded-md text-white">fechado</span>
                                {message}
                            </p>
                            <button
                                onClick={openFormUpdateSchedules}
                                title="Configurar horários da loja"
                                className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-white bg-opacity-70 m-2 border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 flex-shrink-0"
                            >
                                <RiListSettingsFill />
                            </button>
                        </div>
                    }
                </div>
            </div >
            <Link
                to="/"
                className="z-50 bg-primary text-black p-2 rounded-full top-4 right-4 flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
                <GoHomeFill />
                voltar para o painel
            </Link>
        </header >
    )
};