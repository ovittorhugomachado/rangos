import { UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { AccountFormData } from "./account-types.d";

export interface inputNameProps {
    register: UseFormRegister<AccountFormData>;
    errors: FieldErrors<AccountFormData>;
    clearErrors: UseFormClearErrors<AccountFormData>;
    initialValues?: Partial<AccountFormData>;
}

export interface InputCNPJProps {
    control: Control<AccountFormData>;
    initialValues?: Partial<AccountFormData>;
}

export interface InputCPFProps {
    control: Control<AccountFormData>;
    initialValues: Partial<AccountFormData>;
}

export interface InputPhoneNumberProps {
    control: Control<AccountFormData>;
    initialValues: Partial<AccountFormData>;
}

export interface InputEmailProps {
    register: UseFormRegister<AccountFormData>;
    errors: FieldErrors<AccountFormData>;
    clearErrors: UseFormClearErrors<AccountFormData>;
    initialValues?: Partial<AccountFormData>;
}

export interface InputPasswordProps {
    register: UseFormRegister<AccountFormData>;
    errors: FieldErrors<AccountFormData>;
    clearErrors: UseFormClearErrors<AccountFormData>;
    watch: UseFormWatch<AccountFormData>;
    initialValues?: Partial<AccountFormData>;
}

