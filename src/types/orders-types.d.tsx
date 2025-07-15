export type OrderItem = {
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

export type Order = {
    id: number;
    storeId: number;
    customerName: string;
    customerPhone: string;
    address: string;
    deliveryType: "delivery" | "pickup";
    paymentMethod: "dinheiro" | "cartao" | "pix";
    totalAmount: string;
    status: string;
    createdAt: string;
    cancellationScheduledAt: string | null;
    expectedStatus: string | null;
    orderItems: OrderItem[];
};

export type OrderFormData = {
    customerName: string;
    customerPhone: string;
    deliveryType: "delivery" | "pickup";
    customerAddress: string;
    paymentMethod: string;
    items: Array<{
        id: number;
        name: string;
        price: number;
    }>;
    message: string;
    error: unknown;
};