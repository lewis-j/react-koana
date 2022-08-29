import { useEffect, useState } from "react";
import CreditCard from "./CreditCard";
import styles from "./PaymentForm.module.scss";

const PaymentForm = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      console.log("loaded", window.Square);
      setIsLoaded(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    console.log("loaded script");
    // Step 5.2: create card payment
  }, []);

  const render = () => {
    console.log("window", window.Square);
    if (!isLoaded) return null;
    return <CreditCard square={window.Square} />;
  };

  return <>{render()}</>;
};

export default PaymentForm;
