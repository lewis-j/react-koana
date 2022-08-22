import { createContext, useState } from "react";
import { imagesData } from "../components/OnlineShop/images/imagesData";

export const CartContext = createContext();

const initialState = [];

export const Provider = ({ children }) => {
    const [cartData, setCartData] = useState(initialState);
    // state to toggle visibility of Cart
    const [displayCart, setDisplayCart] = useState(false);

    const getCartData = () => cartData;

    const cartHandleItemQuantityChange = (id, increment) => {
        console.log("cartHandleItemQuantityChange");
        const updatedObjects = getCartData().map((item) => {
            if (item.id === id) {
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
            return itemQuantity > 0
                ? [...otherItems, { id: id, quantity: itemQuantity }]
                : otherItems;
        });
    };

    // function to switch visibility of Cart component,
    // this is accessed on Cart close button, 
    // VerticalMenu and RegularNavbar (children of the navbar)
    const handleDisplayCart = () => {
        console.log("handleDisplayCart: ", displayCart);
        setDisplayCart(!displayCart);
    }

    const value = {
        cartHandleItemQuantityChange,
        handleRemoveItem,
        getCartData,
        cartData,
        updateCart,
        // 
        handleDisplayCart,
        displayCart
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
