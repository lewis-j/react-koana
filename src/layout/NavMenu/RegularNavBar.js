import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { GetIcon } from "./GetIcon";
import { useNavigate } from "react-router-dom";
import { koana_logo } from "../../assets/images/icons";

const RegularNavBar = () => {
  const navigate = useNavigate();

  const koanaIcon = (
    <div key={"koanaIcon"} className="regularKoanaIcon">
      <img
        onClick={() => {
          navigate(`/`);
        }}
        src={koana_logo}
        alt="logo"
      />
    </div>
  );

  const tradNavItems = ["shop", "about"].map((item, idx) => (
    <div
      onClick={() => navigate(`/${item}`)}
      key={`${idx}${item}`}
      className="regularTradNavItems"
    >
      {item}
    </div>
  ));

  // const iconsData = [
  //     [faCartArrowDown, () => value.handleDisplayCart()],
  //     // (below) is there an issue with this 'window.open' call (as opposed to
  //     // window.location.href) ? I used it to allow for the
  //     // "_blank" suffix so clicking on the instagram icon would open a new tab
  //     // https://stackoverflow.com/questions/26605170/whats-the-difference-between-window-openurl-and-window-location-href-url-on
  //     [
  //         faInstagram,
  //         () =>
  //             window.open("https://www.instagram.com/koanahawaii/", "_blank"),
  //     ],
  // ];
  // const getIconComponent = (icon, destination, idx) => {
  //     return (
  //         <div key={`${idx}${icon}`}>
  //             {icon.iconName.includes("cart") &&
  //                 value.getCartData().length > 0 && <CartBadge />}
  //             <FontAwesomeIcon
  //                 icon={icon}
  //                 size="1x"
  //                 onClick={destination}
  //                 style={{ cursor: "pointer" }}
  //             />
  //         </div>
  //     );
  // };

  // const iconNavItems = iconsData.map(([icon, destination], iconIdx) => {
  //     return getIconComponent(icon, destination, iconIdx);
  // });

  // const regularNavItems = [koanaIcon, ...tradNavItems, ...iconNavItems];

  return (
    <div className="regularNavContainer">
      {koanaIcon}
      {tradNavItems}
      <GetIcon faInstagram={faInstagram} faCartArrowDown={faCartArrowDown} />
    </div>
  );
};

export default RegularNavBar;
