export interface AccountData {
  pageStyle(pageStyle: unknown): unknown;
  id: number;
  email: string;
  password: string;
  restaurantName: string;
  activeAccount: boolean;
  plan: string;
  cratedAt: Date;
  cnpj: string;
  cpf: string;
  ownersName: string;
  phoneNumber: string;
  passwordResetToken: object;
  storeCustomization: object;
  openingHours: object;

  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  textButtonColor: string;
  logoUrl: string;
  bannerUrl: string;

  token: string;

  message: string;
  error: unknown;
}

export interface AccountContainerProps {
  onSubmit: (data: AccountData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountData>;
}
