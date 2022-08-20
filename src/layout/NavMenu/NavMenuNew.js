import RegularNavBar from "./RegularNavBar";
import BigMacIcon from "./BigMacIcon";
import VerticalMenu from "./VerticalMenu";
import { useState } from "react";
import "./navMenuNew.css";

export const NavBarNew = ({ modalFocus, cartFocus }) => {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(!expand);
    };

    // used when modal or cart is active so user cannot access navbar buttons
    // modal and cart activation state is passed here 'modalFocus', 'cartFocus'
    // you can see a ternary operator set below which either adds the
    // 'navDisabledStatus' CSS class or not

    const navDisabledStatus =
        modalFocus || cartFocus
            ? { pointerEvents: "none" }
            : { pointerEvents: "auto" };

    return (
        <div style={navDisabledStatus} className="navFloat">
            <RegularNavBar />
            <BigMacIcon expand={expand} handleExpand={handleExpand} />
            <VerticalMenu expand={expand} handleExpand={handleExpand} />
        </div>
    );
};
