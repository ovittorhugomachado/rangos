import { UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { AccountData, MenuItemData } from "./types-account.d";
import { OrderFormData } from "./types-orders.d";

export type InputNameProps = {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
};

export type InputCustomerNameProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
};

export type InputMenuItemNameProps = {
    register: UseFormRegister<MenuItemData>;
    errors: FieldErrors<MenuItemData>;
    clearErrors: UseFormClearErrors<MenuItemData>;
    initialValues?: Partial<MenuItemData>;
};

export type InputMenuItemPriceProps = {
    register: UseFormRegister<MenuItemData>;
    errors: FieldErrors<MenuItemData>;
    clearErrors: UseFormClearErrors<MenuItemData>;
    initialValues: Partial<MenuItemData>;
};

export type InputAddressProps = {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
}

export type InputCustomerAddressProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}

export type InputCNPJProps = {
    control: Control<AccountData>;
    initialValues?: Partial<AccountData>;
}

export type InputCPFProps = {
    control: Control<AccountData>;
    initialValues: Partial<AccountData>;
}

export type InputPhoneNumberProps = {
    control: Control<AccountData>;
    initialValues: Partial<AccountData>;
}

export type InputCustomerPhoneNumberProps = {
    control: Control<OrderFormData>;
    initialValues: Partial<OrderFormData>;
}

export type InputEmailProps = {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
}

export type InputPasswordProps = {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    watch: UseFormWatch<AccountData>;
    initialValues?: Partial<AccountData>;
}

export type InputDeliveryTypeProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}

export type InputPaymentMethodProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}
