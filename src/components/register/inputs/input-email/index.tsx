import { Controller } from "react-hook-form";
import { InputEmailProps } from "../../../../types/inputs.d";

const InputEmail = ({ control, initialValues = {} }: InputEmailProps) => {
  return (
    <Controller
      name="email"
      control={control}
      defaultValue={initialValues.email || ""}
      rules={{
        required: "Campo obrigatório",
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Digite um e-mail válido",
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <>
          <label htmlFor="email" className="label">
            Email *
            {error && (
              <span className="span-error">
                {error.message}
              </span>
            )}
          </label>
          <input
            {...field}
            id="email"
            type="email"
            className={`input mb-2 ${error ? "input-error" : ""}`}
            placeholder="restaurante@email.com"
          />
        </>
      )}
    />
  );
};

export { InputEmail };