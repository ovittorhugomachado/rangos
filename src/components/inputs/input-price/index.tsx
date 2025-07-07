import { InputMenuItemPriceProps } from "../../../types/account-input-types.d";

const InputPrice = ({
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
            <input
                id="price"
                type="text"
                className={`input mb-2.5 ${errors.price ? "input-error" : ""} autofill:text-black`}
                placeholder="Preço"
                {...register("price", {
                    required: "Preço obrigatório",
                    minLength: {
                        value: 1,
                        message: "Preço obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 0) {
                            clearErrors("price");
                        }
                    }
                })}
            />
        </>
    );
};

export { InputPrice };