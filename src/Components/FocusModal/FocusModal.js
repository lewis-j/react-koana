import { imagesData } from "../OnlineShop/images/imagesData";
import FocusModalForm from "./FocusModalForm";
// import koana_logo_outline from '../../layout/NavMenu/koana_logo_outline.png';
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
                            {/* <img className="koanaOutline" src={koana_logo_outline} alt="koana logo"></img> */}
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
