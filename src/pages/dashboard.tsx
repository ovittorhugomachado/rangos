import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Order } from "../types/orders-types.d";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { LoadingComponent } from "../components/loading";
import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { DashboardNav } from "../components/dashboard-nav";
import { DashboardCards } from "../components/dashboard-cards";
import {
    cancelOrderService,
    acceptOrderService, readyOrderService,
    deliveredOrderService,
    getOrdersService
} from "../services/manage-orders";

export const AdminDashboard = () => {
    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const { user, loading, error } = useAuth();
    const [activePanel, setActivePanel] = useState<number[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const orders = await getOrdersService();
            setOrders(orders);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setOrdersLoading(false);
        }
    }

    const updateOrders = async () => {
        try {
            const orders = await getOrdersService();
            setOrders(orders);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        updateOrders();
        const interval = setInterval(() => updateOrders(), 5000);
        return () => clearInterval(interval);
    }, []);

    const handleCancelOrder = async (orderId: number) => {
        await cancelOrderService(orderId);
        fetchOrders();
    };

    const handleAcceptOrder = async (orderId: number) => {
        await acceptOrderService(orderId);
        setActivePanel((prev) => [...prev, 1]);
        fetchOrders();
    };

    const handleReadyOrder = async (orderId: number) => {
        await readyOrderService(orderId);
        setActivePanel((prev) => [...prev, 2]);
        fetchOrders();
    };

    const handleDeliveredOrder = async (orderId: number) => {
        await deliveredOrderService(orderId);
        fetchOrders();
    };

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
                    <main className={`${fontSize} w-screen h-screen pt-52 sm:pt-26 flex flex-col text-black dark:text-white items-center gap-6`}>
                        <h1 className="text-4xl text-center border-b-2 border-primary mx-4">Painel de pedidos</h1>
                        {ordersLoading ? (
                            <LoadingComponent />
                        ) : (
                            <DashboardCards
                                orders={orders}
                                activePanel={activePanel}
                                setActivePanel={setActivePanel}
                                onCancelOrder={handleCancelOrder}
                                onAcceptOrder={handleAcceptOrder}
                                onOrderReady={handleReadyOrder}
                                onOrderDelivered={handleDeliveredOrder}
                            />
                        )}
                    </main>
                </>
            )}
        </>
    );
};

