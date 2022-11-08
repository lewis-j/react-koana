import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
//"TODO: implement this cool feature",
export const ShippingInfoSummary = ({ shippingFormData, paymentFormData }) => {
  const {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
  } = shippingFormData;

  const styling = {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: ".65rem",
    letterSpacing: "0.1rem",
    color: "#d0cf6a",
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
        <FontAwesomeIcon icon={faPaperPlane} size="1x" /> Shipping address:
      </span>
      <div className="margin">
        {capChanger(firstName, "capitalize")}{" "}
        {capChanger(lastName, "capitalize")}
        <div>{capChanger(addressLine1, "capitalize")}</div>
        {addressLine2 ? (
          <div>{capChanger(addressLine2, "capitalize")}</div>
        ) : null}
        <div>
          {capChanger(city, "capitalize")}, {`${region} ${postalCode}`}
        </div>
        <div>{capChanger(country, "upper")}</div>
        <div>{`Phone: ${paymentFormData.phone}`}</div>
      </div>
    </div>
  );
};
