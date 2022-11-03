import { useEffect, useState } from "react";
import styles from "./CreditCard.module.scss";

const darkModeCardStyle = {
  ".input-container": {
    borderColor: "#2D2D2D",
    borderRadius: "6px",
  },
  ".input-container.is-focus": {
    borderColor: "#006AFF",
  },
  ".input-container.is-error": {
    borderColor: "#d0cf6a",
  },
  ".message-text": {
    color: "#999999",
  },
  ".message-icon": {
    color: "#999999",
  },
  ".message-text.is-error": {
    color: "#ff1600",
  },
  ".message-icon.is-error": {
    color: "#ff1600",
  },
  input: {
    backgroundColor: "#2D2D2D",
    color: "#FFFFFF",
    fontFamily: "helvetica neue, sans-serif",
  },
  "input::placeholder": {
    color: "#999999",
  },
  "input.is-error": {
    color: "#ff1600",
  },
  "@media screen and (max-width: 600px)": {
    input: {
      fontSize: "12px",
    },
  },
};

const CreditCard = ({ square, retrieveCard, card }) => {
  console.log("square:", square);

  const [isDisabled, setIsDisabled] = useState(false);
  // const [card, setCard] = useState(null);

  async function initializeCard(payments) {
    const card = await payments.card({
      style: darkModeCardStyle,
    });
    await card.attach("#card-container");
    return card;
  }

  // Helper method for displaying the Payment Status on the screen.
  // status is either SUCCESS or FAILURE;
  // function displayPaymentResults(status) {
  //   const statusContainer = document.getElementById("payment-status-container");
  //   if (status === "SUCCESS") {
  //     statusContainer.classList.remove("is-failure");
  //     statusContainer.classList.add("is-success");
  //   } else {
  //     statusContainer.classList.remove("is-success");
  //     statusContainer.classList.add("is-failure");
  //   }

  //   statusContainer.style.visibility = "visible";
  // }

  useEffect(() => {
    if (card) return;
    const fetch = async () => {
      console.log("credit card loadeded", card, square);
      if (!square) {
        throw new Error("Square.js failed to load properly");
      }
      const payments = square.payments(
        process.env.REACT_APP_APPLICATION_ID,
        process.env.REACT_APP_LOCATION_ID
      );

      try {
        const card = await initializeCard(payments);
        console.log("card::::::::::", card);
        retrieveCard(card);
      } catch (e) {
        console.error("Initializing Card failed", e);
        return () => card.destroy();
      }
    };

    fetch();
    return () => card.destroy();
  }, []);

  return (
    <div>
      <form id="payment-form" className={styles.form}>
        <div id="card-container"></div>
        {/* <button
          id="card-button"
          type="button"
          disabled={isDisabled}
          onClick={(e) => handlePaymentMethodSubmission(e, card)}
        >
          Pay $1.00
        </button> */}
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
};
export default CreditCard;
