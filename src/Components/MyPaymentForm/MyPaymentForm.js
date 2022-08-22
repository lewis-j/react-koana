import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const MyPaymentForm = () => (
  <PaymentForm
    applicationId={process.env.REACT_APP_APPLICATION_ID}
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createVerificationDetails={() => ({
      amount: "1.00",
      billingContact: {
        addressLines: ["123 Main Street", "Apartment 1"],
        familyName: "Doe",
        givenName: "John",
        countryCode: "GB",
        city: "London",
      },
      currencyCode: "GBP",
      intent: "CHARGE",
    })}
    locationId={process.env.REACT_APP_LOCATION_ID}
  >
    <CreditCard />
  </PaymentForm>
);

export default MyPaymentForm;
