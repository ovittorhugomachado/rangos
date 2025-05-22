export type DayOfWeek = 'domingo' | 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado';

export interface RestaurantData {
  restaurantName: string;
  restaurantImage: string;
  backgroundColor: string;
  openingHours: {
    day: DayOfWeek; // Valor único, não array
    open: string;
    close: string;
    isClosed?: boolean;
  }[];
  cartValue: string,
  phoneNumber?: string;
  message?: string;
  error?: unknown;
}
