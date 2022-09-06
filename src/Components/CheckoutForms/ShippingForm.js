import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
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

const PaymentSameAddressCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
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
        <div className="outerFormContainer">
            <h1>CHECKOUT</h1>
            <h3 className="formTheme">Shipping address</h3>
            <div className="formContainer">
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
                            .matches(/^[A-Z]{2}$/, "Invalid State Abbreviation")
                            .required("Required"),
                        zip: Yup.string()
                            .matches(/^[0-9-]{5,}$/, "Invalid Zip/Postal Code")
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
                            return values.paymentSameAddressCheckbox === true
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
                    <Form>
                        <div>
                            <TextInput
                                label="First Name*"
                                name="firstName"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Last Name*"
                                name="lastName"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Address Line 1*"
                                name="addressLineOne"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Address Line 2"
                                name="addressLineTwo"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextInput label="City*" name="city" type="text" />
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

                        <PaymentSameAddressCheckbox name="paymentSameAddressCheckbox">
                            Use this address for payment details
                        </PaymentSameAddressCheckbox>

                        <button type="submit">Next - Payment</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
