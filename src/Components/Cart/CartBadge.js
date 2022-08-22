import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./cartBadge.css";

const CartBadge = () => {
    const { getCartData, handleDisplayCart } = useContext(CartContext);
    const cartItemQuantity = getCartData().reduce((acc, cur) => {
        return cur.quantity + acc;
    }, 0);

    return (
        cartItemQuantity > 0 && (
            <div
                className="cartBadgeContainer"
                onClick={() => handleDisplayCart()}
            >
                {cartItemQuantity}
            </div>
        )
    );
};

export default CartBadge;
