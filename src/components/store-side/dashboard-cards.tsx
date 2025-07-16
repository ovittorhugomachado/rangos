import { useEffect, useRef, useMemo } from "react";
import { toMoney } from "../../utils/function-transform-to-money";
import { CountdownTimer } from "./countdown-timer"
import { DashboardCardOrdersProps } from "../../types/types-orders.d";
import { IoIosArrowDown } from "react-icons/io"

export const DashboardCards = ({
    fontSize,
    orders,
    activePanel,
    setActivePanel,
    onAcceptOrder,
    onCancelOrder,
    onOrderReady,
    onOrderDelivered
}: DashboardCardOrdersProps) => {

    const cards = useMemo(() => [
        {
            id: 0,
            name: "Aguardando aprovação",
            status: "aguardando_aprovacao",
            color: "bg-yellow-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 1,
            name: "Em preparação",
            status: "em_preparo",
            color: "bg-blue-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 2,
            name: "Prontos",
            status: ["pronto_para_retirada", "a_caminho"],
            color: "bg-green-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 3,
            name: "Entregues",
            status: "entregue",
            color: "bg-green-800",
            titleColor: "text-white",
            textColor: "text-zinc-300"
        },
        {
            id: 4,
            name: "Cancelados",
            status: ["cancelado", "cancelado_automaticamente"],
            color: "bg-red-600",
            titleColor: "text-white",
            textColor: "text-zinc-300"
        },
    ], []);

    const togglePanel = (panelIndex: number) => {
        setActivePanel((prev) =>
            prev.includes(panelIndex)
                ? prev.filter((id) => id !== panelIndex)
                : [...prev, panelIndex]
        );
    };

    const alertAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const aguardandoCard = cards.find(card => card.id === 0);
        const aguardandoOrders = Array.isArray(aguardandoCard?.status)
            ? orders.filter(order => aguardandoCard.status.includes(order.status))
            : orders.filter(order => order.status === aguardandoCard?.status);

        if (aguardandoOrders.length > 0) {
            if (alertAudioRef.current) {
                alertAudioRef.current.currentTime = 0;
                alertAudioRef.current.play();
            }
        } else {
            if (alertAudioRef.current) {
                alertAudioRef.current.pause();
                alertAudioRef.current.currentTime = 0;
            }
        }
    }, [orders, cards]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <audio ref={alertAudioRef} src="./alert.mp3" preload="auto" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full p-3.5 pb-20 items-start">
                {cards.map((card, index) => {
                    const cardOrders = Array.isArray(card.status)
                        ? orders.filter(order => card.status.includes(order.status))
                        : orders.filter(order => order.status === card.status);
                    return (
                        <li
                            key={index}
                            className={
                                `${activePanel.includes(card.id) ? '' : 'max-h-[70px]'} ${card.id === 0 && cardOrders.length > 0 ? 'order-alert' : ''} ${card.color} relative w-full ${card.titleColor} rounded-xl`
                            }
                        >
                            {card.id === 0 && cardOrders.length > 0 && (
                                <span className="text-base absolute top-[-27px] text-red-500 text-alert">Novo pedido</span>
                            )}
                            <div className="flex items-center justify-between gap-2 p-2">
                                <IoIosArrowDown
                                    className={`${activePanel.includes(card.id) ? 'rotate-180' : ''} text-2xl cursor-pointer transition-all duration-300`}
                                    onClick={() => togglePanel(card.id)}
                                />
                                <span className="text-lg flex-2">{card.name}</span>
                                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-sm">{cardOrders.length}</span>
                            </div>
                            {cardOrders.length === 0 ? (
                                <p className={`${activePanel.includes(card.id) ? 'block' : 'hidden'} ${fontSize} text-center py-4`}>Nenhum pedido</p>
                            ) : (
                                <div className={`${activePanel.includes(card.id) ? 'block' : 'hidden'} ${card.textColor} flex flex-col items-center px-4`}>
                                    {cardOrders.map((order, orderIndex) => (
                                        <div key={orderIndex} className={`${fontSize} w-full relative flex flex-col items-start gap-2 px-2.5 pt-4 py-2 border-y-[1px] border-white`}>
                                            <h1 className="text-center mx-auto px-2 text-lg font-bold border-b-2 border-black">{order.customerName}</h1>
                                            {card.name === "Aguardando aprovação" && (
                                                <CountdownTimer createdAt={order.createdAt} durationSeconds={600} />
                                            )}
                                            <ul className="w-full">
                                                <li><span className="font-bold border-l-2 px-2 border-black">Items:</span></li>
                                                {order.orderItems.map((item, index) => (
                                                    <li
                                                        key={item.id}
                                                        className={`w-full rounded-sm px-2.5 flex justify-between items-center ${index % 2 === 0 ? 'bg-white/30' : ''}`}
                                                    >
                                                        <p>- {item.menuItem.name}</p>
                                                        <p className="text-sm">{toMoney(Number(item.menuItem.price))}</p>
                                                    </li>
                                                ))}
                                                <li className="flex justify-end"><span className="font-bold pr-2">Total: {toMoney(Number(order.totalAmount))}</span></li>
                                            </ul>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">pagamento: </span>{order.paymentMethod}</p>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">tipo: </span>{order.deliveryType}</p>
                                            <p className="border-l-2 px-2 border-black"><span className="font-bold">endereço: </span>{order.address}</p>
                                            {card.status === "aguardando_aprovacao" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className={`${fontSize} bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onAcceptOrder(order.id)}>Aceitar</button>
                                                    <button className={`${fontSize} bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onCancelOrder(order.id)}>Recusar</button>
                                                </div>
                                            )}
                                            {card.status === "em_preparo" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className={`${fontSize} bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onOrderReady(order.id)}>Pedido pronto</button>
                                                    <button className={`${fontSize} bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onCancelOrder(order.id)}>Cancelar pedido</button>
                                                </div>
                                            )}
                                            {Array.isArray(card.status) && card.status.includes(order.status) && card.name !== "Cancelados" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className={`${fontSize} bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onOrderDelivered(order.id)}>Pedido entregue</button>
                                                    <button className={`${fontSize} bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300`} onClick={() => onCancelOrder(order.id)}>Cancelar pedido</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};
