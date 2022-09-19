import { Routes, Route } from "react-router-dom";
// import { FeaturePage } from "./pages/FeaturePage";
import { FeaturePageTemp } from "./pages/FeaturePageTemp/FeaturePageTemp";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Provider } from "./context/CartContext";
import axios from "./axios";

import Cart from "./components/Cart/Cart.js";

import "./App.css";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { useEffect } from "react";

const App = () => {
    // running useEffect to 'fetch the items' from the server using Axios
    useEffect(() => {
        console.log("useEffect started");
        const fetch_squareItems = async () => {
            try {
                const res = await axios.get("/items");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetch_squareItems();
    }, []);

    return (
        <>
            <Provider>
                <NavBarNew />
                <Routes>
                    {/* <Route path="/" element={<FeaturePage />} /> */}
                    <Route path="/" element={<FeaturePageTemp />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="shop" element={<OnlineShop />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                </Routes>
                <Cart />
            </Provider>
        </>
    );
};

export default App;
