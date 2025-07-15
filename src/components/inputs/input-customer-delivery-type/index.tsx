import { UseFormRegister } from "react-hook-form";
import { OrderFormData } from "../../../types/orders-types.d";

interface UpdateDeliveryTypesInputProps {
    register: UseFormRegister<OrderFormData>;
}

export const CheckboxOrderDeliveryTypesInput = ({
    register,
}: UpdateDeliveryTypesInputProps) => (
    <div className="w-full flex items-start mx-auto gap-4 mt-2">
        <span className="font-bold">Tipo de entrega:</span>
        <div className="flex flex-col gap-2 font-extralight">
            <div className="flex gap-1.5">
                <input
                    type="radio"
                    id="delivery"
                    value={"delivery"}
                    {...register("deliveryType")}
                />
                <label htmlFor="delivery">Delivery</label>
            </div>
            <div className="flex gap-1.5">
                <input
                    type="radio"
                    id="pickup"
                    value={"pickup"}
                    {...register("deliveryType")}
                />
                <label htmlFor="pickup">Retirada</label>
            </div>
        </div>
    </div>
);
