import { OrderRequest } from "../types/orders-types.d";

export const createOrder = async (order: OrderRequest) => {
    const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar pedido");
    }

    return await response.json();
};