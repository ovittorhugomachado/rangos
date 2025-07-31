import { InputRestaurantNameProps } from "../../../types/types-input.d";

export const InputRestaurantName = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: InputRestaurantNameProps) => {

    return (
        <>
            <label
                htmlFor="restaurantName"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Nome do Restaurante *
                {errors.restaurantName && (
                    <span className="span-error">
                        {errors.restaurantName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="restaurantName"
                type="text"
                className={`input ${errors.restaurantName ? " input-error" : ""}`}
                placeholder="Restaurante"
                defaultValue={initialValues.restaurantName || ""}
                {...register("restaurantName", {
                    required: "Campo obrigatório",
                    minLength: {
                        value: 2,
                        message: "Campo obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("restaurantName");
                        }
                    }
                })}
            />
        </>
    );
};