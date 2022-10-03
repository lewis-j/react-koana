import { createContext, useContext, useReducer, useState } from "react";
// import { imagesData } from "../data/imagesData";
import { StoreItemContext } from "./StoreItemsContext";

export const CartContext = createContext();

const initialState = [];

export const Provider = ({ children }) => {
  const { storeItems } = useContext(StoreItemContext);
  const [cartData, setCartData] = useState(initialState);
  // state to toggle visibility of Cart
  const [displayCart, setDisplayCart] = useState(false);

  const getCartData = () => cartData;

  const cartHandleItemQuantityChange = (id, increment) => {
    // console.log("cartHandleItemQuantityChange");
    //If cart item doesnt exist create new order by calling express "orders/create" endpoint'
    //if item exist update the order items inventory using by calling the express "orders/inventory"
    const updatedObjects = getCartData().map((item) => {
      if (item.id === id) {
        if (
          increment &&
          item.quantity <
            storeItems.find((shopItem) => shopItem.id === item.id).inventory
        ) {
          return { id: item.id, quantity: item.quantity + 1 };
        } else if (!increment && item.quantity > 0) {
          return { id: item.id, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    console.log("updated objects: ", updatedObjects);
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
    // console.log("handleDisplayCart: ", displayCart);
    setDisplayCart(!displayCart);
  };

  const value = {
    cartHandleItemQuantityChange,
    handleRemoveItem,
    getCartData,
    cartData,
    updateCart,
    //
    handleDisplayCart,
    displayCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
