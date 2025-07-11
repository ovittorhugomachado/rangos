import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../components/loading";
import { DashboardNav } from "../components/dashboard-nav";
import { useEffect, useState } from "react";
import { DashboardCards } from "../components/dashboard-cards";
import { Order } from "../types/orders-types.d";

export const AdminDashboard = () => {
    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const { user, loading, error } = useAuth();
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/order/list?limit=50&offset=0`, {
                credentials: 'include',

            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return setOrders(data.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setOrdersLoading(false);
        }
    }

    useEffect(() => {

        fetchOrders();
    }, []);


    return (
        <>
            {error ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h2 className="text-red-600 text-xl font-bold mb-4">Erro ao carregar dados</h2>
                    <p className="text-zinc-700">{error}</p>
                    <Link to="/entrar" className="primary-button mt-4">
                        Ir para login
                    </Link>
                </div>
            ) : (loading || !user) ? (
                <LoadingComponent />
            ) : (
                <>
                    <ToggleThemeAndFont
                        toggleTheme={toggleTheme}
                        fontSize={fontSize}
                        increaseFontSize={increaseFontSize}
                        decreaseFontSize={decreaseFontSize}
                    />
                    <DashboardNav />
                    <main className={`${fontSize} h-screen flex flex-col text-black dark:text-white items-center gap-6 w-screen`}>

                        {ordersLoading ? (
                            <LoadingComponent />
                        ) : (
                            <DashboardCards
                                orders={orders}
                                onCancelOrder={(orderId) => console.log("Cancel Order:", orderId)}
                                onAcceptOrder={(orderId) => console.log("Accept Order:", orderId)}
                                onOrderReady={(orderId) => console.log("Ready Order:", orderId)}
                                onOrderDelivered={(orderId) => console.log("Delivered Order:", orderId)}
                            />
                        )}

                    </main>
                </>
            )}
        </>
    );
};