import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { imagesData } from "../../data/imagesData";
import { useNavigate } from "react-router-dom";
import { ShippingInfoSummary } from "./ShippingInfoSummary";
import { PaymentInfoSummary } from "./PaymentInfoSummary";

export const OrderSummaryForm = (props) => {
    const { getCartData, cartData, displayCart, handleDisplayCart } =
        useContext(CartContext);
    const { shippingFormData, paymentFormData, handleFormsCompleted } = props;
    const navigate = useNavigate();

    const subTotal = () => {
        return cartData.reduce(
            (acc, cur) => imagesData[cur.id].price * cur.quantity + acc,
            0
        );
    };

    useEffect(() => {
        if (!subTotal()) {
            displayCart && handleDisplayCart();
            navigate(`/shop`);
        }
    });

    const ItemsInCart = () => {
        const checkoutItems = getCartData()
            .filter((item) => item.quantity > 0)
            .map((checkoutItem, idx) => {
                return (
                    <div key={idx} className="checkoutItem">
                        <div className="checkoutItemImage">
                            <img
                                src={imagesData[checkoutItem.id].image}
                                alt={imagesData[checkoutItem.id].name}
                            />
                        </div>
                        <div className="checkoutItemDesc">
                            {imagesData[checkoutItem.id].name}
                        </div>

                        <div className="quantityEdit">
                            <div className="checkoutItemQuantity">
                                {checkoutItem.quantity}
                            </div>
                            <div
                                className="checkoutItemEdit"
                                onClick={() => handleDisplayCart()}
                            >
                                edit
                            </div>
                        </div>
                        <div className="checkoutitemPrice">
                            ${imagesData[checkoutItem.id].price}
                        </div>
                    </div>
                );
            });

        return <div>{checkoutItems}</div>;
    };

    return (
        <>
            <div className="formContainer">
                <div className="formTheme">
                    <h5>CHECKOUT</h5>
                    <h3>Review Order</h3>
                </div>
                <div className="formCategories">
                    <div className="shippingAndBilling">
                        <ShippingInfoSummary
                            shippingFormData={shippingFormData}
                            paymentFormData={paymentFormData}
                        />
                        <PaymentInfoSummary
                            shippingFormData={shippingFormData}
                            paymentFormData={paymentFormData}
                        />
                        <ItemsInCart />
                    </div>

                    <div className="subTotalShippingOrderTotal">
                        <div>{`subtotal: $${subTotal()}.00`}</div>
                        <div>{"taxes: $0.00"}</div>
                        <div>{`Fedex 2 Day USA: $12.50`}</div>
                        <div>{`order total: $${subTotal() + 12.5}`}</div>
                    </div>
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
