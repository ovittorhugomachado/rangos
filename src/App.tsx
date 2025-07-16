import { AppRoutes } from "./routes/routes";
import { CartProvider } from "./context/cart-context/cart-provider";

function App() {

  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;