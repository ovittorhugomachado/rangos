import { InputPaymentMethodProps } from "../../../types/account-input-types.d";

export const RadioOrderPaymentMethodInput = ({
    register,
    errors,
    clearErrors,
}: InputPaymentMethodProps) => (
    <div className="w-full flex items-start mx-auto gap-4 mt-2 translate-y-1.5">
        {errors.paymentMethod && (
            <span className="span-error absolute -translate-y-4.5">
                {errors.paymentMethod.message?.toString()}
            </span>
        )}
        <label className="font-bold">
            Pagamento:
        </label>
        <div className="flex flex-col gap-2 font-extralight">
            <div className="flex gap-1.5">
                <input
                    type="radio"
                    id="cartao"
                    value={"cartao"}
                    {...register("paymentMethod", {
                        required: "Obrigatório"
                    })}
                    onChange={() => {
                        clearErrors("paymentMethod");
                    }}
                />
                <label htmlFor="cartao">Cartão</label>
            </div>
            <div className="flex gap-1.5">
                <input
                    type="radio"
                    id="dinheiro"
                    value={"dinheiro"}
                    {...register("paymentMethod", {
                        required: "Obrigatório"
                    })}
                    onChange={() => {
                        clearErrors("paymentMethod");
                    }}
                />
                <label htmlFor="dinheiro">Dinheiro</label>
            </div>
            <div className="flex gap-1.5">
                <input
                    type="radio"
                    id="pix"
                    value={"pix"}
                    {...register("paymentMethod", {
                        required: "Obrigatório"
                    })}
                    onChange={() => {
                        clearErrors("paymentMethod");
                    }}
                />
                <label htmlFor="pix">Pix</label>
            </div>
        </div>
    </div>
);
