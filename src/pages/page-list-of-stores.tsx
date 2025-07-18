import { useEffect, useState } from "react";
import { StoreGrid } from "../components/customer-side/restaurants-grid";
import { LoadingComponent } from "../components/component-loading";
import { getStoresList } from "../services/service-store-data";
import { Header } from "../components/customer-side/header";
import { ErrorComponent } from "../components/component-error";
import { RestaurantData } from "../types/types-restaurante-data.d";

export const PageListOfStores = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);

    const fetchRestaurants = async () => {
        try {
            const response = await getStoresList();
            const sorted = [...response].sort((a, b) => b.id - a.id);
            setRestaurants(sorted);
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao buscar lista de restaurantes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    console.log(restaurants)

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : error ? (
                <ErrorComponent
                    message={error}
                />
            ) : (
                <div className="w-full min-h-screen flex flex-col items-center justify-start mx-4 md:mx-10 lg:mx-20">
                    <Header />
                    <StoreGrid
                        restaurants={restaurants}
                    />
                </div>
            )}
        </>
    )
};

