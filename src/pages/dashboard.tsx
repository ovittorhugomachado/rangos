import { ToggleThemeAndFont } from "../components/toggle-theme-and-font";
import { useAppSettings } from "../hooks/use-app-settings";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../components/loading";
import { DashboardNav } from "../components/dashboard-nav";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { CountdownTimer } from "../components/countdown-timer";

type OrderItem = {
    id: number;
    orderId: number;
    menuItemId: number;
    quantity: number;
    note?: string;
    menuItem: {
        name: string;
        price: string;
    };
};

type Order = {
    id: number;
    storeId: number;
    customerName: string;
    customerPhone: string;
    address: string;
    deliveryType: string;
    paymentMethod: string;
    totalAmount: string;
    status: string;
    createdAt: string;
    cancellationScheduledAt: string | null;
    expectedStatus: string | null;
    orderItems: OrderItem[];
};

export const AdminDashboard = () => {
    const {
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleTheme,
    } = useAppSettings();

    const { user, loading, error } = useAuth();
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [activePanel, setActivePanel] = useState<number | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    // const orders2 = [
    //     { id: 1, status: "Pendente" },
    //     { id: 2, status: "Em Preparação" },
    //     { id: 3, status: "Pronto para Retirada" },
    //     { id: 4, status: "Cancelado" },
    //     { id: 5, status: "Entregue" },
    //     { id: 6, status: "Entregue" },
    //     { id: 7, status: "Entregue" },
    //     { id: 8, status: "Entregue" },
    //     { id: 9, status: "Entregue" },
    // ]

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

    const togglePanel = (panelIndex: number) => {
        setActivePanel(activePanel === panelIndex ? null : panelIndex);
    };

    console.log(orders)

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
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mt-46 sm:mt-26 w-full p-3.5">
                                <li className={`${activePanel === 0 ? 'max-h-[800px]' : 'max-h-[50px]'} w-full bg-yellow-500 rounded-xl text-black`}>
                                    <div className="flex items-center justify-between gap-2 p-2">
                                        <IoIosArrowDown
                                            className={`${activePanel === 0 ? 'rotate-180' : ''} text-2xl cursor-pointer hover:text-white transition-all duration-300`}
                                            onClick={() => togglePanel(0)}
                                        />
                                        <span className="text-lg flex-2">Aguardando aprovação</span>
                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">55</span>
                                    </div>
                                    <div className={`${activePanel === 0 ? 'block' : 'hidden'} flex flex-col items-center px-4 gap-2 transition-all duration-6500`}>
                                        <div className={`${fontSize} w-full flex flex-col items-start gap-2 px-2.5 py-2 border-y-[1px] border-white`}>
                                            <h1 className="text-center mx-auto px-2 text-lg font-bold border-b-2 border-black">{orders[0]?.customerName}</h1>
                                            <CountdownTimer createdAt={orders[0]?.createdAt} durationSeconds={600} />
                                            <ul className="w-full ">
                                                <li><span className="font-bold border-l-2 px-2 border-black">Items:</span></li>
                                                {orders[0]?.orderItems.map((item, index) => (
                                                    <ul key={index} className="w-full">
                                                        <li
                                                            key={index}
                                                            className={`${index % 2 === 0 ? 'bg-white/30' : ''} w-full rounded-sm px-2.5 flex justify-between items-center`}
                                                        >
                                                            <p>- {item.menuItem.name}</p>
                                                            <p className="text-sm">R$ {item.menuItem.price}</p>
                                                        </li>
                                                    </ul>
                                                ))}
                                                <li className="flex justify-end px-2.5"><span className="font-bold pr-2">Total:</span> R$ {orders[0]?.totalAmount}</li>
                                            </ul>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">pagamento: </span>{orders[0]?.paymentMethod}</p>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">tipo: </span>{orders[0]?.deliveryType}</p>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">endereço: </span>{orders[0]?.address}</p>
                                            <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                <button className={`${fontSize} bg-green-500 px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`}>Aceitar</button>
                                                <button className={`${fontSize} bg-red-500 px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`}>Recusar</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-full h-24 bg-blue-600 rounded-xl">
                                    <div className="flex items-center justify-between p-2">
                                        <span className="text-white text-lg">Em Preparação</span>
                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">55</span>
                                    </div>
                                    <button>Pedido pronto</button>
                                    <button>Cancelar pedido</button>
                                </li>
                                <li className="w-full h-24 bg-green-500 rounded-xl">
                                    <div className="flex items-center justify-between p-2">
                                        <span className="text-white text-lg">Pronto para Retirada</span>
                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">55</span>
                                    </div>
                                    <button>Pedido entregue</button>
                                    <button>Cancelar pedido</button>
                                </li>
                                <li className="w-full h-24 bg-green-800 rounded-xl">
                                    <div className="flex items-center justify-between p-2">

                                        <span className="text-white text-lg">Entregue</span>
                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">55</span>
                                    </div>
                                </li>
                                <li className="w-full h-24 bg-red-600 rounded-xl">
                                    <div className="flex items-center justify-between p-2">
                                        <span className="text-white text-lg">Cancelado</span>
                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">55</span>
                                    </div>
                                </li>
                            </ul>
                        )}

                    </main>
                </>
            )}
        </>
    );
};