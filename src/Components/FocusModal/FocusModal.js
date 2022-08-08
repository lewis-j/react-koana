import { imagesData } from "../OnlineShop/images/imagesData";
import "./focusModal.css"
import { useState } from "react";

// const handleModalFocus = (e) => {
//     setModalFocus(!modalFocus);
//     e.stopPropagation()
// }

const FocusModal = ({ handleModalFocus, id }) => {
    return imagesData
        .filter((item) => item.id === id)
        .map((item) => {
            return (
                <>
                    <div key={"modal".concat(item.id)} className="modalBackground">
                        <div className="modalBorder">
                            <button
                                onClick={() => handleModalFocus("closeButton")}
                            >X</button>
                            <img src={item.image} alt="item"></img>
                            <div className="box">{item.name}</div>
                            <div className="box">{item.desc}</div>
                            <div className="box">{item.price}</div>
                        </div>
                    </div>
                </>
            );
        });
};

export default FocusModal;
