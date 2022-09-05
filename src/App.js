import { Routes, Route } from "react-router-dom";
import { FeaturePage } from "./pages/FeaturePage";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Provider } from "./context/CartContext";
import { SignupForm } from "./components/CheckoutForms/CheckoutFormOne";

import Cart from "./components/Cart/Cart.js";

import "./App.css";

const App = () => {
    return (
        <>
            <Provider>
                {/* <NavBarNew /> */}
                <Routes>
                    <Route path="/" element={<FeaturePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="shop" element={<OnlineShop />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="CheckoutFormOne" element={<SignupForm />} />
                </Routes>
                <Cart />
            </Provider>
        </>
    );
};

export default App;
