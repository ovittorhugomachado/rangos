export type DayOfWeek = 'domingo' | 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado';

export interface OpeningHour {
  day: DayOfWeek;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface RestaurantData {
  restaurantName: string;
  id: number;
  restaurantImage: string;
  backgroundColor: string;
  openingHours: OpeningHour[];
  cartValue: string,
  phoneNumber?: string;
  message?: string;
  error?: unknown;
}
