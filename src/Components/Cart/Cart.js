// we're going to access imagesData with the testData 'props'
import { imagesData } from "../OnlineShop/images/imagesData";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./cart.css";

const Cart = () => {
    // this would normally be passed as props from parent
    const value = useContext(CartContext);

    const subTotal = () => {
        console.log("subTotal tally");
        return value.cartData.reduce(
            (acc, cur) => imagesData[cur.id].price * cur.quantity + acc,
            0
        );
    };

    const cartItemsContent = () => {
        const itemList = value.cartData.map((cartItem, idx) => {
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
                                {imagesData[cartItem.id].weight !== undefined &&
                                    "/"}{" "}
                                {imagesData[cartItem.id].weight}
                                {imagesData[cartItem.id].unit}
                            </div>
                            <div className="cartItemEditorContainer">
                                <div className="cartItemQuantityContainer">
                                    <div
                                        className="cartIncrement"
                                        onClick={() =>
                                            value.cartHandleItemQuantityChange(
                                                cartItem.id,
                                                true
                                            )
                                        }
                                    >
                                        <div className="cartPlusHorizontal"></div>
                                        <div className="cartPlusVertical"></div>
                                    </div>
                                    <div className="cartQuantityWindow">
                                        {cartItem.quantity}
                                    </div>
                                    <div
                                        className="cartDecrement"
                                        onClick={() =>
                                            value.cartHandleItemQuantityChange(
                                                cartItem.id,
                                                false
                                            )
                                        }
                                    >
                                        <div className="cartMinus"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cartItemImageContainer">
                            <img
                                src={imagesData[cartItem.id].image}
                                alt="item"
                            />
                        </div>
                    </div>
                    <div
                        className="cartRemoveItem"
                        onClick={() => value.handleRemoveItem(cartItem.id)}
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
                </div>
                {itemList}
                <div className="cartSubTotalContainer">
                    <div className="cartSubTotal">
                        {"subtotal".toUpperCase()} ${subTotal()}
                    </div>
                    <div className="cartSubTotalControls">
                        <div className="cartCloseWindow">
                            {"close".toUpperCase()}
                        </div>
                        <div className="cartToCheckout">
                            {"checkout".toUpperCase()}
                        </div>
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
