import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { InputPasswordProps } from "../../../../types/register-inputs.d";

const InputPassword = ({ control }: InputPasswordProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name="password"
            control={control}
            rules={{
                required: "Campo obrigatório",
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message: "digite uma senha válida",
                },
            }}
            render={({ field, fieldState }) => {
                const password = field.value || '';
                const requirements = [
                    { id: 1, text: "8 caracteres", regex: /.{8,}/ },
                    { id: 2, text: "Letra maiúscula", regex: /[A-Z]/ },
                    { id: 3, text: "Letra minúscula", regex: /[a-z]/ },
                    { id: 4, text: "Número", regex: /\d/ },
                    { id: 5, text: "Caractere especial", regex: /[\W_]/ }
                ];

                return (
                    <div className="relative">
                        <label htmlFor="password" className="label">
                            Senha *
                            {fieldState.error && (
                                <span className="span-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </label>

                        <div className="relative flex items-center">
                            <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="crie sua senha"
                                className={`input mb-2 mt-1 !pr-10 ${fieldState.error ? "input-error" : ""}`}
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

                        <div className="mb-4 text-gray-500">
                            {requirements.map(req => (
                                <div
                                    key={req.id}
                                    className="flex items-center"
                                >
                                    {req.regex.test(password) ? (
                                        <IoCheckmarkCircleOutline className="w-4 h-4 mr-1 text-green-700" />
                                    ) : (
                                        <IoCheckmarkCircleSharp className="w-4 h-4 mr-1 text-zinc-600" />
                                    )}
                                    {req.text}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }}
        />
    )
}

export { InputPassword }