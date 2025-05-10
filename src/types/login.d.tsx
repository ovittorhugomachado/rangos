export interface LoginFormData {
    email: string;
    password: string;
    error: unknown;
}

export interface LoginContainerProps {
    onSubmit: (data: LoginFormData) => void;
    isLoading: boolean;
    error?: string;
    initialValues?: Partial<LoginFormData>;
}