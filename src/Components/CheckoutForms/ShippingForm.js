import React from "react";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import "./checkoutForms.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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

const PaymentSameAddressCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div>
            <label className="checkbox-input formCheckbox">
                <input 
                    type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export const ShippingForm = ({
    shippingFormData,
    setShippingFormData,
    setPaymentFormData,
    handleFormsCompleted,
}) => {
    return (
        <>
            <div className="outerFormContainer">
                <div className="innerFormContainer">
                    <div className="formTheme">
                        <h5>CHECKOUT</h5>
                        <h3>Shipping address</h3>
                    </div>
                    <Formik
                        initialValues={shippingFormData}
                        validationSchema={Yup.object({
                            firstName: Yup.string().required("Required"),
                            lastName: Yup.string().required("Required"),
                            addressLineOne: Yup.string().required("Required"),
                            city: Yup.string()
                                .matches(/[A-Za-z]/, "Invalid City Name")
                                .required("Required"),
                            region: Yup.string()
                                .matches(
                                    /^[A-Z]{2}$/,
                                    "Invalid State Abbreviation"
                                )
                                .required("Required"),
                            zip: Yup.string()
                                .matches(
                                    /^[0-9-]{5,}$/,
                                    "Invalid Zip/Postal Code"
                                )
                                .required("Required"),
                            country: Yup.string()
                                .matches(/[A-Za-z]/, "Invalid Country Name")
                                .required("Required"),
                        })}
                        onSubmit={(values) => {
                            handleFormsCompleted("shippingForm", true);
                            // alert(JSON.stringify(values, null, 2)); // for testing
                            setShippingFormData({ ...values });

                            setPaymentFormData((prev) => {
                                return values.paymentSameAddressCheckbox ===
                                    true
                                    ? {
                                          ...prev,
                                          addressLineOne: values.addressLineOne,
                                          addressLineTwo: values.addressLineTwo,
                                          country: values.country,
                                          region: values.region,
                                          city: values.city,
                                          zip: values.zip,
                                      }
                                    : {
                                          ...prev,
                                          addressLineOne: "",
                                          addressLineTwo: "",
                                          country: "",
                                          region: "",
                                          city: "",
                                          zip: "",
                                      };
                            });
                        }}
                    >
                        <Form className="formCategories">
                            <div className="formRowDouble">
                                <div>
                                    <TextInput
                                        className="formColumnSingle"
                                        label="First Name*"
                                        name="firstName"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        className="formColumnSingle"
                                        label="Last Name*"
                                        name="lastName"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="formRowSingle">
                                <TextInput
                                    className="formColumnDouble"
                                    label="Address Line 1*"
                                    name="addressLineOne"
                                    type="text"
                                />
                            </div>
                            <div className="formRowSingle">
                                <TextInput
                                    className="formColumnDouble"
                                    label="Address Line 2"
                                    name="addressLineTwo"
                                    type="text"
                                />
                            </div>
                            <div className="formRowDouble">
                                <div>
                                    <TextInput
                                        className="formColumnSingle"
                                        label="City*"
                                        name="city"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        className="formColumnSingle"
                                        label="State (xx) *"
                                        name="region"
                                        type="text"
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
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        className="formColumnSingle"
                                        label="Country*"
                                        name="country"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="formBottomContent">
                                <PaymentSameAddressCheckbox
                                    name="paymentSameAddressCheckbox"
                                >
                                    <span>
                                        Use this address for payment details
                                    </span>
                                </PaymentSameAddressCheckbox>

                                <button className="formButton" type="submit">Next - Payment Method</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};
