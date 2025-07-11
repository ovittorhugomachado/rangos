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
    deliveryType: string;
    paymentMethod: string;
    totalAmount: string;
    status: string;
    createdAt: string;
    cancellationScheduledAt: string | null;
    expectedStatus: string | null;
    orderItems: OrderItem[];
};