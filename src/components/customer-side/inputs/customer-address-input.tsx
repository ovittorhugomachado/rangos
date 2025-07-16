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
                className={`input-store mb-2 ${errors.customerAddress ? "input-error-store" : ""}`}
                placeholder="Endereço"
                defaultValue={initialValues.customerAddress || ""}
                {...register("customerAddress", {
                    required: "Endereço obrigatório",
                    minLength: {
                        value: 10,
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