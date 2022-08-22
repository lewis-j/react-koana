// we're going to access imagesData with the testData 'props'
import { imagesData } from "../../data/imagesData";
import { useState } from "react";
import "./cart.css";

const Cart = () => {
  // this would normally be passed as props from parent
  const [cartData, setCartData] = useState([
    {
      id: 0,
      quantity: 2,
    },
    {
      id: 4,
      quantity: 3,
    },
    {
      id: 2,
      quantity: 1,
    },
    {
      id: 5,
      quantity: 1,
    },
  ]);

  console.log(cartData);

  const subTotal = () => {
    return cartData.reduce(
      (acc, cur) => imagesData[cur.id].price * cur.quantity + acc,
      0
    );
  };

  const cartHandleItemQuantityChange = (id, increment) => {
    const updatedObjects = cartData.map((item) => {
      if (item.id === id) {
        if (
          increment &&
          item.quantity <
            imagesData.find((shopItem) => shopItem.id === item.id).inventory
        ) {
          return { id: item.id, quantity: item.quantity + 1 };
        } else if (!increment && item.quantity > 0) {
          return { id: item.id, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCartData(updatedObjects);
  };

  const handleRemoveItem = (event, id) => {
    // const itemToRemove = cartData.find((item) => item.id === id);
    const remainingCart = cartData.filter((item) => item.id !== id);
    setCartData(remainingCart);
  };

  const cartItemsContent = () => {
    const itemList = cartData.map((cartItem, idx) => {
      return (
        <div key={idx} className="cartItem">
          <div className="cartItemContent">
            <div className="cartItemStatsContainer">
              <div className="cartItemTitleContainer">
                <div className="cartItemName">
                  {imagesData[cartItem.id].name.toUpperCase()}
                </div>
              </div>
              <div className="cartItemPrice">
                ${imagesData[cartItem.id].price}{" "}
                {imagesData[cartItem.id].weight !== undefined && "/"}{" "}
                {imagesData[cartItem.id].weight}
                {imagesData[cartItem.id].unit}
              </div>
              <div className="cartItemEditorContainer">
                <div className="cartItemQuantityContainer">
                  <div
                    className="cartIncrement"
                    onClick={() =>
                      cartHandleItemQuantityChange(cartItem.id, true)
                    }
                  >
                    <div className="cartPlusHorizontal"></div>
                    <div className="cartPlusVertical"></div>
                  </div>
                  <div className="cartQuantityWindow">{cartItem.quantity}</div>
                  <div
                    className="cartDecrement"
                    onClick={() =>
                      cartHandleItemQuantityChange(cartItem.id, false)
                    }
                  >
                    <div className="cartMinus"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cartItemImageContainer">
              <img src={imagesData[cartItem.id].image} alt="item" />
            </div>
          </div>
          <div
            className="cartRemoveItem"
            onClick={(event) => handleRemoveItem(event, cartItem.id)}
          >
            <div className="leftLine"></div>
            <div className="rightLine"></div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="cartHeaderContainer">
          <div className="cartHeader">{"cart".toUpperCase()}</div>
          {/* <img className="cartHeaderLogo"src={koana_logo} alt="logo"/> */}
        </div>
        {itemList}
        <div className="cartSubTotalContainer">
          <div className="cartSubTotal">
            {"subtotal".toUpperCase()} ${subTotal()}
          </div>
          <div className="cartSubTotalControls">
            <div className="cartCloseWindow">{"close".toUpperCase()}</div>
            <div className="cartToCheckout">{"checkout".toUpperCase()}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="cartModal">
        <div>{cartItemsContent()}</div>
      </div>
    </>
  );
};

export default Cart;
