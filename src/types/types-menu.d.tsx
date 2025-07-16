export type Category = {
  id: number; 
  name: string;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryId: number;
  isAvailable: boolean;
};