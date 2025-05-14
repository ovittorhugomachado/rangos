export interface LoginFormData {
    email: string;
    password: string;
    message: string,
    error: unknown;
}

export interface LoginContainerProps {
    onSubmit: (data: LoginFormData) => void;
    isLoading: boolean;
    message: string;
    error: string;
    initialValues?: Partial<LoginFormData>;
}