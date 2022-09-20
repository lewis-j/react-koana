import { createContext, useState } from "react";
// import { imagesData } from "../data/imagesData";
// import axios from "axios";

export const StoreItemContext = createContext();
// let _storeItems = [...imagesData];

export const StoreItemProvider = ({ children }) => {
    const [storeItems, setStoreItems] = useState([]);

    const setStoreItemsHandler = (apiData) => {
        setStoreItems(apiData);
    };

    const getStoreItemsHandler = () => {
        return storeItems;
    };

    // const fetchStoreItems = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:3002/items");
    //         console.log("response from axios call", res.data);
    //         setStoreItems(res.data);
    //     } catch (error) {
    //         console.log("Error in response", { error: error.response });
    //     }
    // };

    const value = {
        setStoreItemsHandler,
        getStoreItemsHandler,
        storeItems,
    };

    // fetch_squareItems();
    return (
        <StoreItemContext.Provider value={value}>
            {children}
        </StoreItemContext.Provider>
    );
};

export default StoreItemProvider;
