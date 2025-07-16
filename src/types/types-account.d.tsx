import { OpeningHour } from "./types-schedules.d";


export type AccountData = {
  pageStyle(pageStyle: unknown): unknown;
  id: number;
  email: string;
  password: string;
  restaurantName: string;
  name: string;
  address: string;
  activeAccount: boolean;
  delivery: boolean;
  pickup: boolean;
  plan: string;
  cratedAt: Date;
  cnpj: string;
  cpf: string;
  ownersName: string;
  phoneNumber: string;
  passwordResetToken: object;
  storeCustomization: object;
  openingHours: OpeningHour[];

  primaryColor: string;
  backgroundColor: string;
  textButtonColor: string;
  logoUrl: string;
  bannerUrl: string;

  token: string;

  message: string;
  error: unknown;
}

export type MenuItemData = {
  name: string;
  description: string;
  price: string;
  message: string;
  error: unknown;
}

export type AccountContainerProps = {
  onSubmit: (data: AccountData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountData>;
};

export type MenuItemContainerProps = {
  onSubmit: (data: AccountData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountData>;
}

