// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { StoreItemContext } from "../../context/ItemsContext/ItemsContext";
import { useTimeoutBuffer } from "../../utils/useTimeoutBuffer";
import "./cart.css";

const Cart = () => {
  const { cart, deletions, actions, dispatch, displayCart, handleDisplayCart } =
    useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);

  const subTotal = () => {
    return cart.reduce((acc, cur) => {
      const item = storeItems.find((item) => item.id === cur.id);
      return item.price * cur.quantity + acc;
    }, 0);
  };

  useEffect(() => {
    dispatch(actions.fetchItems());
    // eslint-disable-next-line
  }, []);
  const mapItemsToUidsAndQuantity = (items) =>
    items.map(({ uid, quantity }) => ({ uid, quantity: `${quantity}` }));

  const OnChangeTimeDelay = useTimeoutBuffer({ cart, deletions });

  const quantityChangeDelay = (func) =>
    OnChangeTimeDelay(({ cart, deletions }) => {
      console.log("cart", cart, "deletions", deletions);
      const lineItems = mapItemsToUidsAndQuantity(cart);
      dispatch(func(lineItems, deletions));
    }, 3000);

  const incrementQuantity = (id) => {
    dispatch(actions.changeQuantity(id, true));
    quantityChangeDelay(actions.updateItemQuantities);
  };

  const decrementQuantity = (id) => {
    dispatch(actions.changeQuantity(id, false));
    quantityChangeDelay(actions.updateItemQuantities);
  };
  const removeItemHandler = (id) => {
    dispatch(actions.removeItem(id));
    quantityChangeDelay(actions.updateItemQuantities);
  };
  const checkoutHandler = (event, error) => {
    if (error) {
      event.target.animate([{ color: "inhrerit" }, { color: "red" }], {
        duration: 200,
        iterations: 2,
      });
      return;
    }
    OnChangeTimeDelay(({ cart, deletions }) => {
      const lineItems = mapItemsToUidsAndQuantity(cart);
      dispatch(actions.createPaymentLink(lineItems, deletions));
    }, 0);
  };

  const stockErrorMsg = (quantity, inventory) => {
    if (quantity > inventory) return `only ${inventory} remaining`;

    return null;
  };

  const renderCartItems = () => {
    let isError = false;
    const items = cart.map((cartItem, idx) => {
      const item = storeItems.find((item) => item.id === cartItem.id);
      if (!item) {
        return null;
      }
      const { name, price, weight, unit, image } = item;
      const { id: itemId, quantity, inventory } = cartItem;

      const cartErrorMessage = stockErrorMsg(quantity, inventory);
      if (cartErrorMessage) isError = true;

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
                onClick={() => removeItemHandler(itemId)}
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
    return [items, isError];
  };

  const [cartItems, error] = renderCartItems();

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
        <div className="cartScrollWrapper">{cartItems}</div>
        {subTotal() ? (
          <div className="cartSubTotalContainer">
            <div className="cartSubTotal">
              {"subtotal".toUpperCase()} ${subTotal()}
            </div>
            <div className="cartSubTotalControls">
              <div
                className="cartToCheckout"
                // checkout button now goes to checkout section
                onClick={(e) => {
                  checkoutHandler(e, error);
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
