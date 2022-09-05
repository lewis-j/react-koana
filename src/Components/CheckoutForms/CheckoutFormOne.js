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
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const PaymenSameAddressCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {/* {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} */}
        </div>
    );
};

export const SignupForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                addressLineOne: "",
                addressLineTwo: "",
                city: "",
                state: "",
                zip: "",
                country: "U.S.",
                paymentSameAddressCheckbox: false,
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required("Required"),
                lastName: Yup.string().required("Required"),
                addressLineOne: Yup.string().required("Required"),
                city: Yup.string()
                    .matches(/[A-Za-z]/, "Invalid City Name")
                    .required("Required"),
                state: Yup.string()
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
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <TextInput label="First Name" name="firstName" type="text" />
                <TextInput label="Last Name" name="lastName" type="text" />
                <TextInput
                    label="Address Line 1"
                    name="addressLineOne"
                    type="text"
                />
                <TextInput
                    label="Address Line 2"
                    name="addressLineTwo"
                    type="text"
                />
                <TextInput label="City" name="city" type="text" />
                <TextInput label="State" name="state" type="text" />
                <TextInput label="Zip/Postal Code" name="zip" type="text" />
                <TextInput label="Country" name="country" type="text" />

                <PaymenSameAddressCheckbox name="paymentSameAddressCheckbox">
                    Use this address for payment details
                </PaymenSameAddressCheckbox>

                <button type="submit">Next</button>
            </Form>
        </Formik>
    );
};
