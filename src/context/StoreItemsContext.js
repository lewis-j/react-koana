import { createContext, useState } from "react";
import itemDefaultData from "../data/itemDefaults";
import squareApi from "../lib/squareApi";

export const StoreItemContext = createContext();

export const StoreItemProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState([...itemDefaultData]);

  const setStoreItemsHandler = (apiData) => {
    if (apiData) setStoreItems(apiData);
  };
  const fetchStoreItems = async () => {
    try {
      const result = await squareApi.items.fetchItems();
      setStoreItems(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    setStoreItemsHandler,
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
