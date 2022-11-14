// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { StoreItemContext } from "../../context/ItemsContext/ItemsContext";
import "./cart.css";

const Cart = () => {
  const { cart, actions, dispatch, displayCart, handleDisplayCart } =
    useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);

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

  const incrementQuantity = (item) => {
    dispatch(actions.updateItemQuantity(true, item));
  };

  const decrementQuantity = (item) => {
    dispatch(actions.updateItemQuantity(false, item));
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
                    onClick={() => incrementQuantity(cartItem)}
                  >
                    <div className="cartPlusHorizontal"></div>
                    <div className="cartPlusVertical"></div>
                  </div>
                  <div className="cartQuantityWindow">{quantity}</div>
                  <div
                    className="cartDecrement"
                    onClick={() => decrementQuantity(cartItem)}
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
                onClick={() => {
                  // navigate("/checkout");
                  // displayCart && handleDisplayCart();
                  dispatch(actions.createPaymentLink());
                }}
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
