import { imagesData } from "../../data/imagesData";
import FocusModalForm from "./FocusModalForm";
// import koana_logo_outline from '../../layout/NavMenu/koana_logo_outline.png';
import "./focusModal.css";

const FocusModal = ({ handleModalFocus, id }) => {
    return imagesData
        .filter((item) => item.id === id)
        .map((item) => {
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
                        <img src={item.image} alt="item"></img>
                        <div className="boxDetails">
                            <div className="boxText">
                                <div className="boxName">
                                    {item.name.toUpperCase()}
                                </div>
                                <div className="boxDesc">
                                    {item.desc.toUpperCase()}
                                </div>
                                <div className="boxPrice">
                                    {`$${item.price}`}
                                    {item.weight &&
                                        ` / ${item.weight}${item.unit}`}
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
        });
};

export default FocusModal;
