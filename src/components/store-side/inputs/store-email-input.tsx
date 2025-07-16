import { InputEmailProps } from "../../../types/account-input-types.d";

export const InputEmail = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputEmailProps) => {

    return (
        <div className="flex flex-col gap-1">
            
            <label htmlFor="email" className="label">
                Email
                {errors.email && (
                    <span className="span-error">
                        {errors.email.message}
                    </span>
                )}
            </label>
            <input
                id="email"
                type="email"
                className={errors.email ? "input-error" : "input"}
                placeholder="Digite seu email"
                defaultValue={initialValues.email || ""}
                {...register("email", {
                    required: "Campo obrigatório",
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Digite um e-mail válido",
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 2) {
                            clearErrors("email");
                        }
                    }
                })}
            />

        </div>
    )
};