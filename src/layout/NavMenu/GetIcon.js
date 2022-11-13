import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartBadge from "../../components/Cart/CartBadge";
import { CartContext } from "../../context/CartContext/CartContext";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

export const GetIcon = () => {
  const { cart, handleDisplayCart } = useContext(CartContext);

  const iconsData = [
    [faCartArrowDown, () => handleDisplayCart()],
    [
      faInstagram,
      () => window.open("https://www.instagram.com/koanahawaii/", "_blank"),
    ],
  ];

  const iconWithBadge = ["cart-arrow-down"];
  console.log("cart:", typeof cart, cart);

  const cartItemQuantity = [...cart].reduce((acc, cur) => {
    return cur.quantity + acc;
  }, 0);

  return iconsData.map(([icon, action], iconIdx) => {
    return (
      <div key={iconIdx}>
        {iconWithBadge.includes(icon.iconName) && (
          <CartBadge quantity={cartItemQuantity} action={action} />
        )}
        <FontAwesomeIcon
          icon={icon}
          size="1x"
          onClick={action}
          style={{ cursor: "pointer" }}
          className="fontAwesomeHover"
        />
      </div>
    );
  });
};

// (faInstagram) is there an issue with this 'window.open' call (as opposed to
// window.location.href) ? I used it to allow for the
// "_blank" suffix so clicking on the instagram icon would open a new tab
// https://stackoverflow.com/questions/26605170/whats-the-difference-between-window-openurl-and-window-location-href-url-on
