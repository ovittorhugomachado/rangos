import { UseFormRegister, UseFormClearErrors, FieldErrors } from "react-hook-form";
import { LoginFormData } from "./login.d";

export interface InputEmailProps {
    register: UseFormRegister<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    clearErrors: UseFormClearErrors<LoginFormData>;
    initialValues?: Partial<LoginFormData>;
}

export interface InputPasswordProps {
    register: UseFormRegister<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    clearErrors: UseFormClearErrors<LoginFormData>;
    initialValues?: Partial<LoginFormData>;
}

