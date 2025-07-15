import { useEffect, useState } from "react";

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

export const PlaygroundPage = () => {

    const [arrayOrders, setArrayOrders] = useState<Order[]>([]);

    const fetchOrder = async () => {
        try {

            const order = await fetch(`http://localhost:3000/order/list?limit=50&offset=0`, {
                credentials: 'include',
            })

            const data = await order.json();
            setArrayOrders(data.data);
            return data;

        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [arrayOrders]);

    return (
        <>

        </>
    );
};
