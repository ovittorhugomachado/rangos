export type DayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export interface OpeningHour {
  day: DayOfWeek;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface RestaurantData {
  restaurantName: string;
  restaurantImage: string;
  backgroundColor: string;
  cnpj: string,
  delivery: boolean;
  pickup: boolean;  
  openingHours: OpeningHour[];
  cartValue: string,
  phoneNumber?: string;
  message?: string;
  error?: unknown;
}

export interface Category {
  id: number; 
  name: string;
};

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryId: number;
  isAvailable: boolean;
};

export interface RestaurantContainerProps {
  onSubmit: (data: RestaurantData) => void;
  isLoading: boolean;
  error?: string;
  initialValues?: Partial<RestaurantData>;
}