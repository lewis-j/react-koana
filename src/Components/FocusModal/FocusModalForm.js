import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { imagesData } from "../OnlineShop/images/imagesData";
import "./focusModalForm.css";

const FocusModalForm = ({ id }) => {
    const value = useContext(CartContext);

    const [itemQuantity, setItemQuantity] = useState(
        value.getCartData().find((item) => item.id === id)?.quantity || 1
    );

    const handleQuantityChange = (increment) => {
        const available = imagesData.find((item) => item.id === id).inventory;
        increment
            ? setItemQuantity((prev) => {
                  return itemQuantity < available
                      ? itemQuantity + 1
                      : itemQuantity;
              })
            : setItemQuantity((prev) => {
                  return itemQuantity > 0 ? itemQuantity - 1 : itemQuantity;
              });
    };

    return (
        <>
            <div className="formContent">
                <div className="quantityLabel">QUANTITY</div>
                <div className="quantityContainer">
                    <div
                        className="increment"
                        onClick={() => handleQuantityChange(true)}
                    >
                        <div className="plusHorizontal"></div>
                        <div className="plusVertical"></div>
                    </div>
                    <div className="quantityWindow">{itemQuantity}</div>
                    <div
                        className="decrement"
                        onClick={() => handleQuantityChange(false)}
                    >
                        <div className="minus"></div>
                    </div>
                </div>
                <div
                    className="submitButton"
                    onClick={() => value.updateCart(id, itemQuantity)}
                >
                    ADD TO CART
                </div>
            </div>
        </>
    );
};

export default FocusModalForm;
