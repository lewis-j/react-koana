import { imagesData } from "../OnlineShop/images/imagesData";
import FocusModalForm from "./FocusModalForm";
import "./focusModal.css";

const FocusModal = ({ handleModalFocus, id }) => {
    
    return imagesData
        .filter((item) => item.id === id)
        .map((item) => {
            return (
                <div
                    key={"modal".concat(item.id)}
                    className="modalBackground"
                >
                    <div
                        className="modalCloseButton"
                        onClick={() => handleModalFocus("closeButton")}
                    >
                        <div className="leftLine"></div>
                        <div className="rightLine"></div>
                    </div>
                    <div className="modalBorder">
                        <img src={item.image} alt="item"></img>
                        <div className="boxText">
                            <div className="boxName">{item.name.toUpperCase()}</div>
                            <div className="boxDesc">{item.desc.toUpperCase()}</div>
                            <div className="boxPrice">
                                {`$${item.price}`}&nbsp;/ {item.weight}
                                {item.unit}
                            </div>
                            <FocusModalForm id={id} />
                        </div>
                    </div>
                </div>
            );
        });
};

export default FocusModal;
