import { AppRoutes } from "./routes/routes";
import { CartProvider } from "./context/cart-context/provider";

function App() {

  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;