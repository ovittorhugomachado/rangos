import { Link } from "react-router-dom";
import { RestaurantsGrid } from "../../types/types-restaurante-data.d";
import { MdRestaurantMenu } from "react-icons/md";

export const StoreGrid = ({ restaurants }: RestaurantsGrid) => {

    return (
        <main className="w-full flex flex-col pt-6 px-8 text-black dark:text-white">
            <div className="w-full flex items-center justify-center">
                <MdRestaurantMenu className="text-4xl hidden sm:block" />
                <h1 className="text-4xl border-b-2 border-primary mx-3 text-center">Restaurantes</h1>
            </div>
            <div className="w-full max-w-[1450px] mt-8 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                    <Link
                        key={restaurant.id}
                        to={`/restaurant/${restaurant.id}`}
                        className="min-w-50 p-4 rounded-lg border-[1px] border-zinc-500 shadow flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-103"
                    >
                        <img
                            src={restaurant.logoUrl || "/store-logo-default.png"}
                            alt={restaurant.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <h2 className="text-md font-semibold">{restaurant.restaurantName}</h2>
                    </Link>
                ))}
            </div>
        </main>
    );
};