import { useEffect, useState } from "react";

const PaymentForm = ({ cardStyle, handleCard }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const cardContainer = "card-container";

  useEffect(() => {
    const scriptList = document.querySelectorAll(
      "script[type='text/javascript']"
    );

    const squareInitialized = Array.from(scriptList).some(
      (script) => script.id === "square"
    );

    if (squareInitialized) {
      setIsLoaded(true);
      return;
    }

    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.id = "square";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setIsLoaded(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    // Step 5.2: create card payment
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const initializeCard = async (payments, container, style = {}) => {
      const card = await payments.card({ style });
      // await card.attach("#card-container");
      await card.attach(`#${container}`);

      return card;
    };
    let _card;
    const fetch = async () => {
      if (!window.Square) {
        throw new Error("Square.js failed to load properly");
      }
      try {
        const payments = window.Square.payments(
          process.env.REACT_APP_APPLICATION_ID,
          process.env.REACT_APP_LOCATION_ID
        );
        _card = await initializeCard(payments, cardContainer, cardStyle);
        handleCard(_card);
      } catch (e) {
        console.error("Initializing Card failed", e);
      }
    };
    fetch();
    return () => {
      _card.destroy();
    };
  }, [isLoaded]);

  const render = () => {
    if (!isLoaded) return null;
    return (
      <div>
        <div id={cardContainer}></div>
        <div id="payment-status-container"></div>
      </div>
    );
  };

  return <>{render()}</>;
};

export default PaymentForm;
