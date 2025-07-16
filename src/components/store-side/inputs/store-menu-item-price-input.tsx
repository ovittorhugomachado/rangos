import { InputMenuItemPriceProps } from "../../../types/account-input-types.d";

export const InputPrice = ({
    register,
    errors,
    clearErrors,
}: InputMenuItemPriceProps) => {
    return (
        <>
            <label htmlFor="price" className="label">
                Preço *
                {errors.price && (
                    <span className="span-error">
                        {errors.price.message?.toString()}
                    </span>
                )}
            </label>
            <div className="relative w-full">
                <span className="absolute left-3 top-0 translate-y-2/6 text-zinc-500 pointer-events-none">R$</span>
                <input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9,]*"
                    style={{ paddingLeft: "2.5rem" }}
                    className={`${errors.price ? "input-error" : ""} pl-10 input mb-2.5 autofill:text-black`}
                    placeholder="Preço"
                    {...register("price", {
                        required: "Preço obrigatório",
                        minLength: {
                            value: 1,
                            message: "Preço obrigatório"
                        },
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/[^0-9,]/g, "");
                            if (e.target.value.length > 0) {
                                clearErrors("price");
                            }
                        }
                    })}
                />
            </div>
        </>
    );
};