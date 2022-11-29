import { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import axios from "./axios";
import { tempOrderData } from "./tempAssets/tempOrderData";
import OrderConfirmationPageComponents from "./OrderConfirmationPageComponents";
import squareApi from "../../lib/squareApi";
import { StoreItemContext } from "../../context/ItemsContext/ItemsContext";
import { formatPrice } from "../../utils/priceFormat";

const OrderConfirmationPage = () => {
  const { storeItems } = useContext(StoreItemContext);
  const { search } = useLocation();
  const [orderData, setOrderData] = useState(null);

  const query = new URLSearchParams(search);

  console.log("query", query.get("transactionId"));

  // some kind of axios call here to fetch data from orderId
  const orderId = query.get("orderId");
  console.log("orderId", orderId);

  useEffect(() => {
    const fetch = async () => {
      console.log("orderId in fetch useeffect", orderId);
      const orderInfo = await squareApi.cart.confirmation(orderId);
      console.log("orderinfo", orderInfo);

      const lineItems = orderInfo.lineItems.map((orderitem) => {
        const itemImage = storeItems.find(
          (storeItem) => storeItem.id === orderitem.id
        );

        console.log("storeItem found", itemImage, storeItems);

        return {
          ...orderitem,
          image: itemImage?.image,
          basePriceMoney: formatPrice(orderitem.amountTotal.amount),
        };
      });
      const { address, emailAddress, phoneNumber } =
        orderInfo.shipping.recipient;
      const {
        addressLine1,
        administrativeDistrictLevel1,
        country,
        locality,
        postalCode,
        firstName,
        lastName,
      } = address;

      const _address = `${addressLine1}, ${administrativeDistrictLevel1}, ${country}, ${locality} ${postalCode}`;

      const _orderData = {
        orderId: orderId,
        lineItems,
        shipmentDetails: {
          address: _address,
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
        },
        createdAt: new Date(orderInfo.createdAt),
        netAmounts: orderInfo.netAmounts,
      };

      setOrderData(_orderData);
      //   export const tempOrderData = {
      //     fulfillments: [
      //       {
      //         shipmentDetails: {address: '1234 Main St. MiddleOfNowhere CA, 98765'}
      //       }
      //     ],
      //     netAmounts: {
      //         totalMoney: { amount: 56.00, currency: 'USD' },
      //         taxMoney: { amount: 0, currency: 'USD' },
      //     },
      //     totalMoney: { amount: 56.00, currency: 'USD' }, //(sub total)
      //     totalDiscountMoney: { amount: 5, currency: 'USD' },
      //     totalServiceChargeMoney: { amount: 12.50, currency: 'USD' }, //(shipping fee)
      //     netAmountDueMoney: { amount: 56.00, currency: 'USD' } // (grand total)
      // }
    };
    if (orderId) {
      fetch();
    }
  }, [orderId, storeItems]);

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

  if (!orderData) return null;

  return (
    <div className="orderOuterContainer">
      <div className="orderInnerContainer">
        <OrderConfirmationPageComponents orderData={orderData} />
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
