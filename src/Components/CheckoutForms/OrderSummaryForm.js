import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { imagesData } from "../../data/imagesData";
import { useNavigate } from "react-router-dom";

export const OrderSummaryForm = (props) => {
    const { getCartData, cartData, displayCart, handleDisplayCart } =
        useContext(CartContext);
    const { shippingFormData, paymentFormData, handleFormsCompleted } = props;
    const navigate = useNavigate();

    const subTotal = () => {
        const total = cartData.reduce(
            (acc, cur) => imagesData[cur.id].price * cur.quantity + acc,
            0
        );

        if (!total) {
            displayCart && handleDisplayCart();
            navigate(`/shop`);
        } else {
            return total;
        }
    };

    const itemsInCart = () => {
        return getCartData()
            .filter((item) => item.quantity > 0)
            .map((item) => [imagesData[item.id].name, item.quantity]);
    };

    return (
        <>
            <div className="outerFormContainer">
                <div className="innerFormContainer">
                    <h1>CHECKOUT</h1>
                    <h3 className="formTheme">Payment method</h3>

                    <h3>shipping data</h3>
                    <ul>
                        {Object.entries(shippingFormData).map((item, i) => (
                            <li key={i}>{`${item[0]}, ${item[1]}`}</li>
                        ))}
                    </ul>

                    <h3>payment data</h3>
                    <ul>
                        {Object.entries(paymentFormData).map((item, i) => (
                            <li key={i}>{`${item[0]}, ${item[1]}`}</li>
                        ))}
                    </ul>

                    <h3>cart</h3>

                    <ul>
                        {itemsInCart().map((item, i) => (
                            <li key={i}>{`${item[0]} ${item[1]}`}</li>
                        ))}
                    </ul>
                    <h3>{`subtotal: $${subTotal()}`}</h3>
                    <button
                        type="button"
                        onClick={() =>
                            handleFormsCompleted("paymentForm", false)
                        }
                    >
                        Back - Payment Method
                    </button>
                </div>
            </div>
        </>
    );
};
