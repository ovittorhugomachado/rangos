import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCustomerPhoneNumberProps } from "../../../types/types-input.d"

export const InputCustomerPhoneNumber = ({
    control,
    initialValues = {},
}: InputCustomerPhoneNumberProps) => {
    return (
        <Controller
            name="customerPhone"
            control={control}
            defaultValue={initialValues.customerPhone || ""}
            rules={{
                required: "Campo obrigatório",
                pattern: {
                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                    message: "Digite no formato (99) 99999-9999",
                },
            }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor="phoneNumber" className="label">
                        Celular *
                        {fieldState.error && (
                            <span className="span-error">
                                {fieldState.error.message}
                            </span>
                        )}
                    </label>
                    <IMaskInput
                        {...field}
                        mask="(00) 00000-0000"
                        placeholder="(99) 99999-9999"
                        className={`input-store mb-2 ${fieldState.error ? 'input-error-store' : ''}`}
                        onAccept={(value) => field.onChange(value)}
                    />
                </>
            )}
        />
    )
};