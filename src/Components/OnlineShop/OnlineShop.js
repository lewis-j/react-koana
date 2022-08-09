import { useState } from "react";
import { imagesData } from "./images/imagesData";
import FocusModal from "../FocusModal/FocusModal";
import "./onlineShop.css";

export const OnlineShop = () => {
    const [modalFocus, setModalFocus] = useState(false);
    const [currentModalId, setCurrentModalId] = useState(0);

    const handleModalFocus = (sender) => {
        console.log(sender);
        if (sender === "card") {
            setModalFocus(true);
        } else if (sender === "outside") {
            setModalFocus(false);
        } else if (sender === "closeButton") {
            setModalFocus(false);
        }
    };

    const products = imagesData.map((item, idx) => {
        return (
            <div
                key={item.id + idx}
                className={modalFocus ? "itemCardBackground" : "itemCard"}
                onClick={() => {
                    handleModalFocus(!modalFocus ? "card" : "outside");
                    setCurrentModalId(item.id);
                }}
            >
                <img src={item.image} alt="item"></img>
                <div className="itemInfo">
                    <div className="itemDesc">{item.name.toUpperCase()}</div>
                    <div className="itemSpecs">
                        <div className="itemPrice">
                            {`$${item.price}`}&nbsp;
                        </div>
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
                        onClick={(e) => e.stopPropagation()}
                    />
                </>
            )}
            <div className="itemCardsContainer">
                <div className="itemCards">{products}</div>
            </div>
        </>
    );
};
