export interface RegisterFormData {
  restaurantName: string;
  cnpj: string;
  ownersName: string;
  cpf: string;
  number: string;
  email: string;
  password: string;
  error: unknown;
}

export interface RegisterContainerProps {
    onSubmit: (data: RegisterFormData) => void;
    isLoading: boolean;
    error?: string;
    initialValues?: Partial<RegisterFormData>;
  }
