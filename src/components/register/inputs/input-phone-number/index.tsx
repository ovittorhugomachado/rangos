import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputPhoneNumberProps } from "../../../../types/register-inputs.d"

const InputPhoneNumber = ({
    control,
    initialValues = {},
}: InputPhoneNumberProps ) => {
    return (
        <Controller
        name="number"
        control={control}
        defaultValue={initialValues.number || ""}
        rules={{
            required: "Campo obrigatório",
            pattern: {
                value: /^\(\d{2}\) \d{5}-\d{4}$/,
                message: "Digite no formato (99) 99999-9999",
            },
        }}
        render={({ field, fieldState }) => (
            <>
                <label htmlFor="number" className="label">
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
                    className={`input mb-2 ${fieldState.error ? 'input-error' : ''}`}
                    onAccept={(value) => field.onChange(value)}
                />
            </>

        )}
    />
    )
}

export { InputPhoneNumber }