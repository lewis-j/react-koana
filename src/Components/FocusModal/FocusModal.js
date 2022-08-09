import { imagesData } from "../OnlineShop/images/imagesData";
import "./focusModal.css";

const FocusModal = ({ handleModalFocus, id }) => {
    

    return imagesData
        .filter((item) => item.id === id)
        .map((item) => {
            return (
                <div
                    key={"modal".concat(item.id)}
                    className="modalBackground"
                    // id="modalBackground"
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
                        <div className="boxName">{item.name.toUpperCase()}</div>
                        <div className="boxDesc">{item.desc}</div>
                        <div className="boxPrice">
                            {`$${item.price}`}&nbsp;/ {item.weight}
                            {item.unit}
                        </div>
                        {/* form here */}
                    </div>
                </div>
            );
        });
};

export default FocusModal;
