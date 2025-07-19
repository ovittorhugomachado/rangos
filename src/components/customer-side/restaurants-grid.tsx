import { Link } from "react-router-dom";
import { RestaurantsGrid } from "../../types/types-restaurante-data.d";
import { MdRestaurantMenu } from "react-icons/md";

export const StoreGrid = ({ restaurants }: RestaurantsGrid) => {

    return (
        <main className="w-full flex flex-col pt-6 px-8 text-black dark:text-white ">
            <div className="flex items-center justify-center">
                <MdRestaurantMenu className="text-4xl hidden sm:block" />
                <h1 className="text-4xl text-center border-b-2 border-primary mx-3">Restaurantes</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-[1450px] mt-8 mx-auto">
                {restaurants.map(restaurant => (
                    <Link
                        key={restaurant.id}
                        to={`/restaurant/${restaurant.id}`}
                        className="min-w-50 rounded-lg shadow p-4 border-[1px] border-zinc-300 flex flex-col items-center cursor-pointer hover:scale-103 transition-all duration-300">
                        <img
                            src={restaurant.logoUrl || "/store-logo-default.png"}
                            alt={restaurant.name}
                            className="w-24 h-24 object-cover rounded-full"
                        />
                        <h2 className="text-md font-semibold">{restaurant.restaurantName}</h2>
                    </Link>
                ))}
            </div>
        </main>
    );
};