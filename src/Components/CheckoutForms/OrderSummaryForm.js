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

    let checkoutItemState = "checkoutItem";
    if (displayCart) {
        checkoutItemState = "checkoutItemStatic";
    }

    const checkoutItems = getCartData().filter((item) => item.quantity > 0);

    const ItemsInCart = () => {
        return checkoutItems.map((checkoutItem, idx) => {
            return (
                <div key={idx} className={checkoutItemState}>
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

                    <div className="subTotalShippingOrderTotal  categoryStyling">
                        <div className="subTotalShippingOrderTotalRow">
                            <div className="subTotalShippingOrderTotalCol">{`subtotal: `}</div>
                            <div>{`$${subTotal()}.00`}</div>
                        </div>
                        <div className="subTotalShippingOrderTotalRow">
                            <div className="subTotalShippingOrderTotalCol">
                                {"taxes: "}
                            </div>
                            <div>{"$0.00"}</div>
                        </div>
                        <div className="subTotalShippingOrderTotalRow">
                            <div className="subTotalShippingOrderTotalCol">{`Fedex 2 Day USA: `}</div>
                            <div>{`$12.50`}</div>
                        </div>
                        <br></br>
                        <div className="subTotalShippingOrderTotalRow">
                            <div className="subTotalShippingOrderTotalTallyCol">{`order total: `}</div>
                            <div className="subTotalShippingOrderTotalTallyVal">{`$${(
                                (subTotal() + 12.5) /
                                1
                            ).toFixed(2)}`}</div>
                        </div>
                    </div>
                    <div className="formBottomContent">
                        <div
                            className="formButton"
                            type="button"
                            onClick={() => {
                                handleFormsCompleted("paymentForm", false);
                            }}
                        >
                            Back - Payment Method
                        </div>
                        <div
                            className="formButtonPurchase"
                            onClick={() => console.log(checkoutItems)}
                        >
                            <div className="place">place</div>
                            <div className="order">order</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
