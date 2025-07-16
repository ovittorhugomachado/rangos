import { InputMenuItemNameProps } from "../../../types/types-input.d";

export const InputName = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputMenuItemNameProps) => {
    return (
        <>
            <label htmlFor="name" className="label">
                Nome *
                {errors.name && (
                    <span className="span-error">
                        {errors.name.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="name"
                type="text"
                className={`input mb-2 ${errors.name ? "input-error" : ""} autofill:text-black`}
                placeholder="Nome"
                defaultValue={initialValues.name || ""}
                {...register("name", {
                    required: "Nome obrigatório",
                    minLength: {
                        value: 2,
                        message: "Nome obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("name");
                        }
                    }
                })}
            />
        </>
    )
};