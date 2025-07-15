import { createContext } from "react";
import { Cart, CartItem } from "./types";

export const CartContext = createContext<{
    cart: Cart;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
}>({
    cart: { items: [], total: 0 },
    addItem: () => {},
    removeItem: () => {},
});
