import { useEffect, useState } from "react";
import styles from "./CreditCard.module.scss";

const CreditCard = ({ square }) => {
  console.log("square:", square);

  const [isDisabled, setIsDisabled] = useState(false);
  const [card, setCard] = useState(null);

  async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach("#card-container");
    return card;
  }

  // Call this function to send a payment token, buyer name, and other details
  // to the project server code so that a payment can be created with
  // Payments API
  async function createPayment(token) {
    const body = JSON.stringify({
      locationId: process.env.REACT_APP_LOCATION_ID,
      sourceId: token,
    });
    console.log("body", body);
    const paymentResponse = await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    console.log("paymentResponse:", paymentResponse.body);
    setIsDisabled(false);

    if (paymentResponse.ok) {
      return paymentResponse.json();
    }
    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }

  // This function tokenizes a payment method.
  // The ‘error’ thrown from this async function denotes a failed tokenization,
  // which is due to buyer error (such as an expired card). It is up to the
  // developer to handle the error and provide the buyer the chance to fix
  // their mistakes.
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === "OK") {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
      }
      throw new Error(errorMessage);
    }
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

  async function handlePaymentMethodSubmission(event, paymentMethod) {
    event.preventDefault();

    try {
      // disable the submit button as we await tokenization and make a
      // payment request.
      setIsDisabled(true);
      console.log("running tokenize", paymentMethod);
      const token = await tokenize(paymentMethod);
      const paymentResults = await createPayment(token);

      console.debug("Payment Success", paymentResults);
    } catch (e) {
      setIsDisabled(false);
      console.error(e.message);
    }
  }

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
        setCard(card);
      } catch (e) {
        console.error("Initializing Card failed", e);
        return;
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <form id="payment-form" className={styles.form}>
        <div id="card-container"></div>
        <button
          id="card-button"
          type="button"
          disabled={isDisabled}
          onClick={(e) => handlePaymentMethodSubmission(e, card)}
        >
          Pay $1.00
        </button>
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
};
export default CreditCard;
