import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";

import { StoreItemContext } from "../../context/StoreItemsContext";
import FocusModal from "../FocusModal/FocusModal";
import "./onlineShop.css";

export const OnlineShop = () => {
  const { storeItems } = useContext(StoreItemContext);
  const { displayCart } = useContext(CartContext);
  console.log("displayCart", displayCart);
  const [modalFocus, setModalFocus] = useState(false);
  const [currentModalId, setCurrentModalId] = useState(0);

  const handleModalFocus = (sender) => {
    if (sender === "card") {
      setModalFocus(true);
    } else if (sender === "outside") {
      setModalFocus(false);
    } else if (sender === "closeButton") {
      setModalFocus(false);
    }
  };

  const products = storeItems.map((item, idx) => {
    return (
      <div
        key={item.id + idx}
        className={
          modalFocus || displayCart ? "itemCardBackground" : "itemCard"
        }
        onClick={() => {
          handleModalFocus(!modalFocus ? "card" : "outside");
          setCurrentModalId(item.id);
        }}
      >
        <img src={item.image} alt={item.name}></img>
        <div className="itemInfo">
          <div className="itemDesc">{item.name.toUpperCase()}</div>
          <div className="itemSpecs">
            <div className="itemPrice">{`$${item.price}`}&nbsp;</div>
            <div className="itemWeight">
              {item.weight}
              {item.unit}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {modalFocus && (
        <>
          <div
            className="modalOffClickWrapper"
            onClick={() => handleModalFocus("outside")}
          ></div>
          <FocusModal
            modalFocus={modalFocus}
            handleModalFocus={handleModalFocus}
            id={currentModalId}
            // onClick={(e) => e.stopPropagation()}
          />
        </>
      )}
      <div className="itemCardsContainer">
        <div className="itemCards">{products}</div>
      </div>
    </>
  );
};

export default OnlineShop;
