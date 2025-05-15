import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { InputPasswordProps } from "../../../types/account-input-types.d"

const InputPassword = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputPasswordProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-1">

                <label htmlFor="password" className="label">
                    Senha
                    {errors?.password && (
                        <span className="span-error">
                            {errors.password.message?.toString()}
                        </span>
                    )}
                </label>

                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={errors.password ? "input-error" : "input"}
                        placeholder="Digite sua senha"
                        defaultValue={initialValues.password || ""}
                        {...register("password", {
                            required: "Campo obrigatório",
                            onChange: (e) => {
                                if (e.target.value.length > 2) {
                                    clearErrors("password");
                                }
                            }
                        })}
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                    </button>
                </div>

            </div>
        </>
    )
}

export { InputPassword }