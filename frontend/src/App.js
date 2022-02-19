import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { HomeScreen, ProductScreen, CartScreen } from "./screen";
import { LoginScreen, ProfileScreen, RegisterScreen } from "./screen";
import { ShippingScreen, PaymentScreen, OrderScreen } from "./screen";

export default function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[auto,1fr,auto] h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<OrderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />}>
              <Route path=":id" element={<CartScreen />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
