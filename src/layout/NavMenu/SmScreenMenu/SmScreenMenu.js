import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { koana_logo } from "../../../assets/images/icons";
import { CartContext } from "../../../context/CartContext/CartContext";
import { GetIcon } from "../GetIcon";
import styles from "./SmScreenMenu.scss";

const SmScreenMenu = () => {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const darkThemes = ["/", "/about"];
  const location = useLocation();
  const isDark = darkThemes.some((path) => path === location.pathname);
  const value = useContext(CartContext);

  const menuBtnRef = useRef(null);

  // the following useEffect hook is used to close the vertical menu when
  // the user clicks off of the menu
  useEffect(() => {
    const outsideClick = document.querySelector("html");
    const closeVerticalMenu = (e) => {
      if (!menuBtnRef.current.contains(e.target) && expand) {
        setExpand(false);
      }
      // const target = e.target.classList.value;
      // if (target === "" && expand) {
      //   handleExpand();
      // }
    };

    outsideClick.addEventListener("click", closeVerticalMenu);

    return () => {
      outsideClick.removeEventListener("click", closeVerticalMenu);
    };
  }, [expand]);

  const burgerCollapsedKoanaIcon = (
    <div key={"koanaIcon"} className="burgerCollapsedKoanaIcon">
      <img
        onClick={() => {
          navigate(`/`);
        }}
        src={koana_logo}
        alt="logo"
      />
    </div>
  );

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

  const hiddenStyle = expand
    ? "burgerNavItems"
    : "burgerNavItems burgerNavItemsHide";
  console.log("isDark", isDark);
  const classStyle = isDark
    ? hiddenStyle + " darkTheme"
    : hiddenStyle + " lightTheme";
  return (
    <div className={styles.container}>
      <div className="bigMacMode">
        <div
          className="bigMacIcon"
          onClick={(e) => {
            e.stopPropagation();
            setExpand((prev) => !prev);
          }}
        >
          {expand ? (
            <>
              <div className="burgerSpacer"></div>
              <div className="burger burgerFade"></div>
              <div className="burger burgerExpand"></div>
              <div className="burger burgerFade"></div>
            </>
          ) : (
            <>
              <div className="burgerSpacer"></div>
              <div className="burger"></div>
              <div className="burger"></div>
              <div className="burger"></div>
            </>
          )}
        </div>
        {!expand && <div>{burgerCollapsedKoanaIcon}</div>}
      </div>
      <div className={classStyle} ref={menuBtnRef}>
        {koanaIcon}
        {tradNavItems}
        <GetIcon faInstagram={faInstagram} faCartArrowDown={faCartArrowDown} />
      </div>
    </div>
  );
};
export default SmScreenMenu;
