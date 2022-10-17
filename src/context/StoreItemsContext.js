import { createContext, useState } from "react";
import itemDefaultData from "../data/itemDefaults";

export const StoreItemContext = createContext();

export const StoreItemProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState([...itemDefaultData]);

  const setStoreItemsHandler = (apiData) => {
    if (apiData) setStoreItems(apiData);
    console.log("%cFetch successful!", "color:skyblue; font-size: 1.5rem");
  };

  const getStoreItemsHandler = () => {
    return storeItems;
  };

  const value = {
    setStoreItemsHandler,
    getStoreItemsHandler,
    storeItems,
  };

  return (
    <StoreItemContext.Provider value={value}>
      {children}
    </StoreItemContext.Provider>
  );
};

export default StoreItemProvider;
