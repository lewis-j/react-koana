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

const CheckoutPage = () => {
  const { cart, displayCart, checkSubTotal } = useContext(CartContext);
  console.log("CardData", cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (displayCart) {
      if (cart.length < 1 || checkSubTotal() === 0) {
        navigate("/shop");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, displayCart, checkSubTotal]);

  const [shippingFormData, setShippingFormData] = useState({
    firstName: "",
    lastName: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    region: "",
    zip: "",
    country: "U.S.",
    paymentSameAddressCheckbox: false,
  });

  const [paymentFormData, setPaymentFormData] = useState({
    lastName: "",
    firstName: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    region: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [formsCompleted, setFormsCompleted] = useState({
    shippingForm: false,
    paymentForm: false,
    orderSummaryForm: false,
  });

  /*
    this function the name of the form and a boolean value
    completedStatus: true means the form will be hidden 
    and the next form will be revealed
    */

  const handleFormsCompleted = (form, completedStatus) => {
    switch (form) {
      case "shippingForm":
        setFormsCompleted((prev) => ({
          ...prev,
          shippingForm: completedStatus,
        }));
        break;
      case "paymentForm":
        setFormsCompleted((prev) => ({
          ...prev,
          paymentForm: completedStatus,
        }));
        break;
      case "orderSummaryForm":
        setFormsCompleted((prev) => ({
          ...prev,
          orderSummaryForm: completedStatus,
        }));
        break;
      default:
        console.log(`invalid form: ${[form, completedStatus]}`);
        break;
    }
  };
  if (!cart) return null;

  let modalInfo = {};
  if (!formsCompleted.shippingForm) {
    modalInfo = {
      title: "Shipping address",
      component: (
        <ShippingForm
          shippingFormData={shippingFormData}
          setShippingFormData={setShippingFormData}
          setPaymentFormData={setPaymentFormData}
          handleFormsCompleted={handleFormsCompleted}
        />
      ),
    };
  } else if (!formsCompleted.paymentForm) {
    modalInfo = {
      title: "Payment method",
      component: (
        <PaymentForm
          paymentFormData={paymentFormData}
          setPaymentFormData={setPaymentFormData}
          handleFormsCompleted={handleFormsCompleted}
        />
      ),
    };
  } else {
    modalInfo = {
      title: "Review Order",
      component: (
        <PaymentForm
          paymentFormData={paymentFormData}
          setPaymentFormData={setPaymentFormData}
          handleFormsCompleted={handleFormsCompleted}
        />
      ),
    };
  }

  return (
    // <div className={styles.container}>
    //   <MyPaymentForm />
    // </div>
    <>
      <div className="checkoutFormBackground">
        <div className="formContainer">
          <div className="formTheme">
            <h5>CHECKOUT</h5>
            <h3>{modalInfo.title}</h3>
          </div>
          {modalInfo.component}
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
