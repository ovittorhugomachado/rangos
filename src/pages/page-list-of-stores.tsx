import { useEffect, useState } from "react";
import { StoreGrid } from "../components/customer-side/restaurants-grid";
import { LoadingComponent } from "../components/component-loading";
import { getStoresList } from "../services/service-store-data";

export const PageListOfStores = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await getStoresList();
            setRestaurants(response);
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
            <div className="flex flex-col items-center">
                <p className="text-red-500">{error}</p>
            </div>
        ) : (
            <StoreGrid
                restaurants={restaurants}
            />
        )}
    </>
    )
};

