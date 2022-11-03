// Call this function to send a payment token, buyer name, and other details
// to the project server code so that a payment can be created with

import squareApi from "../../lib/squareApi";

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
  console.log("tokenResult", tokenResult);
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

export async function handlePaymentMethodSubmission(paymentMethod) {
  //   event.preventDefault();

  try {
    // disable the submit button as we await tokenization and make a
    // payment request.
    console.log("running tokenize", paymentMethod);
    const token = await tokenize(paymentMethod);
    // const paymentResults = await createPayment(token);
    squareApi.cart.processPayment(token);
    // console.debug("Payment Success", paymentResults);
  } catch (e) {
    console.error(e.message);
  }
}
