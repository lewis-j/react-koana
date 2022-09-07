import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { GetIcon } from "./GetIcon";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { koana_logo } from "../../assets/images/icons";

const VerticalMenu = ({ expand, handleExpand }) => {
  const navigate = useNavigate();
  const value = useContext(CartContext);

  const menuBtnRef = useRef(null);

  // the following useEffect hook is used to close the vertical menu when
  // the user clicks off of the menu
  useEffect(() => {
    const outsideClick = document.querySelector("html");
    const closeVerticalMenu = (e) => {
      if (!menuBtnRef.current.contains(e.target) && expand) {
        handleExpand();
      }
      // const target = e.target.classList.value;
      // if (target === "" && expand) {
      //   handleExpand();
      // }
    };
    if (!expand) {
      outsideClick.addEventListener("click", closeVerticalMenu);
    }

    return () => {
      outsideClick.removeEventListener("click", closeVerticalMenu);
    };
  }, [expand, handleExpand]);

  const koanaIcon = (
    <div key={"koanaIcon"} className="koanaIcon">
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
    <div className="tradNavItems" key={`${idx}${item}`}>
      <div onClick={() => navigate(`/${item}`)}>{item}</div>
    </div>
  ));

  // const iconsData = [
  //     [
  //         faCartArrowDown,
  //         () => value.handleDisplayCart(),
  //     ],
  //     [
  //         faInstagram,
  //         () =>
  //             (window.location.href =
  //                 "https://www.instagram.com/koanahawaii/"),

  //     ],
  // ];
  // const getIconComponent = (icon, destination, idx) => {
  //     return (
  //         <div key={`${idx}${icon}`} className="burgerFAIcon">
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

  const classStyle = expand
    ? "burgerNavItems"
    : "burgerNavItems burgerNavItemsHide";

  return (
    <div className={classStyle} ref={menuBtnRef}>
      {koanaIcon}
      {tradNavItems}
      <GetIcon faInstagram={faInstagram} faCartArrowDown={faCartArrowDown} />
    </div>
  );

  // return (
  // <div className="regularNavContainer">
  //     {koanaIcon}
  //     {tradNavItems}
  //     <GetIcon
  //         faInstagram={faInstagram}
  //         faCartArrowDown={faCartArrowDown}
  //     />
  // </div>
  // );
};

export default VerticalMenu;
