import React from "react";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { NavBarNew } from "../../layout/NavMenu/NavMenuNew";
import "./checkoutForms.css";

// Checkout Form One
// this form holds full name, shipping address, and option for same address for payment details

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

export const PaymentForm = ({
    paymentFormData,
    setPaymentFormData,
    handleFormsCompleted,
}) => {
    return (
        <>
            <NavBarNew modalFocus={false} />
            <div className="outerFormContainer">
                <div className="innerFormContainer">
                    <h1>CHECKOUT</h1>
                    <h3 className="formTheme">Payment method</h3>
                    <div className="formContainer">
                        <Formik
                            initialValues={paymentFormData}
                            validationSchema={Yup.object({
                                firstName: Yup.string().required("Required"),
                                lastName: Yup.string().required("Required"),
                                addressLineOne:
                                    Yup.string().required("Required"),
                                city: Yup.string()
                                    .matches(/[A-Za-z]/, "Invalid City Name")
                                    .required("Required"),
                                zip: Yup.string()
                                    .matches(
                                        /^[0-9-]{5,}$/,
                                        "Invalid Zip/Postal Code"
                                    )
                                    .required("Required"),
                                region: Yup.string()
                                    .matches(
                                        /^[A-Z]{2}$/,
                                        "Invalid State Abbreviation"
                                    )
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
                                    .matches(
                                        /^[0-9]{10}$/,
                                        "Invalid Phone Number"
                                    )
                                    .required("Required"),
                                cardNumber: Yup.string()
                                    .matches(
                                        /^[0-9]{15,19}$/,
                                        "Invalid Credit Card Number"
                                    )
                                    .required("Required"),
                                expiryDate: Yup.string()
                                    .matches(
                                        /^[0-9]{8}$/,
                                        "Invalid Expiry Date"
                                    )
                                    .required("Required"),
                                cvv: Yup.string()
                                    .matches(/^[0-9]{3}$/, "Invalid CVV number")
                                    .required("Required"),
                            })}
                            onSubmit={(values) => {
                                handleFormsCompleted("paymentForm", true);
                                // alert(JSON.stringify(values, null, 2)); // for testing
                                setPaymentFormData({ ...values });
                            }}
                        >
                            <Form>
                                <div>
                                    <TextInput
                                        label="First Name on card*"
                                        name="firstName"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Last Name on card*"
                                        name="lastName"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Billing address Line 1*"
                                        name="addressLineOne"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Billing address Line 2"
                                        name="addressLineTwo"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="City*"
                                        name="city"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="State*"
                                        name="region"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Zip/Postal Code*"
                                        name="zip"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Country*"
                                        name="country"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Email*"
                                        name="email"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Phone Number (##########)*"
                                        name="phone"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Card Number (###############)*"
                                        name="cardNumber"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Expiry Date (mmddyyyy)*"
                                        name="expiryDate"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="CVV last 3 digits on signature strip*"
                                        name="cvv"
                                        type="text"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormsCompleted(
                                            "shippingForm",
                                            false
                                        )
                                    }
                                >
                                    Back
                                </button>
                                <button type="submit">
                                    Next - Order Summary
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};
