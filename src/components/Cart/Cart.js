// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { StoreItemContext } from "../../context/StoreItemsContext";
import "./cart.css";

const Cart = () => {
    const value = useContext(CartContext);
    const { storeItems } = useContext(StoreItemContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log("locations", location);

    const subTotal = () => {
        return value.cartData.reduce((acc, cur) => {
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

    const cartItemsContent = () => {
        const itemList = value.cartData.map((cartItem, idx) => {
            const { name, price, weight, unit, image } = storeItems.find(
                (item) => item.id === cartItem.id
            );

            return (
                <div key={idx} className="cartItem">
                    <div className="cartItemContent">
                        <div className="cartItemStatsContainer">
                            <div className="cartItemTitleContainer">
                                <div className="cartItemName">
                                    {name.toUpperCase()}
                                </div>
                            </div>
                            <div className="cartItemPrice">
                                ${price} {weight !== undefined && "/"} {weight}
                                {unit}
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
                        <div className="removeAndImageContainer">
                            <div
                                className="cartRemoveItem"
                                onClick={() =>
                                    value.handleRemoveItem(cartItem.id)
                                }
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
                        onClick={() =>
                            value.displayCart && value.handleDisplayCart()
                        }
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
                                    value.displayCart &&
                                        value.handleDisplayCart();
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
            {value.displayCart && (
                <div
                    className="cartOffClickWrapper"
                    onClick={() => value.handleDisplayCart()}
                ></div>
            )}
            {value.displayCart && (
                <div className="cartModal">
                    <div>{cartItemsContent()}</div>
                </div>
            )}
        </>
    );
};

export default Cart;
