import { useState } from "react";
import { imagesData } from "../OnlineShop/images/imagesData";
import "./focusModalForm.css";

const FocusModalForm = ({ id }) => {
    const [addToCart, setAddToCart] = useState({});

    const [currentItem, setCurrentItem] = useState({
        id: id,
        quantity: 1,
    });

    const updateCart = () => {
        setAddToCart(currentItem);
        console.log("item(s) were added to cart:");
        console.log(
            `added to cart: ${
                imagesData.find((item) => item.id === id).name
            } quantity: ${currentItem.quantity}`
        );
    };

    const handleQuantityChange = (increment) => {
        const available = imagesData.find((item) => item.id === id).inventory;
        increment
            ? setCurrentItem((prev) => ({
                  ...prev,
                  quantity:
                      currentItem.quantity < available
                          ? currentItem.quantity + 1
                          : currentItem.quantity,
              }))
            : setCurrentItem((prev) => ({
                  ...prev,
                  quantity:
                      currentItem.quantity > 0
                          ? currentItem.quantity - 1
                          : currentItem.quantity,
              }));
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
                    <div className="quantityWindow">{currentItem.quantity}</div>
                    <div
                        className="decrement"
                        onClick={() => handleQuantityChange(false)}
                    >
                        <div className="minus"></div>
                    </div>
                </div>
                <div className="submitButton" onClick={() => updateCart()}>
                    ADD TO CART
                </div>
            </div>
        </>
    );
};

export default FocusModalForm;
