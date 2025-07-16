import { OpeningHour } from "./types-schedules.d";

export type RestaurantData = {
  restaurantName: string;
  logoUrl: string;
  bannerUrl: string;
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

export type RestaurantContainerProps = {
  onSubmit: (data: RestaurantData) => void;
  isLoading: boolean;
  error?: string;
  initialValues?: Partial<RestaurantData>;
}