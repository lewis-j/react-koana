import { Routes, Route } from "react-router-dom";
// import { FeaturePage } from "./pages/FeaturePage";
// import { FeaturePageTemp } from "./pages/FeaturePageTemp/FeaturePageTemp";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Provider } from "./context/CartContext";
import axios from "./axios";

import Cart from "./components/Cart/Cart.js";

import "./App.css";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { Footer } from "./layout/NavMenu/Footer";
import { useEffect, useContext } from "react";
import { StoreItemContext } from "./context/StoreItemsContext";
import FeaturePage from "./pages/FeaturePage/FeaturePage";

const App = () => {
  const { setStoreItemsHandler } = useContext(StoreItemContext);
  // running useEffect to 'fetch the items' from the server using Axios
  useEffect(() => {
    console.log("useEffect started");
    const fetch_squareItems = async () => {
      try {
        const res = await axios.get("/catalog");

        setStoreItemsHandler(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetch_order = async () => {
      try {
        const res = await axios.put("/order");

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch_squareItems();
    fetch_order();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Provider>
        <NavBarNew />
        <Routes>
          <Route path="/" element={<FeaturePage />} />
          {/* <Route path="/" element={<FeaturePageTemp />} /> */}
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