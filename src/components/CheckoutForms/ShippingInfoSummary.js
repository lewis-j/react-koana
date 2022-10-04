import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const ShippingInfoSummary = ({ shippingFormData, paymentFormData }) => {
    const {
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        city,
        region,
        zip,
        country,
    } = shippingFormData;

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
        } else {
            return text.replace(/\b\w/g, (c) => c.toUpperCase());
        }
    }

    return (
        <div className="categoryStyling">
            <span style={styling}>
                <FontAwesomeIcon icon={faPaperPlane} size="1x" /> Shipping
                address:
            </span>
            <div className="margin">
                {capChanger(firstName, "capitalize")}{" "}
                {capChanger(lastName, "capitalize")}
                <div>{capChanger(addressLineOne, "capitalize")}</div>
                {addressLineTwo ? (
                    <div>{capChanger(addressLineTwo, "capitalize")}</div>
                ) : null}
                <div>
                    {capChanger(city, "capitalize")}, {`${region} ${zip}`}
                </div>
                <div>{capChanger(country, "upper")}</div>
                <div>{`Phone: ${paymentFormData.phone}`}</div>
            </div>
        </div>
    );
};
