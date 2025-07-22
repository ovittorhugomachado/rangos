import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import {
    cancelOrderService,
    acceptOrderService,
    readyOrderService,
    deliveredOrderService,
    getOrdersService
} from "../services/service-manage-orders";
import { Order } from "../types/types-orders.d";
import { Header } from "../components/component-header";
import { LoadingComponent } from "../components/component-loading";
import { ToggleThemeAndFont } from "../components/component-display-settings";
import { DashboardCards } from "../components/store-side/dashboard-cards";
import { CgMenuGridR } from "react-icons/cg";
import { MdBorderColor, MdRestaurantMenu } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

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

    const buttons = [
        {
            to: "/",
            title: "Painel de pedidos",
            icon: <CgMenuGridR />,
        },
        {
            to: "/personalizar-cardapio",
            title: "Editar cardápio",
            icon: <IoMdSettings />,
        },
        {
            to: "/restaurantes",
            title: "Restaurantes",
            icon: <MdRestaurantMenu />,
        },
    ]

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const orders = await getOrdersService();
            const now = Date.now();
            const filtered = orders.filter(order => {
                const created = new Date(order.createdAt).getTime();
                return (now - created) <= 24 * 60 * 60 * 1000;
            });
            setOrders(filtered);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            
        } finally {
            setOrdersLoading(false);
        }
    }

    const updateOrders = async () => {
        try {
            const orders = await getOrdersService();
            const now = Date.now();
            const filtered = orders.filter(order => {
                const created = new Date(order.createdAt).getTime();
                return (now - created) <= 24 * 60 * 60 * 1000;
            });
            setOrders(filtered);
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
                    <h2 className="text-black dark:text-white text-xl font-bold mb-4">Erro ao carregar dados</h2>
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
                        byStore={true}
                    />
                    <Header
                        fontSize={fontSize}
                        buttons={buttons}
                    />
                    <main className={`${fontSize} w-screen h-screen pt-6 text-black dark:text-white flex flex-col items-center gap-6`}>
                        <div className="flex items-center justify-center">
                            <CgMenuGridR className="text-4xl hidden sm:block" />
                            <h1 className="text-4xl border-b-2 border-primary text-center mx-3">Painel de pedidos</h1>
                        </div>
                        <Link
                            to="/loja"
                            title="Fazer pedido"
                            style={{ fontSize: fontSize === 'text-sm' ? '18px' : '19px' }}
                            className="w-46 mx-auto px-4 py-1 text-black bg-primary rounded-full flex justify-center items-center gap-1 transition-all duration-200 hover:scale-103"
                        >
                            <MdBorderColor />
                            Fazer pedido
                        </Link>
                        {ordersLoading ? (
                            <LoadingComponent />
                        ) : (
                            <DashboardCards
                                fontSize={fontSize}
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

