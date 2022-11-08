// import MyPaymentForm from "../../components/MyPaymentForm/MyPaymentForm";
// import styles from "./CheckoutPage.module.scss";
import { useState } from "react";
import { ShippingForm } from "../../components/CheckoutForms/ShippingForm";
import { PaymentForm } from "../../components/CheckoutForms/PaymentForm.js";
import { OrderSummaryForm } from "../../components/CheckoutForms/OrderSummaryForm";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "../../components/CheckoutForms/checkoutForms.css";
import {
  tokenize,
  verifyBuyerToken,
} from "../../components/SquarePaymentForm/square";
import {
  regionNameToAbbreviation,
  countryNameToAbbreviation,
} from "../../utils/countryAndRegionAbbr";

const CheckoutPage = () => {
  const { cart, netAmounts, displayCart, actions, dispatch } =
    useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (displayCart) {
      if (cart.length < 1 || netAmounts.totalMoney === 0) {
        navigate("/shop");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, displayCart, netAmounts]);

  const [shippingFormData, setShippingFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "U.S.",
    paymentSameAddressCheckbox: false,
  });

  const [paymentFormData, setPaymentFormData] = useState({
    lastName: "",
    firstName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
    cardNumber: "",
    token: "",
  });

  const [formsCompleted, setFormsCompleted] = useState({
    shippingForm: false,
    paymentForm: false,
  });
  if (!cart) return null;

  /*
    this function the name of the form and a boolean value
    completedStatus: true means the form will be hidden 
    and the next form will be revealed
    */
  const withPrevious = (values) => (prev) => ({ ...prev, ...values });

  const mapToAbbreviations = (formValues) => {
    const { region, country } = formValues;
    return {
      ...formValues,
      region: regionNameToAbbreviation(region),
      country: countryNameToAbbreviation(country),
    };
  };

  const handleShippingSubmit = (formValues) => {
    const { paymentSameAddressCheckbox: isSame } = formValues;
    const _formValues = mapToAbbreviations(formValues);
    setShippingFormData(withPrevious(_formValues));

    if (isSame) setPaymentFormData(withPrevious(_formValues));
  };
  const handlePaymentSubmit = async (formValues, card) => {
    const tokenResult = await tokenize(card);
    const _formValues = mapToAbbreviations(formValues);

    setPaymentFormData(
      withPrevious({
        ..._formValues,
        cardNumber: tokenResult.details.card.last4,
        token: tokenResult.token,
        postalCode: tokenResult.details.billing.postalCode,
      })
    );

    // dispatch(
    //   actions.addShippingFulfillment({
    //     ..._formValues,
    //     ...shippingFormData,
    //   })
    // );
  };

  const handleSummarySubmit = async () => {
    const { token, ...billingContact } = paymentFormData;
    const verifiedtoken = await verifyBuyerToken(
      token,
      billingContact,
      netAmounts.totalMoney
    );

    dispatch(actions.emptyCart());
    // dispatch(
    //   actions.processCardOrder(verifiedtoken, {
    //     ...paymentFormData,
    //     ...shippingFormData,
    //   })
    // );
  };

  const handleFormsCompleted = (form, payload) => {
    switch (form) {
      case "shippingForm":
        setFormsCompleted((prev) => ({
          ...prev,
          shippingForm: payload.complete,
        }));
        if (payload?.formValues) {
          handleShippingSubmit(payload.formValues);
        }
        break;
      case "paymentForm":
        setFormsCompleted((prev) => ({
          ...prev,
          paymentForm: payload.complete,
        }));
        if (payload?.formValues) {
          const { formValues, card } = payload;
          handlePaymentSubmit(formValues, card);
        }
        break;
      case "orderSummaryForm":
        handleSummarySubmit();
        break;
      default:
        console.warn(`invalid form: ${[form, payload]}`);
        break;
    }
  };

  const getForm = (formsCompleted) => {
    const { shippingForm, paymentForm } = formsCompleted;
    if (!shippingForm)
      return {
        title: "Shipping address",
        component: (
          <ShippingForm
            shippingFormData={shippingFormData}
            handleFormsCompleted={handleFormsCompleted}
          />
        ),
      };
    if (!paymentForm)
      return {
        title: "Payment method",
        component: (
          <PaymentForm
            paymentFormData={paymentFormData}
            handleFormsCompleted={handleFormsCompleted}
          />
        ),
      };
    return {
      title: "Review Order",
      component: (
        <OrderSummaryForm
          shippingFormData={shippingFormData}
          paymentFormData={paymentFormData}
          handleFormsCompleted={handleFormsCompleted}
        />
      ),
    };
  };

  const { title, component } = getForm(formsCompleted);

  return (
    // <div className={styles.container}>
    //   <MyPaymentForm />
    // </div>
    <>
      <div className="checkoutFormBackground">
        <div className="formContainer">
          <div className="formTheme">
            <h5>CHECKOUT</h5>
            <h3>{title}</h3>
          </div>
          {component}
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
