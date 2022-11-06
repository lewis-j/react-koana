// import MyPaymentForm from "../../components/MyPaymentForm/MyPaymentForm";
// import styles from "./CheckoutPage.module.scss";
import { useState } from "react";
import { ShippingForm } from "../../components/CheckoutForms/ShippingForm";
import { PaymentForm } from "../../components/CheckoutForms/PaymentForm.js";
import { OrderSummaryForm } from "../../components/CheckoutForms/OrderSummaryForm";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../../components/CheckoutForms/checkoutForms.css";

const CheckoutPage = () => {
    const { cartData, displayCart, checkSubTotal } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (displayCart) {
            if (cartData.length < 1 || checkSubTotal() === 0) {
                navigate("/shop");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartData, displayCart, checkSubTotal]);

    const [shippingFormData, setShippingFormData] = useState({
        firstName: "a",
        lastName: "a",
        addressLineOne: "a",
        addressLineTwo: "a",
        city: "a",
        region: "CA",
        zip: "11111",
        country: "U.S.",
        paymentSameAddressCheckbox: false,
    });

    const [paymentFormData, setPaymentFormData] = useState({
        lastName: "b",
        firstName: "b",
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        region: "",
        zip: "",
        country: "",
        email: "a@a.com",
        phone: "1111111111",
        cardNumber: "111111111111111",
        expiryDate: "11111111",
        cvv: "111",
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

    return (
        // <div className={styles.container}>
        //   <MyPaymentForm />
        // </div>
        <>  
            <div className="checkoutFormBackground">
                {cartData &&
                    formsCompleted.shippingForm &&
                    formsCompleted.paymentForm && (
                        <OrderSummaryForm
                            shippingFormData={shippingFormData}
                            paymentFormData={paymentFormData}
                            handleFormsCompleted={handleFormsCompleted}
                        />
                    )}
                {cartData && !formsCompleted.shippingForm && (
                    <ShippingForm
                        shippingFormData={shippingFormData}
                        setShippingFormData={setShippingFormData}
                        setPaymentFormData={setPaymentFormData}
                        handleFormsCompleted={handleFormsCompleted}
                    />
                )}
                {cartData &&
                    formsCompleted.shippingForm &&
                    !formsCompleted.paymentForm &&
                    !formsCompleted.orderSummaryForm && (
                        <PaymentForm
                            paymentFormData={paymentFormData}
                            setPaymentFormData={setPaymentFormData}
                            handleFormsCompleted={handleFormsCompleted}
                        />
                    )}
                {/* {!cartData && navigate("/shop")} */}
            </div>
        </>
    );
};
export default CheckoutPage;
