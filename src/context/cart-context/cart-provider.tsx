import React, { useState } from "react";
import { CartContext } from "./cart-context";
import { Cart, CartItem } from "../../types/cart-types";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : { items: [], total: 0 };
    });

    const addItem = (item: CartItem) => {
        const items = [...cart.items, item];
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0));
        setCart({ items, total });
        localStorage.setItem("cart", JSON.stringify({ items, total }));
    };

    const removeItem = (id: number) => {
        const items = cart.items.filter(item => item.id !== id);
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0));
        setCart({ items, total });
        localStorage.setItem("cart", JSON.stringify({ items, total }));
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};