import RegularNavBar from "./RegularNavBar";
import BigMacIcon from "./BigMacIcon";
import VerticalMenu from "./VerticalMenu";
import { useState } from "react";
import "./navMenuNew.css";

export const NavBarNew = () => {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(!expand);
    };

    return (
        <>
            <RegularNavBar />
            <BigMacIcon expand={expand} handleExpand={handleExpand} />
            <VerticalMenu expand={expand} handleExpand={handleExpand} />
        </>
    );
};