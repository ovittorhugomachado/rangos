import { InputCustomerAddressProps } from "../../../types/account-input-types.d";

export const InputCustomerAddress = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: InputCustomerAddressProps) => {

    return (
        <>
            <label htmlFor="customerAddress" className="label">
                Endereço
                {errors.customerAddress && (
                    <span className="span-error">
                        {errors.customerAddress.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="address"
                type="text"
                className={`input mb-2 ${errors.customerAddress ? "input-error" : ""}`}
                placeholder="Endereço"
                defaultValue={initialValues.customerAddress || ""}
                {...register("customerAddress", {
                    minLength: {
                        value: 2,
                        message: "Campo obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("customerAddress");
                        }
                    }
                })}
            />
        </>
    )
};