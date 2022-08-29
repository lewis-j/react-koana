import RegularNavBar from "./RegularNavBar";
// import BigMacIcon from "./BigMacIcon";
// import VerticalMenu from "./VerticalMenu";
// import { useState } from "react";
import "./navMenuNew.css";
import SmScreenMenu from "./SmScreenMenu/SmScreenMenu";

export const NavBarNew = ({ modalFocus, cartFocus }) => {
  // const [expand, setExpand] = useState(false);
  // const [toggleCart, setToggleCart] = useState(false);
  // const handleExpand = () => {
  //   setExpand((prev) => !prev);
  // };

  // const handleToggleCart = () => {
  //   setToggleCart(!toggleCart);
  // };

  // used when modal or cart is active so user cannot access navbar buttons
  // modal and cart activation state is passed here 'modalFocus', 'cartFocus'
  // you can see a ternary operator set below which either adds the
  // 'navDisabledStatus' CSS class or not

  // const navDisabledStatus =
  //   modalFocus || cartFocus
  //     ? { pointerEvents: "none" }
  //     : { pointerEvents: "auto" };

  return (
    <div className="navFloat">
      <RegularNavBar />
      {/* <BigMacIcon expand={expand} handleExpand={handleExpand} />
      <VerticalMenu expand={expand} handleExpand={handleExpand} /> */}
      <SmScreenMenu />
    </div>
  );
};
