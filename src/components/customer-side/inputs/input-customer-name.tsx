import { InputCustomerNameProps } from "../../../types/types-input.d";

export const InputCustomerName = ({
    backgroundColor,
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputCustomerNameProps) => {
    
    return (
        <>
            <label htmlFor="name" className="w-full text-base font-medium mb-1 flex flex-col">
                Nome *
                {errors.customerName && (
                    <span className="text-xs font-normal text-red-600 mt-1">
                        {errors.customerName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="name"
                type="text"
                className={`w-full text-base border border-zinc-300 rounded-md mb-2 px-3 py-2 input-store ${errors.customerAddress ? " border-red-500 input-error-store" : ""} ${backgroundColor === 'white' ? 'bg-white text-black autofill:caret-lime-700' : 'bg-black text-white'}`}
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