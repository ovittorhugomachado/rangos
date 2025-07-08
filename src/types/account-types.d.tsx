type TimeRange = {
  open: string;
  close: string;
};

interface OpeningHour {
  day: string;
  status: string;
  timeRanges: TimeRange[];
}


export interface AccountData {
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

export interface MenuItemData {
  name: string;
  description: string;
  price: string;
  message: string;
  error: unknown;
}

export interface AccountContainerProps {
  onSubmit: (data: AccountData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountData>;
};

export interface MenuItemContainerProps {
  onSubmit: (data: AccountData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountData>;
}

