// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext";
import { StoreItemContext } from "../../context/StoreItemsContext";
import "./cart.css";

const Cart = () => {
  const { cart, actions, dispatch, displayCart, handleDisplayCart } =
    useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("locations", location);

  useEffect(() => {
    console.log("fethcing items", typeof actions.fetchItems());
    dispatch(actions.fetchItems());
  }, []);

  const subTotal = () => {
    return cart.reduce((acc, cur) => {
      const item = storeItems.find((item) => item.id === cur.id);
      return item.price * cur.quantity + acc;
    }, 0);
  };

  const changeQuantity = (id, inc) => {
    const { inventory } = storeItems.find((item) => item.id === id);
    dispatch(actions.changeQuantity(id, inc, inventory));
  };

  // useEffect(() => {
  //     if (value.displayCart) {
  //         if (cart.length < 1 || value.checkSubTotal() === 0) {
  //             navigate("/shop");
  //         }
  //     }
  // }, [navigate, storeItems, value, cart]);

  const cartItemsContent = () => {
    const itemList = cart.map((cartItem, idx) => {
      const { name, price, weight, unit, image } = storeItems.find(
        (item) => item.id === cartItem.id
      );

      return (
        <div key={idx} className="cartItem">
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
                    onClick={() => changeQuantity(cartItem.id, true)}
                  >
                    <div className="cartPlusHorizontal"></div>
                    <div className="cartPlusVertical"></div>
                  </div>
                  <div className="cartQuantityWindow">{cartItem.quantity}</div>
                  <div
                    className="cartDecrement"
                    onClick={() => changeQuantity(cartItem.id, false)}
                  >
                    <div className="cartMinus"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="removeAndImageContainer">
              <div
                className="cartRemoveItem"
                onClick={() => dispatch(actions.removeItem(cartItem.id))}
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
        <div className="cartScrollWrapper">{itemList}</div>
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
                  navigate("/checkout");
                  displayCart && handleDisplayCart();
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
