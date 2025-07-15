export type CartItem = { id: number; name: string; price: number; };

export type Cart = { items: CartItem[]; total: number; };