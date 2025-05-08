import { inputNameProps } from "../../../../types/inputs.d";

const InputOwnersName = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: inputNameProps) => {
    return (
        <>
            <label htmlFor="ownersName" className="label">
                    Nome do Proprietário *
                    {errors.ownersName && (
                        <span className="span-error">
                            {errors.ownersName.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    id="ownersName"
                    type="text"
                    className={`input mb-2 ${errors.ownersName ? "input-error" : ""} autofill:text-black`}
                    placeholder="Proprietário"
                    defaultValue={initialValues.ownersName || ""}
                    {...register("ownersName", {
                        required: "Campo obrigatório",
                        minLength: {
                            value: 2,
                            message: "Campo obrigatório"
                        },
                        onChange: (e) => {
                            if (e.target.value.length > 4) {
                                clearErrors("ownersName");
                            }
                        }
                    })}
                />
        </>
    )
}

export { InputOwnersName }