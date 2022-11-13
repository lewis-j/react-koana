import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { StoreItemContext } from "../../context/StoreItemsContext";
// import { imagesData } from "../../data/imagesData";
import "./focusModalForm.css";

const FocusModalForm = ({ id, handleModalFocus }) => {
  const { cart, dispatch, actions } = useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);

  const [itemQuantity, setItemQuantity] = useState(
    cart.find((item) => item.id === id)?.quantity || 0
  );

  const { inventory: available } = storeItems.find((item) => item.id === id);

  const handleQuantityChange = (increment) => {
    increment
      ? setItemQuantity((prev) => {
          //make axios call to update(upsert)
          return itemQuantity < available ? prev + 1 : prev;
        })
      : setItemQuantity((prev) => {
          return itemQuantity > 0 ? prev - 1 : prev;
        });
  };

  return (
    <>
      <div className="formContent">
        <div className="quantityLabel">QUANTITY</div>
        <div className="quantityContainer">
          <div
            className="increment"
            onClick={() => {
              handleQuantityChange(true);
            }}
          >
            <div className="plusHorizontal"></div>
            <div className="plusVertical"></div>
          </div>
          <div className="quantityWindow">{itemQuantity}</div>
          <div
            className="decrement"
            onClick={() => {
              handleQuantityChange(false);
            }}
          >
            <div className="minus"></div>
          </div>
        </div>
        <div
          // (below) will alter classname of submit button
          // to reflect if itemQuantity is > 0
          className={`${!itemQuantity ? "submitButton Zero" : "submitButton"}`}
          onClick={() => {
            // value.updateCart(id, itemQuantity);
            dispatch(actions.updateItemThunk(id, itemQuantity));
            handleModalFocus("closeButton");
          }}
        >
          {"update cart".toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default FocusModalForm;
