import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import koana_logo from "./koana_logo.png";
import "./navMenuNew.css";

const NavBarNew = () => {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(!expand);
    };

    //
    const BigMacIcon = ({ expand, handleExpand }) => {
        const [localExpand, setLocalExpand] = useState(expand);

        return (
            <div
                className="bigMacIcon"
                onClick={() => {
                    setLocalExpand(!localExpand);
                    setTimeout(() => {
                        handleExpand();
                    }, 200);
                }}
            >
                {localExpand ? (
                    <>
                        <div className="burger burgerFade"></div>
                        <div className="burger burgerExpand"></div>
                        <div className="burger burgerFade"></div>
                    </>
                ) : (
                    <>
                        <div className="burger"></div>
                        <div className="burger"></div>
                        <div className="burger"></div>
                    </>
                )}
            </div>
        );
    };

    const VerticalMenu = ({ expand }) => {
        const navigate = useNavigate();
        const [localExpand, setLocalExpand] = useState(expand);

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

        const tradNavItems = ["store", "about"].map((item, idx) => (
            <div
                onClick={() => navigate(`/${item}`)}
                key={`${idx}${item}`}
                style={{ cursor: "pointer" }}
            >
                {item}
            </div>
        ));

        const iconsData = [
            [
                faCartArrowDown,
                () =>
                    (window.location.href =
                        "https://www.instagram.com/koanahawaii/"),
            ],
            [
                faInstagram,
                () =>
                    (window.location.href =
                        "https://www.instagram.com/koanahawaii/"),
            ],
        ];
        const getIconComponent = (icon, destination, idx) => {
            return (
                <div key={`${idx}${icon}`}>
                    <FontAwesomeIcon
                        icon={icon}
                        size="2x"
                        onClick={destination}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            );
        };

        const iconNavItems = iconsData.map(([icon, destination], iconIdx) => {
            return getIconComponent(icon, destination, iconIdx);
        });

        const burgerNavItems = [koanaIcon, ...tradNavItems, ...iconNavItems];

        return localExpand ? (
            <div className="burgerNavItems">{burgerNavItems}</div>
        ) : (
            <>
                <div className="burgerNavItemsHide">{burgerNavItems}</div>
            </>
        );
    };

    return (
        <>
            <BigMacIcon expand={expand} handleExpand={handleExpand} />
            <VerticalMenu expand={expand} />
        </>
    );
};

export default NavBarNew;
