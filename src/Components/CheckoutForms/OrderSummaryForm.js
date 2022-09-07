import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { imagesData } from "../../data/imagesData";
import { NavBarNew } from "../../layout/NavMenu/NavMenuNew";

export const OrderSummaryForm = (props) => {
    const { getCartData, cartData } = useContext(CartContext);
    const { shippingFormData, paymentFormData } = props;

    const subTotal = () => {
        return cartData.reduce(
            (acc, cur) => imagesData[cur.id].price * cur.quantity + acc,
            0
        );
    };

    const itemsInCart = () => {
        return getCartData().map((item) => [
            imagesData[item.id].name,
            item.quantity,
        ]);
    };

    return (
        <>
            <NavBarNew modalFocus={false} />
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
                </div>
            </div>
        </>
    );
};
