import { InputCustomerNameProps } from "../../../types/account-input-types.d";

export const InputCustomerName = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputCustomerNameProps) => {
    return (
        <>
            <label htmlFor="name" className="label">
                Nome *
                {errors.customerName && (
                    <span className="span-error">
                        {errors.customerName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="name"
                type="text"
                className={`input-store mb-2 ${errors.customerName ? "input-error-store" : ""} autofill:text-black`}
                placeholder="Nome"
                defaultValue={initialValues.customerName || ""}
                {...register("customerName", {
                    required: "Nome do cliente obrigatório",
                    minLength: {
                        value: 2,
                        message: "Nome do cliente obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("customerName");
                        }
                    }
                })}
            />
        </>
    )
};