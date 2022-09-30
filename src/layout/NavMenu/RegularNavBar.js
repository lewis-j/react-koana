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

    const tradNavItems = ["SHOP", "ABOUT"].map((item, idx) => (
        <div
            onClick={() => navigate(`/${item}`)}
            key={`${idx}${item}`}
            className="regularTradNavItems"
        >
            {item}
        </div>
    ));

    return (
        <div className="regularNavContainer">
            {koanaIcon}
            <div className="regularNavItems">
                {tradNavItems}
                <GetIcon />
            </div>
        </div>
    );
};

export default RegularNavBar;
