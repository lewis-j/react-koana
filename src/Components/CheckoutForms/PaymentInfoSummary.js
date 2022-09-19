import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";

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
        fontSize: ".65rem",
        letterSpacing: "0.1rem",
        color: "#01949b",
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
                <div className="checkoutReivew categoryStyling">
                    <FontAwesomeIcon
                        style={styling}
                        icon={faFileInvoice}
                        size="1x"
                    />{" "}
                    <span style={styling}> Billing Address:</span>
                    <div className="margin">
                        <div>Same as shipping address</div>
                        <br></br>
                    </div>
                    <span style={styling}>
                        <FontAwesomeIcon icon={faCreditCard} size="1x" /> Card
                        number ending in:{" "}
                    </span>
                    {capChanger(cardNumber, "creditCard")}
                </div>
            ) : (
                <div>
                    <FontAwesomeIcon
                        style={styling}
                        icon={faFileInvoice}
                        size="1x"
                    />{" "}
                    <span style={styling}> Billing address:</span>
                    <div className="margin">
                        <div>
                            {capChanger(firstName, "capitalize")}{" "}
                            {capChanger(lastName, "capitalize")}
                        </div>
                        <div>{capChanger(addressLineOne, "capitalize")}</div>
                        {addressLineTwo ? (
                            <div>
                                {capChanger(addressLineTwo, "capitalize")}
                            </div>
                        ) : null}
                        <div>
                            {capChanger(city, "capitalize")},{" "}
                            {`${region} ${zip}`}
                        </div>
                        <div>{capChanger(country, "upper")}</div>
                    </div>
                    <FontAwesomeIcon
                        style={styling}
                        icon={faCreditCard}
                        size="1x"
                    />{" "}
                    <span style={styling}>
                        {" "}
                        Card number ending in{" "}
                        {capChanger(cardNumber, "creditCard")}
                    </span>
                </div>
            )}
        </>
    );
};
