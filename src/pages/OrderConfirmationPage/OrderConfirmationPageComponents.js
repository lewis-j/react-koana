// import { tempOrderData } from "./tempAssets/tempOrderData";
import { nanoid } from "nanoid";
import koanaIcon from "./tempAssets/koana_icon_new_bright.png";
import "./orderConfirmationPage.css";
import { formatPrice } from "../../utils/priceFormat";

// const {
//     lineItems,
//     fulfillments,
//     netAmounts,
//     totalMoney,
//     totalDiscountMoney,
//     totalServiceChargeMoney,
//     netAmountDueMoney,
// } = tempOrderData;

const OrderConfirmationPageComponents = ({ orderData }) => {
  console.log("order", orderData);
  const { orderId, lineItems, shipmentDetails, netAmounts, createdAt } =
    orderData;

  const accessUserData = (data) => {
    const userData = {
      address: shipmentDetails.address,
      orderID: orderId,
      currentDate: String(createdAt).split(" ").slice(0, 4).join(" "),
    };
    return userData[data];
  };

  const subtotal = lineItems.reduce((subtotal, { basePriceMoney }) => {
    return subtotal + +basePriceMoney;
  }, 0);

  const accessAmounts = (data) => {
    const priceBreakdownData = {
      subtotal: subtotal.toFixed(2),
      shipping: formatPrice(netAmounts.serviceChargeMoney.amount),
      tax: formatPrice(netAmounts.taxMoney.amount),
      discount: formatPrice(netAmounts.discountMoney.amount),
      grandTotal: formatPrice(netAmounts.totalMoney.amount),
    };
    return priceBreakdownData[data];
  };

  const orderConfirmationPageSections = {
    confirmationMessage: (
      <div className="orderConfirmationMessageContainer">
        <div className="orderKoanaIconStamp">
          <img src={koanaIcon} alt="logo" />
        </div>
        <div className="orderConfirmationMessageBanner">
          Order confirmation ✓
        </div>
        <div className="orderConfirmationMessageThankyou">
          Your order has been confirmed and will be shipping soon.
        </div>
      </div>
    ),
    orderUserData: (
      <div className="orderUserDataContainer">
        <div className="orderUserDataCol">
          <div className="orderUserDataCategory">Order Date</div>
          <div className="orderUserDataCategoryValue">
            {accessUserData("currentDate")}
          </div>
        </div>
        <div className="orderUserDataCol">
          <div className="orderUserDataCategory">Order ID</div>
          <div className="orderUserDataCategoryValue">
            {accessUserData("orderID")}
          </div>
        </div>
        <div className="orderUserDataCol">
          <div className="orderUserDataCategory">Address</div>
          <div className="orderUserDataCategoryValue">
            {accessUserData("address")}
          </div>
        </div>
      </div>
    ),
    orderItems: lineItems.map((item, idx) => {
      return (
        <div key={idx} className="orderItemContainer">
          <img className="orderItemImage" src={item.image} alt="item" />

          <div className="orderItemDetails">
            <div className="orderItemImageNameSet">
              <img
                className="orderItemImageSmall"
                src={item.image}
                alt={item.name}
              />
              <div className="orderItemName">{item.name}</div>
            </div>
            <div className="orderItemMath">
              <div className="orderItemQty">
                {"Qty: ".concat(item.quantity)}
              </div>
              <div className="orderItemPrice">
                {"$".concat(item.basePriceMoney)}
              </div>
            </div>
          </div>
        </div>
      );
    }),
    priceBreakdown: (
      <div className="orderPriceBreakdownContainer">
        <div className="orderPriceBreakdownRow">
          <div className="orderPriceBreakdownCategory">Subtotal</div>
          <div className="orderPriceBreakdownCategoryValue">
            {"$".concat(accessAmounts("subtotal"))}
          </div>
        </div>
        <div className="orderPriceBreakdownRow">
          <div className="orderPriceBreakdownCategory">Shipping</div>
          <div className="orderPriceBreakdownCategoryValue">
            {"$".concat(accessAmounts("shipping"))}
          </div>
        </div>
        <div className="orderPriceBreakdownRow">
          <div className="orderPriceBreakdownCategory">Taxes</div>
          <div className="orderPriceBreakdownCategoryValue">
            {"$".concat(accessAmounts("tax"))}
          </div>
        </div>
        {accessAmounts("discount") > 0 ? (
          <div className="orderPriceBreakdownRow">
            <div className="orderPriceBreakdownCategory">Discount</div>
            <div
              className="orderPriceBreakdownCategoryValue"
              style={{ color: "#51cf85" }}
            >
              {"$".concat(accessAmounts("discount"))}
            </div>
          </div>
        ) : null}
      </div>
    ),
    total: (
      <div className="orderTotalContainer">
        <div className="orderTotalRow">
          <div className="orderTotalCategory">Total</div>
          <div className="orderTotalCategoryValue">
            {"$".concat(accessAmounts("grandTotal"))}
          </div>
        </div>
      </div>
    ),
    contact: (
      <>
        <div className="orderContactContainer">
          <div className="orderContactRow">
            Please check your email for confirmation. We hope you enjoy your
            high-quality purchase. Thank you.
          </div>
          <div className="orderContactRow">
            Aloha,
            <div className="orderContactKoana">Koana</div>
          </div>
        </div>
        <div className="orderContactPhone">telephone: 808-209-4432</div>
      </>
    ),
  };

  return (
    <>
      {orderConfirmationPageSections.confirmationMessage}
      {orderConfirmationPageSections.orderUserData}
      {orderConfirmationPageSections.orderItems}
      {orderConfirmationPageSections.priceBreakdown}
      {orderConfirmationPageSections.total}
      {orderConfirmationPageSections.contact}
    </>
  );
};

export default OrderConfirmationPageComponents;
