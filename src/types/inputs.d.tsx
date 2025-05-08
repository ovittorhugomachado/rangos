import { UseFormRegister, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { RegisterFormData } from "./register.d";

export interface inputNameProps {
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    clearErrors: UseFormClearErrors<RegisterFormData>;
    initialValues?: Partial<RegisterFormData>;
}
export interface InputCNPJProps {
    control: Control<RegisterFormData>;
    initialValues?: Partial<RegisterFormData>;
}

export interface InputCPFProps {
    control: Control<RegisterFormData>;
    initialValues: Partial<RegisterFormData>;
}

export interface InputPhoneNumberProps {
    control: Control<RegisterFormData>;
    initialValues: Partial<RegisterFormData>;
}

export interface InputEmailProps {
    control: Control<RegisterFormData>;
    initialValues?: Partial<RegisterFormData>;
}