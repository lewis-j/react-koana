import { Routes, Route } from "react-router-dom";
import { FeaturePage } from "./pages/FeaturePage";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Provider } from "./context/CartContext";
import axios from "./axios";

import Cart from "./components/Cart/Cart.js";

import "./App.css";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { Footer } from "./layout/NavMenu/Footer";
import { useContext, useEffect } from "react";
import { StoreItemContext } from "./context/StoreItemsContext";

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

  const storeItemContext = useContext(StoreItemContext);
  useEffect(() => {
    storeItemContext.fetchStoreItems();
  }, []);
  console.log("storeItemContext.storeItems::", storeItemContext.storeItems);
  return (
    <>
      <Provider>
        <NavBarNew />
        <Routes>
          <Route path="/" element={<FeaturePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="shop" element={<OnlineShop />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
        <Cart />
      </Provider>
    </>
  );
};

export default App;
