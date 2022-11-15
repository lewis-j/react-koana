// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { StoreItemContext } from "../../context/ItemsContext/ItemsContext";
import { useTimeoutBuffer } from "../../utils/useTimeoutBuffer";
import "./cart.css";

const Cart = () => {
  const { cart, actions, dispatch, displayCart, handleDisplayCart } =
    useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);

  const [timerId, setTimerId] = useState(null);

  const subTotal = () => {
    return cart.reduce((acc, cur) => {
      const item = storeItems.find((item) => item.id === cur.id);
      return item.price * cur.quantity + acc;
    }, 0);
  };

  // useEffect(() => {
  //     if (value.displayCart) {
  //         if (value.cartData.length < 1 || value.checkSubTotal() === 0) {
  //             navigate("/shop");
  //         }
  //     }
  // }, [navigate, storeItems, value, value.cartData]);
  useEffect(() => {
    dispatch(actions.fetchItems());
    // eslint-disable-next-line
  }, []);

  const OnChangeTimeDelay = useTimeoutBuffer(cart);

  const quantityChangeDelay = () =>
    OnChangeTimeDelay((_cart) => {
      console.log("timeout ran", _cart);
      dispatch(actions.updateItemQuantity(_cart));
    }, 3000);

  const incrementQuantity = (id) => {
    dispatch(actions.changeQuantity(id, true));
    quantityChangeDelay();
  };

  const decrementQuantity = (id) => {
    dispatch(actions.changeQuantity(id, false));
    quantityChangeDelay();
  };
  const checkoutHandler = () => {
    OnChangeTimeDelay((_cart) => {
      console.log("checkout ran", _cart);
      dispatch(actions.createPaymentLink(_cart));
    }, 0);
  };

  const stockErrorMsg = (quantity, inventory) => {
    if (quantity > inventory) return `only ${inventory} remaining`;
    return null;
  };

  const renderCartItems = () => {
    return cart.map((cartItem, idx) => {
      const { name, price, weight, unit, image } = storeItems.find(
        (item) => item.id === cartItem.id
      );
      const { id: itemId, quantity, inventory } = cartItem;

      const cartErrorMessage = stockErrorMsg(quantity, inventory);

      return (
        <div
          key={idx}
          className={cartErrorMessage ? "cartItemError" : "cartItem"}
        >
          <div className="cartItemContent">
            <div className="cartItemStatsContainer">
              <div className="cartItemTitleContainer">
                <div className="cartItemName">{name.toUpperCase()}</div>
              </div>
              <div className="cartItemPrice">
                ${price} {weight !== undefined && "/"} {weight}
                {unit}
              </div>
              <div className="cartItemEditorContainer">
                <div className="cartItemQuantityContainer">
                  <div
                    className="cartIncrement"
                    onClick={() => incrementQuantity(itemId)}
                  >
                    <div className="cartPlusHorizontal"></div>
                    <div className="cartPlusVertical"></div>
                  </div>
                  <div className="cartQuantityWindow">{quantity}</div>
                  <div
                    className="cartDecrement"
                    onClick={() => decrementQuantity(itemId)}
                  >
                    <div className="cartMinus"></div>
                  </div>
                </div>
                <div className="cartErrorMessage">{cartErrorMessage}</div>
              </div>
            </div>
            <div className="removeAndImageContainer">
              <div
                className="cartRemoveItem"
                onClick={() => dispatch(actions.removeItem(itemId))}
              >
                {"remove"}
              </div>
              <div className="cartItemImageContainer">
                <img src={image} alt="item" />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const cartItemsContent = () => {
    return (
      <>
        <div className="cartHeaderContainer">
          <div className="cartHeader">{"CART"}</div>
          <div
            className="cartHeaderCloseButton"
            onClick={() => displayCart && handleDisplayCart()}
          >
            <div className="cartHeaderCloseButtonLeftLine"></div>
            <div className="cartHeaderCloseButtonRightLine"></div>
          </div>
        </div>
        <div className="cartScrollWrapper">{renderCartItems()}</div>
        {subTotal() ? (
          <div className="cartSubTotalContainer">
            <div className="cartSubTotal">
              {"subtotal".toUpperCase()} ${subTotal()}
            </div>
            <div className="cartSubTotalControls">
              <div
                className="cartToCheckout"
                // checkout button now goes to checkout section
                onClick={checkoutHandler}
              >
                {"checkout".toUpperCase()}
              </div>
            </div>
          </div>
        ) : (
          <div className="cartSubTotalContainer">
            <div className="cartSubTotal">cart is empty</div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {displayCart && (
        <div
          className="cartOffClickWrapper"
          onClick={() => handleDisplayCart()}
        ></div>
      )}
      {displayCart && (
        <div className="cartModal">
          <div>{cartItemsContent()}</div>
        </div>
      )}
    </>
  );
};

export default Cart;
