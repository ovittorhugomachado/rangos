import { CiShoppingCart } from "react-icons/ci";
import { RestaurantData } from "../../../types/restaurante-data-types.d";
import { getRestaurantStatus } from "../../../utils/restaurant-status";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { ImageUploader } from "./image-uploader";

export const Header = ({
    restaurantName = "Nome do Restaurante",
    restaurantImage,
    backgroundColor,
    openingHours = [],
    cartValue,
}: RestaurantData) => {

    const token = localStorage.getItem('token')
    console.log(token)

    const { isOpen, message } = getRestaurantStatus(openingHours);
    return (
        <header
            className={
                `w-screen px-[5%] lg:px-[15%] fixed py-4 sm:px-6 flex flex-col xs:flex-row items-center justify-between top-0 border-b-[1px] 
                ${backgroundColor === "black" ? "bg-black" : "bg-white"} 
                ${backgroundColor === "black" ? "text-white" : "text-black"} 
                ${backgroundColor === "black" ? "border-zinc-800" : "border-gray-200"}
            `}>
            <div className="w-16 h-16 rounded-full relative mb-1.5 sm:w-23 sm:h-23 xs:hidden">
                <img
                    src={restaurantImage}
                    alt={restaurantName}
                    className="w-full h-full object-contain p-1.5"
                />
<ImageUploader />
            </div>
            <div className="flex items-center gap-3.5">
                <div className="w-[92px] h-[92px] relative hidden xs:block">
                    <div className="h-full w-full rounded-full overflow-hidden hidden xs:flex items-center justify-center bg-gray-100">
                        <img
                            src={restaurantImage}
                            alt={restaurantName}
                            className="w-full h-full object-contain p-1.5"
                        />

                    </div>
                    <ImageUploader />

                </div>

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
                className="hidden xs:flex flex-col items-center text-center"
            >
                <CiShoppingCart className="text-2xl sm:text-3xl cursor-pointer hover:scale-105 " />
                <h3 className="text-xs sm:text-base">{cartValue}</h3>
            </div>
        </header >
    )
}