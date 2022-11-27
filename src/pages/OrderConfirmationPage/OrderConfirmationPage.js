import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "./axios";
import "./orderConfirmationPage.css";
import { tempOrderData } from "./tempAssets/tempOrderData";
import { nanoid } from 'nanoid';
import koanaIcon from "./tempAssets/koana_icon_new_bright.png";

const OrderConfirmationPage = () => {
    // some kind of axios call here to fetch data from orderId
    // the response is simulated with tempOrderData
    // ******
    //
    // let { orderId } = useParams();
    //
    // useEffect(() => {
    //
    //     const fetch_squareOrder = async () => {
    //         try {
    //             const res = await axios.get("/order/orderId");
    //             const tempOrderData = res.data;
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetch_squareOrder();
    // }, []);
    //
    // ******

    let {
        lineItems,
        fulfillments,
        netAmounts,
        totalMoney,
        totalDiscountMoney,
        totalServiceChargeMoney,
        netAmountDueMoney,
    } = tempOrderData;

    const confirmationMessage = (
        <div className="orderConfirmationMessageContainer">
            <div className="orderKoanaIconStamp">
                <img src={koanaIcon} alt="logo" />
            </div>
            <div className="orderConfirmationMessageBanner">
                Your order has been confirmed
            </div>
            <div className="orderConfirmationMessageThankyou">
                Thank you. Your order has been confirmed and will be shipping soon.
            </div>
        </div>
    )

    const orderUserData = () => {
        const address = fulfillments[0].shipmentDetails.address;
        const orderID = nanoid(); // LOL :)
        const currentDate = String(new Date()).split(" ").slice(0,4).join(" "); // LOLLERZ!! XD

        return (
            <div className="orderUserDataContainer">
                <div className="orderUserDataCol">
                    <div className="orderUserDataCategory">
                        Order Date
                    </div>
                    <div className="orderUserDataCategoryValue">
                        {currentDate}
                    </div>
                </div>
                <div className="orderUserDataCol">
                    <div className="orderUserDataCategory">
                        Order ID
                    </div>
                    <div className="orderUserDataCategoryValue">
                        {orderID}
                    </div>
                </div>
                <div className="orderUserDataCol">
                    <div className="orderUserDataCategory">
                        Address
                    </div>
                    <div className="orderUserDataCategoryValue">
                        {address}
                    </div>
                </div>
            </div>
        )
    }

    const orderItems = lineItems.map((item, idx) => {
        return (
            <div key={idx} className="orderItemContainer">
                <img
                    className="orderItemImage"
                    src={item.image}
                    alt="item"
                />

                <div className="orderItemDetails">
                    <div className="orderItemImageNameSet">
                        <img
                            className="orderItemImageSmall"
                            src={item.image}
                            alt="image"
                        />
                        <div className="orderItemName">{item.name}</div>
                    </div>
                    <div className="orderItemMath">
                        <div className="orderItemQty">
                            {"Qty: ".concat(item.quantity)}
                        </div>
                        <div className="orderItemPrice">
                            {"$".concat(item.basePriceMoney.price)}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const accessAmounts = () => {
        const priceBreakdownData = {
            subtotal: netAmounts.totalMoney.amount,
            shipping: totalServiceChargeMoney.amount,
            tax: netAmounts.taxMoney.amount,
            discount: totalDiscountMoney.amount,
        };
        return priceBreakdownData;
    };

    const priceBreakdown = () => {
        const { subtotal, shipping, tax, discount } = accessAmounts();

        return (
            <>
                <div className="orderPriceBreakdownContainer">
                    <div className="orderPriceBreakdownRow">
                        <div className="orderPriceBreakdownCategory">
                            Subtotal
                        </div>
                        <div className="orderPriceBreakdownCategoryValue">
                            {"$".concat(subtotal.toFixed(2))}
                        </div>
                    </div>
                    <div className="orderPriceBreakdownRow">
                        <div className="orderPriceBreakdownCategory">
                            Shipping
                        </div>
                        <div className="orderPriceBreakdownCategoryValue">
                            {"$".concat(shipping.toFixed(2))}
                        </div>
                    </div>
                    <div className="orderPriceBreakdownRow">
                        <div className="orderPriceBreakdownCategory">Taxes</div>
                        <div className="orderPriceBreakdownCategoryValue">
                            {"$".concat(tax.toFixed(2))}
                        </div>
                    </div>
                    {discount > 0 ? (
                        <div className="orderPriceBreakdownRow">
                            <div className="orderPriceBreakdownCategory">
                                Discount
                            </div>
                            <div
                                className="orderPriceBreakdownCategoryValue"
                                style={{ color: "#51cf85" }}
                            >
                                {"$".concat(discount.toFixed(2))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </>
        );
    };

    const total = () => {
        const { subtotal, shipping, tax, discount } = accessAmounts();
        const grandTotal = subtotal + shipping + tax - discount;

        return (
            <div className="orderTotalContainer">
                <div className="orderTotalRow">
                    <div className="orderTotalCategory">Total</div>
                    <div className="orderTotalCategoryValue">
                        {"$".concat(grandTotal.toFixed(2))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="orderOuterContainer">
            <div className="orderInnerContainer">
                {confirmationMessage}
                {orderUserData()}
                {orderItems}
                {priceBreakdown()}
                {total()}
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
