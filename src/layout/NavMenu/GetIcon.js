import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartBadge from "../../components/Cart/CartBadge";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const GetIcon = ({faInstagram, faCartArrowDown}) => {
    const value = useContext(CartContext);

    const iconsData = [
        [faCartArrowDown, () => value.handleDisplayCart()],
        // (below) is there an issue with this 'window.open' call (as opposed to
        // window.location.href) ? I used it to allow for the
        // "_blank" suffix so clicking on the instagram icon would open a new tab
        // https://stackoverflow.com/questions/26605170/whats-the-difference-between-window-openurl-and-window-location-href-url-on
        [
            faInstagram,
            () =>
                window.open("https://www.instagram.com/koanahawaii/", "_blank"),
        ],
    ];

    return iconsData.map(([icon, destination], iconIdx) => {
        return (
            <div key={iconIdx}>
                {icon.iconName.includes("cart") &&
                    value.getCartData().length > 0 && <CartBadge />}
                <FontAwesomeIcon
                    icon={icon}
                    size="1x"
                    onClick={destination}
                    style={{ cursor: "pointer" }}
                />
            </div>
        );
    });
};