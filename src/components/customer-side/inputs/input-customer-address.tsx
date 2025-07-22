import { InputCustomerAddressProps } from "../../../types/types-input.d";

export const InputCustomerAddress = ({
    backgroundColor,
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: InputCustomerAddressProps) => {
console.log(backgroundColor)
    return (
        <>
            <label htmlFor="customerAddress" className="w-full text-base font-medium mb-1 flex flex-col">
                Endereço
                {errors.customerAddress && (
                    <span className="text-xs font-normal text-red-600 mt-1">
                        {errors.customerAddress.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="address"
                type="text"
                className={`w-full text-base border border-zinc-300 rounded-md mb-2 px-3 py-2 input-store ${errors.customerAddress ? " border-red-500 input-error-store" : ""} ${backgroundColor === 'white' ? 'bg-white text-black autofill:caret-lime-700' : 'bg-black text-white'}`}
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
    );
};