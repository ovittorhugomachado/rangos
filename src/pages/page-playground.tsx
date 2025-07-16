import { OrderForm } from "../components/customer-side/forms/form-order";

export const PlaygroundPage = () => {

    return (
        <>
            <OrderForm
                backgroundColor="white"
                order={{
                    customerName: "joão",
                    customerPhone: "123456789",
                    deliveryType: "delivery",
                    customerAddress: "Rua das Flores, 123",
                    paymentMethod: "pix",
                    items: [
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                        { id: 1, name: "Produto 1", price: 100},
                    ],
                    message: "",
                    error: "",
                }}
                onClose={() => console.log("Form closed")}
            />
        </>
    );
};
