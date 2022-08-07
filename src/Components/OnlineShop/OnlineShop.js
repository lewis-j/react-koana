import { imagesData } from "./images/imagesData";
import "./onlineShop.css";

export const OnlineShop = () => {
    const products = imagesData.map((item, idx) => {
        return (
            <div key={idx} className="itemCard">
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
        <div className="itemCardsContainer">
            <div className="itemCards">{products}</div>
        </div>
    );
};
