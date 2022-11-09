import { Routes, Route } from "react-router-dom";
// import { FeaturePage } from "./pages/FeaturePage";
// import { FeaturePageTemp } from "./pages/FeaturePageTemp/FeaturePageTemp";
import { OnlineShop } from "./components/OnlineShop";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Provider } from "./context/CartContext";

import Cart from "./components/Cart/Cart.js";

import "./App.css";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { Footer } from "./layout/NavMenu/Footer";
import { useEffect, useContext } from "react";
import { StoreItemContext } from "./context/StoreItemsContext";
import FeaturePage from "./pages/FeaturePage/FeaturePage";
import squareApi from "./lib/squareApi";

const App = () => {
  const { fetchStoreItems } = useContext(StoreItemContext);
  // running useEffect to 'fetch the items' from the server using Axios
  useEffect(() => {
    fetchStoreItems();
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
