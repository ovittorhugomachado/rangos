import { LogoStore } from "./logo";
import { DayOfWeek } from "../../../../types/restaurante-data-types.d";
import { getRestaurantStatus } from "../../../../utils/restaurant-status";
import { CiShoppingCart } from "react-icons/ci";

interface HeaderProps {
    backgroundColor?: string;
    restaurantImage?: string;
    restaurantName?: string;
    cartValue?: string | number;
    openingHours?: {
        day: DayOfWeek
        open: string;
        close: string;
        isClosed?: boolean;
    }[];
};

export const Header: React.FC<HeaderProps> = ({
    backgroundColor = '',
    restaurantImage,
    restaurantName,
    cartValue,
    openingHours = [],
}) => {

    const { isOpen, message } = getRestaurantStatus(openingHours);

    return (
        <header
            className={`w-screen bg-${backgroundColor} ${backgroundColor === 'white' ? 'text-black' : 'text-white'} max-h-[387px] z-10 px-[5%] lg:px-[15%] fixed py-2 xl:py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between top-0 border-b-[1px] `}>
            <div className="w-full flex flex-col xs:flex-row justify-between items-center">
                <div className="w-full flex items-center gap-3.5">
                    <LogoStore image={restaurantImage} />
                    <div className="text-center mx-1.5">
                        <div className="flex items-center gap-1 m-1">
                            <h2 className="text-md font-bold mb-1">{restaurantName}</h2>
                        </div>
                        {isOpen ?
                            <div className="flex items-center flex-shrink-0">
                                <p
                                    aria-live="polite"
                                    className="min-w-28 flex flex-col font-extralight mb-1 text-xs sm:text-base">
                                    <span className="bg-green-600 p-0.5 rounded-md text-white">aberto</span>
                                    {message}
                                </p>
                            </div>
                            :
                            <div className="flex items-center">
                                <p
                                    aria-live="polite"
                                    className="min-w-28 flex flex-col font-extralight mb-1 text-xs sm:text-base">
                                    <span className="bg-red-600 p-0.5 rounded-md text-white">fechado</span>
                                    {message}
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <div
                    aria-label="Carrinho de compras"
                    className="flex xs:flex-col items-center text-center"
                >
                    <CiShoppingCart className="text-2xl sm:text-3xl cursor-pointer hover:scale-105 " />
                    <h3 className="text-xs sm:text-base">{cartValue}</h3>
                </div>
            </div >
        </header >
    )
};