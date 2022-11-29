import { Routes, Route } from "react-router-dom";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { Provider } from "./context/CartContext/CartContext";
import axios from "./axios";

import Cart from "./components/Cart/Cart.js";
import "./App.css";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { Footer } from "./layout/NavMenu/Footer";
import { useEffect, useContext } from "react";
import { StoreItemContext } from "./context/ItemsContext/ItemsContext";
import FeaturePage from "./pages/FeaturePage/FeaturePage";

const App = () => {
  const { setStoreItemsHandler } = useContext(StoreItemContext);
  useEffect(() => {
    const fetch_squareItems = async () => {
      try {
        const res = await axios.get("/catalog");

        setStoreItemsHandler(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch_squareItems();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Provider>
        <NavBarNew />
        <Routes>
          <Route path="/" element={<FeaturePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="shop" element={<OnlineShop />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="confirmation" element={<OrderConfirmationPage />} />
        </Routes>
        <Footer />
        <Cart />
      </Provider>
    </>
  );
};

export default App;
