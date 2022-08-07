import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import koana_logo from "./koana_logo.png";
import "./navMenu.css";

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
  });

  const navigate = useNavigate();
  const widthSize = useRef(window.innerWidth);
  const MEDBREAKPOINT = 769;
  console.log("ran state", viewportSize);
  const tradNavItems = ["shop", "about"].map((item, idx) => (
    <div
      onClick={() => navigate(`/${item}`)}
      key={`${idx}${item}`}
      className="navHamburgerItem"
    >
      {console.log(`/${item}`)}
      {item}{" "}
    </div>
  ));

  const iconsData = [
    [
      faInstagram,
      () => (window.location.href = "https://www.instagram.com/koanahawaii/"),
    ],
    [
      faCartArrowDown,
      () => (window.location.href = "https://www.instagram.com/koanahawaii/"),
    ],
  ];
  const getIconComponent = (icon, click) => {
    return <FontAwesomeIcon icon={icon} size="1x" onClick={click} />;
  };

  const iconNavItems = iconsData.map(([icon, click], iconIdx) => {
    return getIconComponent(icon, click);
  });

  const logo = (
    <img
      className="togglerHamburgerIcon"
      onClick={(event) => {
        navigate(`/`);
        toggleCollapse();
      }}
      src={koana_logo}
      alt="logo"
    />
  );

  const navHamburgerItems = [...tradNavItems, ...iconNavItems, logo];
  const fullNavItems = () => {
    const navItems = ["about", "contact", "location", "instagram", "cart"].map(
      (item, idx) => (
        <a key={idx + 10} href="#">
          <li>{item}</li>
        </a>
      )
    );

    return <ul className="fullNavItems">{navHamburgerItems}</ul>;
  };

  const handleResize = () => {
    setViewportSize({ width: window.innerWidth });
    widthSize.current = window.innerWidth;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportSize]);

  function confirmSmallBreakpoint() {
    return widthSize.current < MEDBREAKPOINT;
  }

  useEffect(() => {
    const outsideClick = document.querySelector("html");

    confirmSmallBreakpoint()
      ? outsideClick.addEventListener("click", closeExpandedNav)
      : outsideClick.removeEventListener("click", closeExpandedNav);

    function closeExpandedNav(e) {
      const target = e.target.classList.value;
      console.log("target", { target: e.target });

      if (confirmSmallBreakpoint()) {
        if (target === "" && collapsed === false) {
          setCollapsed(true);
        }
      }
    }

    return () => {
      outsideClick.removeEventListener("click", closeExpandedNav);
    };
  }, [collapsed]);

  const toggleCollapse = () => {
    viewportSize.width < MEDBREAKPOINT &&
      setCollapsed((currentState) => !currentState);
  };

  const hamburgerStatus = collapsed
    ? ["navHamburgerContainerOuter", "navHamburgerContainerInner"]
    : [
        "navHamburgerContainerOuter outerHamburgerExpanded",
        "navHamburgerContainerInner innerHamburgerExpanded",
      ];

  return (
    <>
      <div style={{ color: "white", fontWeight: "bolder" }}>
        {widthSize.current}
      </div>
      <div className="fullNav fullNavSlider">{fullNavItems()}</div>

      <div className={hamburgerStatus[0]}>
        <div className={hamburgerStatus[1]}>{navHamburgerItems}</div>
      </div>
    </>
  );
};

export default NavMenu;
