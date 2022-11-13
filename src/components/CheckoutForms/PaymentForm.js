import React, { useState } from "react";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import CreditCardForm from "../SquarePaymentForm/PaymentForm";
import "./checkoutForms.css";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-input" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="text-input"
        autoComplete="off" // for testing - clears field cache
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error errorMessage">{meta.error}</div>
      ) : null}
    </>
  );
};

export const PaymentForm = ({ paymentFormData, handleFormsCompleted }) => {
  const [card, setCard] = useState(null);
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

  const handleOnSubmit = async (values) => {
    handleFormsCompleted("paymentForm", {
      complete: true,
      formValues: values,
      card,
    });
    alert(JSON.stringify(values, null, 2)); // for testing
  };
  return (
    <>
      <div className="formCategories">
        <Formik
          // innerRef={formRef}
          initialValues={paymentFormData}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            addressLine1: Yup.string().required("Required"),
            city: Yup.string()
              .matches(/[A-Za-z]/, "Invalid City Name")
              .required("Required"),
            postalCode: Yup.string()
              .matches(/^[0-9-]{5,}$/, "Invalid Zip/Postal Code")
              .required("Required"),
            region: Yup.string()
              .matches(/^[A-Za-z]{2,}$/, "Invalid State Abbreviation")
              .required("Required"),
            country: Yup.string()
              .matches(/[A-Za-z]/, "Invalid Country Name")
              .required("Required"),
            email: Yup.string()
              .matches(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "Invalid Email"
              )
              .required("Required"),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, "Invalid Phone Number")
              .required("Required"),
          })}
          onSubmit={handleOnSubmit}
        >
          <Form id="payForm">
            <div className="formRowDouble">
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="First Name on card*"
                  name="firstName"
                  type="text"
                />
              </div>
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="Last Name on card*"
                  name="lastName"
                  type="text"
                />
              </div>
            </div>
            <div className="formRowSingle">
              <div>
                <TextInput
                  className="formColumnDouble"
                  label="Billing address Line 1*"
                  name="addressLine1"
                  type="text"
                />
              </div>
            </div>
            <div className="formRowSingle">
              <div>
                <TextInput
                  className="formColumnDouble"
                  label="Billing address Line 2"
                  name="addressLine2"
                  type="text"
                />
              </div>
            </div>
            <div className="formRowDouble">
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="City*"
                  name="city"
                  type="text"
                  placeholder="city name"
                />
              </div>
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="State*"
                  name="region"
                  type="text"
                  placeholder="state abbreviation"
                />
              </div>
            </div>
            <div className="formRowDouble">
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="Zip/Postal Code*"
                  name="postalCode"
                  type="text"
                  placeholder="#####"
                />
              </div>
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="Country*"
                  name="country"
                  type="text"
                  placeholder="country name"
                />
              </div>
            </div>
            <div className="formRowDouble">
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="Email*"
                  name="email"
                  type="text"
                  placeholder="email address"
                />
              </div>
              <div>
                <TextInput
                  className="formColumnSingle"
                  label="Phone Number*"
                  name="phone"
                  type="text"
                  placeholder="###-###-####"
                />
              </div>
            </div>
          </Form>
        </Formik>
        <CreditCardForm cardStyle={darkModeCardStyle} handleCard={setCard} />
        <div className="formBottomContent">
          <button
            className="formButton"
            type="button"
            onClick={() =>
              handleFormsCompleted("shippingForm", { complete: false })
            }
          >
            Back - Shipping Address
          </button>
          <button className="formButton" type="submit" form="payForm">
            Next - Order Summary
          </button>
        </div>
      </div>
    </>
  );
};
