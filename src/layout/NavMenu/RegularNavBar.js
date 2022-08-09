import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import koana_logo from "/Users/thejourneyville/Documents/vscode/react/koana_v2/src/layout/NavMenu/koana_logo copy.png";

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
                    size="1x"
                    onClick={destination}
                    style={{ cursor: "pointer" }}
                />
            </div>
        );
    };

    const iconNavItems = iconsData.map(([icon, destination], iconIdx) => {
        return getIconComponent(icon, destination, iconIdx);
    });

    const regularNavItems = [koanaIcon, ...tradNavItems, ...iconNavItems];

    return (
        <>
            <div className="regularNavContainer">{regularNavItems}</div>
        </>
    );
};

export default RegularNavBar;
