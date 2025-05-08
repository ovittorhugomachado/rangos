import { inputNameProps } from "../../../../types/inputs.d";

const InputRestaurantName = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: inputNameProps) => {

    return (
        <>
            <label htmlFor="restaurantName" className="label">
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
                className={`input mb-2 ${errors.restaurantName ? "input-error" : ""}`}
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
    )
}

export { InputRestaurantName }