// import { imagesData } from "../../data/imagesData";
import FocusModalForm from "./FocusModalForm";
// import koana_logo_outline from '../../layout/NavMenu/koana_logo_outline.png';
import "./focusModal.css";
import { useContext } from "react";
import { StoreItemContext } from "../../context/StoreItemsContext";

const FocusModal = ({ handleModalFocus, id }) => {
    const { storeItems } = useContext(StoreItemContext);

    console.log("store items", storeItems);
    const item = storeItems.find((item) => item.id === id);
    if (!item) return null;
    return (
        <div key={"modal".concat(item.id)} className="modalBackground">
            <div
                className="modalCloseButton"
                onClick={() => handleModalFocus("closeButton")}
            >
                <div className="modalCloseButtonLeftLine"></div>
                <div className="modalCloseButtonRightLine"></div>
            </div>
            <div className="modalBorder">
                <img src={item.image} alt={item.name}></img>
                <div className="boxDetails">
                    <div className="boxText">
                        <div className="boxName">{item.name.toUpperCase()}</div>
                        <div className="boxDesc">{item.desc.toUpperCase()}</div>
                        <div className="boxPrice">
                            {`$${item.price}`}&nbsp;/ {item.weight}
                            {item.unit}
                        </div>
                    </div>
                    <FocusModalForm
                        id={id}
                        handleModalFocus={handleModalFocus}
                    />
                </div>
            </div>
        </div>
    );
};

export default FocusModal;
