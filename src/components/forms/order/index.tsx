import { useForm } from "react-hook-form";
import { OrderFormData } from "../../../types/orders-types.d";
import { InputCustomerName } from "../../inputs/input-customer-name";
import { InputCustomerPhoneNumber } from "../../inputs/input-customer-phone";
import { InputCustomerAddress } from "../../inputs/input-customer-address";
import { CheckboxOrderDeliveryTypesInput } from "../../inputs/input-customer-delivery-type";
import { IoCloseOutline } from "react-icons/io5";
import { toMoney } from "../../../utils/transform-to-money";

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
        // setError,
        formState: { errors },
        //handleSubmit
    } = useForm<OrderFormData>({
        defaultValues: {
            customerName: "",
            customerAddress: "",
            customerPhone: "",
            ...order,
        },
    });
    console.log(order)

    const total = order?.items
        ? order.items.reduce((acc, item) => acc + Number(item.price), 0)
        : 0;

    return (
        <div className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto max-h-screen`}>
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"></div>
            <form className={`${backgroundColor === 'white' ? 'bg-white' : 'bg-black'} relative z-50 flex flex-col items-center w-120 max-w-115 mx-3 mt-10 mb-10 px-5 py-8 border border-zinc-400 rounded-xl max-h-[80vh] translate-y-[-3vh] overflow-y-auto`}>
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
                    <CheckboxOrderDeliveryTypesInput
                        register={register}
                    />
                </div>
                <h1 className="text-base">Resumo do Pedido</h1>
                <ul className="w-full px-2.5 pt-2.5 border-t-2">
                    {order?.items.map((item, index) => (
                        <li key={index} className="w-full flex justify-between">
                            <span>{item.name}</span>
                            <span>{toMoney(Number(item.price))}</span>
                        </li>
                    ))}
                    <li className="w-full flex items-center justify-between font-extrabold">
                        <span>Total</span>
                        <div className={`${backgroundColor === 'white' ? 'bg-black' : 'bg-white'} flex-1 mx-2 h-px translate-y-1.5`} />
                        <span>{toMoney(total)}</span>
                    </li>
                </ul>
            </form >
            <div className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center z-50" style={{ bottom: "4vh" }}>
                <button type="submit" className="w-[320px] max-w-[90vw] primary-button">Confirmar pedido</button>
            </div>
        </div >
    );
}