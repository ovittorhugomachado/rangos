import { useForm } from "react-hook-form";
import { OrderFormData } from "../../../types/orders-types.d";
import { InputCustomerName } from "../../inputs/input-customer-name";
import { InputCustomerPhoneNumber } from "../../inputs/input-customer-phone";
import { InputCustomerAddress } from "../../inputs/input-customer-address";
import { RadioOrderDeliveryTypesInput } from "../../inputs/input-customer-delivery-type";
import { IoCloseOutline } from "react-icons/io5";
import { toMoney } from "../../../utils/transform-to-money";
import { useCart } from "../../../context/cart-context/hook";
import { createOrder } from "../../../services/order";
import { RadioOrderPaymentMethodInput } from "../../inputs/input-payment";

interface OrderDataFormProps {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    initialValues?: Partial<OrderFormData>;
    order?: OrderFormData;
    backgroundColor?: 'white' | 'black';
    message?: string;
}

export const OrderForm: React.FC<OrderDataFormProps> = ({
    backgroundColor,
    order,
    onClose,
    initialValues = {},
}) => {

    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        handleSubmit
    } = useForm<OrderFormData>({
        defaultValues: {
            customerName: "",
            customerAddress: "",
            customerPhone: "",
            paymentMethod: "",
            deliveryType: "delivery",
            ...order,
        },
    });

    const { cart, clearCart } = useCart();

    const onSubmit = async (data: OrderFormData) => {
        console.log(data)
        try {
            await createOrder({
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                typeOfDelivery: data.deliveryType,
                address: data.customerAddress,    
                paymentMethod: data.paymentMethod as "pix" | "cartao" | "dinheiro",
                items: cart.items.map(item => ({
                    menuItemId: item.id,
                    note: "",
                    optionIds: [],
                })),
            });

            clearCart();
            onClose();
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto max-h-screen`}>
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"></div>
            <form
                id="confirm-order-form"
                onSubmit={handleSubmit(onSubmit)}
                className={`${backgroundColor === 'white' ? 'bg-white' : 'bg-black'} relative z-50 flex flex-col items-center w-120 max-w-115 mx-3 mt-10 mb-10 px-5 py-8 border border-zinc-400 rounded-xl max-h-[75vh] translate-y-[-9vh] overflow-y-auto`}>
                <button
                    type="button"
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                    onClick={onClose}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
                <h3 className="text-lg md:text-2xl text-center mb-3">Confirmação do Pedido</h3>
                <div className="flex flex-col w-full max-w-105 mt-5 mb-5 gap-1">
                    <InputCustomerName
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <InputCustomerPhoneNumber
                        control={control}
                        initialValues={initialValues}
                    />
                    <InputCustomerAddress
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <RadioOrderPaymentMethodInput
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                    <RadioOrderDeliveryTypesInput
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                </div>
                <h1 className="text-base">Resumo do Pedido</h1>
                <ul className="w-full px-2.5 pt-2.5 border-t-2">
                    {cart.items.map((item, index) => (
                        <li key={index} className="w-full flex justify-between">
                            <span>{item.name}</span>
                            <span>{toMoney(Number(item.price))}</span>
                        </li>
                    ))}
                    <li className="w-full flex items-center justify-between font-extrabold">
                        <span>Total</span>
                        <div className={`${backgroundColor === 'white' ? 'bg-black' : 'bg-white'} flex-1 mx-2 h-px translate-y-1.5`} />
                        <span>{toMoney(cart.total)}</span>
                    </li>
                </ul>
            </form >
            <div className="max-w-76 absolute left-1/2 -translate-x-1/2 w-full flex flex-col justify-center gap-2 z-50 px-2" style={{ bottom: "4vh" }}>
                <button
                    type="submit"
                    form="confirm-order-form"
                    className="primary-button border-2 border-black"
                >
                    Confirmar pedido
                </button>
                <button
                    onClick={() => {
                        clearCart();
                        onClose();
                    }}
                    className="cancel-button"
                >
                    Limpar carrinho
                </button>
            </div>
        </div >
    );
}