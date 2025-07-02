import { CiShoppingCart } from "react-icons/ci";
import { RestaurantData } from "../../../types/restaurante-data-types.d";
import { getRestaurantStatus } from "../../../utils/restaurant-status";
import { Logo } from "./logo";


export const Header = ({
    backgroundColor = '',
    restaurantImage,
    restaurantName,
    openingHours = [],
    cartValue,
}: RestaurantData) => {

    const { isOpen, message } = getRestaurantStatus(openingHours);
    
    return (
        <header
            className={`w-screen bg-${backgroundColor} ${backgroundColor === 'white' ? 'text-black' : 'text-white' } z-10 px-[5%] lg:px-[15%] fixed py-2 xl:py-4 sm:px-6 flex flex-col xs:flex-row items-center justify-between top-0 border-b-[1px] `}>
            <div className="flex items-center gap-3.5">
                    <Logo
                        logo={restaurantImage}
                        onImageChange={() => {}}
                    />
                <div className="text-center mx-1.5">
                    <h2 className="text-md font-bold mb-1">{restaurantName}</h2>
                    {isOpen ?
                        <p
                            aria-live="polite"
                            className="flex flex-col font-extralight mb-1 text-xs sm:text-base">
                            <span className="bg-green-600 p-0.5 rounded-md text-white">aberto</span>
                            {message}
                        </p>
                        :
                        <p
                            aria-live="polite"
                            className="flex flex-col font-extralight mb-1 text-xs sm:text-base">
                            <span className="bg-red-600 p-0.5 rounded-md text-white">fechado</span>
                            {message}
                        </p>
                    }

                </div>
            </div >
            <div
                aria-label="Carrinho de compras"
                className="flex xs:flex-col items-center text-center"
            >
                <CiShoppingCart className="text-2xl sm:text-3xl cursor-pointer hover:scale-105 " />
                <h3 className="text-xs sm:text-base">{cartValue}</h3>
            </div>
        </header >
    )
};