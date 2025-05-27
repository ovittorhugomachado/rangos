import { UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { AccountData } from "./account-types.d";

export interface InputNameProps {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
}

export interface InputCNPJProps {
    control: Control<AccountData>;
    initialValues?: Partial<AccountData>;
}

export interface InputCPFProps {
    control: Control<AccountData>;
    initialValues: Partial<AccountData>;
}

export interface InputPhoneNumberProps {
    control: Control<AccountData>;
    initialValues: Partial<AccountData>;
}

export interface InputEmailProps {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
}

export interface InputPasswordProps {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    watch: UseFormWatch<AccountData>;
    initialValues?: Partial<AccountData>;
}

