import { createContext, useContext, useReducer, useState } from "react";
import { imagesData } from "../components/OnlineShop/images/imagesData"

export const CartContext = createContext();

const initialState = [];

export const Provider = ({ children }) => {
    const [cartData, setCartData] = useState(initialState);

    const getCartData = () => cartData;
    console.log("cartData:", cartData);

    const cartHandleItemQuantityChange = (id, increment) => {
        const updatedObjects = getCartData().map((item) => {
            if (item.id === id) {
                console.log(
                    item.quantity,
                    imagesData.find((shopItem) => shopItem.id === id)
                );
                if (
                    increment &&
                    item.quantity <
                        imagesData.find((shopItem) => shopItem.id === item.id)
                            .inventory
                ) {
                    return { id: item.id, quantity: item.quantity + 1 };
                } else if (!increment && item.quantity > 0) {
                    return { id: item.id, quantity: item.quantity - 1 };
                }
            }
            return item;
        });
        setCartData(updatedObjects);
    };

    const handleRemoveItem = (id) => {
        const remainingCart = cartData.filter((item) => item.id !== id);
        setCartData(remainingCart);
    };

    const updateCart = (id, itemQuantity) => {
        setCartData((prev) => {
            const otherItems = prev.filter((item) => item.id !== id);
            return [...otherItems, { id: id, quantity: itemQuantity }];
        });
    };

    const value = {
        cartHandleItemQuantityChange,
        handleRemoveItem,
        getCartData,
        cartData,
        updateCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
