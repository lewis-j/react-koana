import { createContext, useState } from "react";
import { imagesData } from "../data/imagesData";
import axios from "axios";

export const StoreItemContext = createContext();
let _storeItems = [...imagesData];
const StoreItemProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState(_storeItems);
  const fetchStoreItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/catalog");
      console.log("response from axios call", res.data);
      setStoreItems(res.data);
    } catch (error) {
      console.log("Error in response", { error: error.response });
    }
  };

  const value = {
    fetchStoreItems,
    storeItems,
  };

  return (
    <StoreItemContext.Provider value={value}>
      {children}
    </StoreItemContext.Provider>
  );
};

export default StoreItemProvider;
