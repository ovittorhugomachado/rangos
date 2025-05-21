export interface AccountFormData {
  restaurantName: string;
  cnpj: string;
  ownersName: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  password: string;
  token: string;
  message: string;
  error: unknown;
}

export interface AccountContainerProps {
  onSubmit: (data: AccountFormData) => void;
  isLoading: boolean;
  message: string;
  error?: string;
  initialValues?: Partial<AccountFormData>;
}
