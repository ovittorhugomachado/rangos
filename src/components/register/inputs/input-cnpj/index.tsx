import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCNPJProps } from "../../../../types/inputs.d";

const InputCNPJ = ({
  control,
  initialValues = {},
}: InputCNPJProps) => {

  return (
    <Controller
      name="cnpj"
      control={control}
      defaultValue={initialValues.cnpj || ""}
      rules={{
        validate: (value) => {
          const digits = value?.replace(/\D/g, '') || '';
          if (digits.length > 0 && digits.length < 14) {
            return "Digite os 14 dígitos do CNPJ";
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <>
          <label htmlFor="cnpj" className="label">
            CNPJ
            {fieldState.error && (
              <span className="span-error">
                {fieldState.error.message}
              </span>
            )}
          </label>

          <IMaskInput
            {...field}
            mask="00.000.000/0000-00"
            placeholder="00.000.000/0000-00"
            className={`input mb-2 ${fieldState.error ? "input-error" : ""}`}
            onAccept={(value) => field.onChange(value)}
          />
        </>
      )}
    />
  );
};

export { InputCNPJ }