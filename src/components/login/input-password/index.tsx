import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { InputPasswordProps } from "../../../types/login-inputs.d";

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

        // <Controller
        //     name="password"
        //     control={control}
        //     rules={{
        //         required: "Digite sua senha",
        //         minLength: {
        //             value: 2,
        //             message: "Digite sua senha"
        //         },
        //     }}
        //     render={({ field, fieldState }) => {
        //         const password = field.value || '';

        //         return (
        //             <div className="relative">
        //                 <label htmlFor="password" className="label">
        //                     Senha *
        //                     {fieldState.error && (
        //                         <span className="span-error">
        //                             {fieldState.error.message}
        //                         </span>
        //                     )}
        //                 </label>

        //                 <div className="relative flex items-center">
        //                     <input
        //                         {...field}
        //                         type={showPassword ? "text" : "password"}
        //                         placeholder="crie sua senha"
        //                         className={`input mb-2 mt-1 !pr-10 ${fieldState.error ? "input-error" : ""}`}
        //                     />

        //                     <button
        //                         type="button"
        //                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        //                         onClick={() => setShowPassword(!showPassword)}
        //                         aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        //                     >
        //                         {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
        //                     </button>
        //                 </div>
        //             </div>
        //         );
        //     }}
        // />
    )
}

export { InputPassword }