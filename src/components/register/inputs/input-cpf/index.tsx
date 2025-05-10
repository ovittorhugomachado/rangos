import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCPFProps } from "../../../../types/register-inputs.d";

const InputCPF = ({
    control,
    initialValues = {},
}: InputCPFProps) => {

    return (
        <Controller
            name="cpf"
            control={control}
            defaultValue={initialValues.cpf || ""}
            rules={{
                required: "Campo obrigatório",
                validate: (value) => {
                    const digits = value?.replace(/\D/g, '') || '';
                    if (digits.length > 0 && digits.length < 11) {
                        return "Digite os 11 dígitos do CPF";
                    }
                    return true;
                },
            }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor="cpf" className="label">
                        CPF *
                        {fieldState.error && (
                            <span className="span-error">
                                {fieldState.error.message}
                            </span>
                        )}
                    </label>

                    <IMaskInput
                        {...field}
                        mask="000.000.000-00"
                        placeholder="000.000.000-00"
                        className={`input mb-2 ${fieldState.error ? "input-error" : ""}`}
                        onAccept={(value) => field.onChange(value)}
                    />
                </>
            )}
        />
    )
}

export { InputCPF }