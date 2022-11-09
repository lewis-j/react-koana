export const getPayment = () => {
  return window.Square.payments(
    process.env.REACT_APP_APPLICATION_ID,
    process.env.REACT_APP_LOCATION_ID
  );
};

export const tokenize = async (paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();

  if (tokenResult.status === "OK") {
    return tokenResult;
  } else {
    let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
};

export const verifyBuyerToken = async (token, billingContact, amount) => {
  const payments = getPayment();

  const {
    firstName,
    lastName,
    city,
    region,
    country,
    email,
    phone,
    addressLine1,
    addressLine2,
  } = billingContact;
  const addressLines =
    addressLine2 === "" ? [addressLine1] : [addressLine1, addressLine2];

  const verificationDetails = {
    amount,
    /* collected from the buyer */
    billingContact: {
      addressLines,
      familyName: firstName,
      givenName: lastName,
      email,
      country,
      phone,
      region,
      city,
    },
    currencyCode: "USD",
    intent: "CHARGE",
  };

  const verificationResults = await payments.verifyBuyer(
    token,
    verificationDetails
  );
  return verificationResults.token;
};

// export async function handlePaymentMethodSubmission(paymentMethod) {
//   //   event.preventDefault();

//   try {
//     // disable the submit button as we await tokenization and make a
//     // payment request.
//     const token = await tokenize(paymentMethod);
//     // const paymentResults = await createPayment(token);
//     squareApi.cart.processPayment(token);
//     // console.debug("Payment Success", paymentResults);
//   } catch (e) {
//     console.error(e.message);
//   }
// }

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
