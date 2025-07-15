import { useState } from "react";
import { Cart, CartItem } from "./types";
import { CartContext } from "./context";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

    const addItem = (item: CartItem) => {
        const items = [...cart.items, item];
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0).toFixed(2));
        setCart({ items, total });
    };

    const removeItem = (id: number) => {
        const items = cart.items.filter(i => i.id !== id);
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0).toFixed(2));
        setCart({ items, total });
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};