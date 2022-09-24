import { createContext, useState } from "react";

export const StoreItemContext = createContext();

export const StoreItemProvider = ({ children }) => {
    const [storeItems, setStoreItems] = useState([]);

    const setStoreItemsHandler = (apiData) => {
        setStoreItems(apiData);
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
