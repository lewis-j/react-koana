import { useState, useEffect, useRef } from "react";
import koana_logo from "./koana_logo copy.png";
import "./navMenu.css";

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
    });
    const widthSize = useRef(window.innerWidth);
    const MEDBREAKPOINT = 769;

    const navHamburgerItems = [
        "about",
        "contact",
        "location",
        "instagram",
        "cart",
        "navLogo",
    ].map((item, idx) => {
        return item !== "navLogo" ? (
            // routes need to be added on line 22 for corresponding pages
            <div key={idx} className="navHamburgerItem">
                {item}
            </div>
        ) : (
            <img
                key={idx}
                className="togglerHamburgerIcon"
                onClick={() => toggleCollapse()}
                src={koana_logo}
                alt="logo"
            />
        );
    });

    const fullNavItems = () => {
        const navItems = [
            "about",
            "contact",
            "location",
            "instagram",
            "cart",
        ].map((item, idx) => (
            <a key={idx + 10} href="#">
                <li>{item}</li>
            </a>
        ));

        return <ul className="fullNavItems">{navItems}</ul>;
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
