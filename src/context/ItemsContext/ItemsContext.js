import { createContext, useState } from "react";

export const StoreItemContext = createContext();

export const StoreItemProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState([]);

  const setStoreItemsHandler = (apiData) => {
    if (apiData) setStoreItems(apiData);
  };

  const value = {
    setStoreItemsHandler,
    storeItems,
  };

  return (
    <StoreItemContext.Provider value={value}>
      {children}
    </StoreItemContext.Provider>
  );
};

export default StoreItemProvider;
