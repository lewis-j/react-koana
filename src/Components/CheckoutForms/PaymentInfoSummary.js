import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export const PaymentInfoSummary = ({ shippingFormData, paymentFormData }) => {
    const {
        lastName,
        firstName,
        addressLineOne,
        addressLineTwo,
        city,
        region,
        zip,
        country,
        cardNumber,
    } = paymentFormData;

    const styling = {
        fontWeight: "bold",
        textTransform: "uppercase",
    };

    function capChanger(text, setting) {
        if (setting === "upper") {
            text = text.toUpperCase();
            return text;
        } else if (setting === "lower") {
            return text.toLowerCase();
        } else if (setting === "capitalize") {
            return text.replace(/\b\w/g, (c) => c.toUpperCase());
        } else if (setting === "creditCard") {
            return text.slice(-4);
        }
    }

    return (
        <>
            {shippingFormData.paymentSameAddressCheckbox ? (
                <div className="checkoutReivew">
                    <div style={styling}>Billing Address:</div>
                    <div className="margin">
                        <div>Same as shipping address</div>
                        <br></br>
                        <div style={{ fontWeight: "bold" }}>
                            <FontAwesomeIcon icon={faCreditCard} size="1x" />{" "}
                            Card number ending in{" "}
                            {capChanger(cardNumber, "creditCard")}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={styling}>Billing Address:</div>
                    <div>
                        {capChanger(firstName, "capitalize")}{" "}
                        {capChanger(lastName, "capitalize")}
                    </div>
                    <div>{capChanger(addressLineOne, "capitalize")}</div>
                    {addressLineTwo ? (
                        <div>{capChanger(addressLineTwo, "capitalize")}</div>
                    ) : null}
                    <div>
                        {capChanger(city, "capitalize")}, {`${region} ${zip}`}
                    </div>
                    <div>{capChanger(country, "upper")}</div>
                    <div style={styling}>
                        Card number ending in{" "}
                        {capChanger(cardNumber, "creditCard")}
                    </div>
                </div>
            )}
        </>
    );
};
