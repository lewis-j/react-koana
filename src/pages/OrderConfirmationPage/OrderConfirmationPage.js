import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderConfirmationPageComponents from "./OrderConfirmationPageComponents";
import squareApi from "../../lib/squareApi";
import { StoreItemContext } from "../../context/ItemsContext/ItemsContext";
import { formatPrice } from "../../utils/priceFormat";

const OrderConfirmationPage = () => {
  const { storeItems } = useContext(StoreItemContext);
  const { search } = useLocation();
  const [orderData, setOrderData] = useState(null);

  const query = new URLSearchParams(search);
  const orderId = query.get("orderId");

  useEffect(() => {
    const fetch = async () => {
      const orderInfo = await squareApi.cart.confirmation(orderId);

      const lineItems = orderInfo.lineItems.map((orderitem) => {
        const itemImage = storeItems.find(
          (storeItem) => storeItem.id === orderitem.id
        );

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
    };
    if (orderId) {
      fetch();
    }
  }, [orderId, storeItems]);

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
