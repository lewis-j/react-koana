import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const MyPaymentForm = () => (
  <PaymentForm
    applicationId="sq0idp-Y0QZQ-Xx-Xx-Xx-Xx"
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
    locationId="LID"
  >
    <CreditCard />
  </PaymentForm>
);

export default MyPaymentForm;
