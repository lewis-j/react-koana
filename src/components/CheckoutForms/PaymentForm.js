import React from "react";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
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

export const PaymentForm = ({
    paymentFormData,
    setPaymentFormData,
    handleFormsCompleted,
}) => {
    return (
        <>
            <div className="formContainer">
                <div className="formTheme">
                    <h5>CHECKOUT</h5>
                    <h3>Payment method</h3>
                </div>
                <Formik
                    initialValues={paymentFormData}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required("Required"),
                        lastName: Yup.string().required("Required"),
                        addressLineOne: Yup.string().required("Required"),
                        city: Yup.string()
                            .matches(/[A-Za-z]/, "Invalid City Name")
                            .required("Required"),
                        zip: Yup.string()
                            .matches(/^[0-9-]{5,}$/, "Invalid Zip/Postal Code")
                            .required("Required"),
                        region: Yup.string()
                            .matches(/^[A-Z]{2}$/, "Invalid State Abbreviation")
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
                        cardNumber: Yup.string()
                            .matches(
                                /^[0-9]{15,19}$/,
                                "Invalid Credit Card Number"
                            )
                            .required("Required"),
                        expiryDate: Yup.string()
                            .matches(/^[0-9]{8}$/, "Invalid Expiry Date")
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
                    <Form className="formCategories">
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
                                    name="addressLineOne"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="formRowSingle">
                            <div>
                                <TextInput
                                    className="formColumnDouble"
                                    label="Billing address Line 2"
                                    name="addressLineTwo"
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
                                    name="zip"
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
                        <div className="formRowDouble">
                            <div>
                                <TextInput
                                    className="formColumnSingle"
                                    label="Card Number*"
                                    name="cardNumber"
                                    type="text"
                                    placeholder="###############"
                                />
                            </div>
                            <div>
                                <TextInput
                                    className="formColumnSingle"
                                    label="Expiry Date*"
                                    name="expiryDate"
                                    type="text"
                                    placeholder="mmddyyyy"
                                />
                            </div>
                        </div>
                        <div>
                            <TextInput
                                className="formColumnSingle"
                                label="CVV last 3 digits on signature strip*"
                                name="cvv"
                                type="text"
                                placeholder="XXX"
                            />
                        </div>
                        <div className="formBottomContent">
                            <button
                                className="formButton"
                                type="button"
                                onClick={() =>
                                    handleFormsCompleted("shippingForm", false)
                                }
                            >
                                Back - Shipping Address
                            </button>
                            <button className="formButton" type="submit">
                                Next - Order Summary
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
