import { useState, useEffect } from "react";
import koana_logo from "./koana_logo.png";
import "./navMenu.css";

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth });

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

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({ width: window.innerWidth });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [viewportSize]);

    function outsideFunction() {
        console.log("outsideFucntion: ", viewportSize.width)
        return viewportSize.width < 769
    }

    useEffect(() => {
        // checks for 'click' outside of navmenu and collapsed navmenu if open
        const outsideClick = document.querySelector("html");

        outsideClick.removeEventListener("click", testFunction);
        outsideFunction() && outsideClick.addEventListener("click", testFunction);



        function testFunction(e) {
            const target = e.target.classList.value;
            console.log(viewportSize.width)
            if (viewportSize.width < 769){
                console.log("less than 769")
                if (target === "" && collapsed === false) {
                    console.log(typeof(viewportSize.width), "passed")
                    setCollapsed(true);
                }
            }
        };

        return () => {
            outsideClick.removeEventListener("click", testFunction);
        };
    }, [collapsed]);

    const toggleCollapse = () => {
        viewportSize.width < 769 &&
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
            <div style={{ color: "red" }}>{viewportSize.width}</div>
            <div className="fullNav fullNavSlider">{fullNavItems()}</div>
            
            <div className={hamburgerStatus[0]}>
                <div className={hamburgerStatus[1]}>{navHamburgerItems}</div>
            </div>
        </>
    );
};

export default NavMenu;
