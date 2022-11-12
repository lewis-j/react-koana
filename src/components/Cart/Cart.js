// we're going to access imagesData with the testData 'props'
// import { imagesData } from "../../data/imagesData";
import { useContext, useEffect, useState } from "react";
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

    // flaged item ID state
    const [flagIds, setFlagIds] = useState([]);

    const subTotal = () => {
        return value.cartData.reduce((acc, cur) => {
            const item = storeItems.find((item) => item.id === cur.id);
            return item.price * cur.quantity + acc;
        }, 0);
    };

    // testing
    // useEffect(() => {
    //     console.log("id flags: ",flagIds);
    // }, [flagIds]);

    // add flagged item ID to state
    const handleFlags = (flags) => {
        setFlagIds(() => flags.map((flag) => flag.id));
    };

    // this runs when user clicks 'checkout'
    const checkSync = () => {
        // making sure cart item exists in dashboard store
        const checkExistence = value.cartData.filter((cartItem) => {
            return storeItems.find((storeItem) => storeItem.id === cartItem.id);
        });

        // logging if cart holds an item no longer in inventory
        if (checkExistence.find((item) => item === false)) {
            console.log("cart quantity and inventory not in sync");
        }

        // creating array of objects which shows [{item ID, cart quantity, store inventory}]
        const itemQuantities = checkExistence.map((item) => {
            return {
                id: item.id,
                cartQuantity: item.quantity,
                inventoryAvail: parseInt(
                    storeItems.find((storeItem) => storeItem.id === item.id)
                        .inventory
                ),
            };
        });

        // creating array of objects which show [{id, name, current-quantity, remaining-inventory}]
        // any items in 'cartFlags' need to have quantity reduced before being able to move to checkout process
        const cartFlags = itemQuantities
            .filter((item) => item.inventoryAvail - item.cartQuantity < 0)
            .map((item) => {
                return {
                    id: item.id,
                    name: storeItems.find(
                        (storeItem) => storeItem.id === item.id
                    ).name,
                    currentQuantity: item.cartQuantity,
                    remainingInventory: item.inventoryAvail,
                };
            });

        // if cartFlags array holds any objects, there are items which hold more quantity than inventory avaiable
        // calls handleFlags function to create state of flagged items
        if (cartFlags.length > 0) {
            handleFlags(cartFlags);
        } else {
            // otherwise, got to checkout, A-OK!
            navigate("/checkout");
            value.displayCart && value.handleDisplayCart();
        }
    };

    const cartItemsContent = () => {
        const itemList = value.cartData.map((cartItem, idx) => {
            // itemStyle will color red if error ID is matched to current ID being iterated
            let itemStyle = "cartItem";
            // cartItemErrorMessage will be written if error ID is matched to current ID being iterated
            let cartItemErrorMessage = "";
            const { name, price, weight, unit, image } = storeItems.find(
                (item) => item.id === cartItem.id
            );

            // if current flag element is the same as cart item id element being iterated, AND the cart item quantity is greater than the store item inventory
            // itemStyle will hold cartItemError className which is the red coloring for the error
            // the error message will inform user of how many inventory remain
            for (let flag of flagIds) {
                if (
                    flag === cartItem.id &&
                    cartItem.quantity >
                        storeItems.find((item) => item.id === cartItem.id)
                            .inventory
                ) {
                    itemStyle = "cartItemError";
                    let currentInventory = storeItems.find(
                        (item) => item.id === cartItem.id
                    ).inventory;
                    cartItemErrorMessage = `only ${currentInventory} remaining`;
                }
            }

            return (
                // itemStyle holds either regular or error prone styling
                <div key={idx} className={itemStyle}>
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
                                {/* cartItemErrorMessage will either be blank or hold inventory amount if error */}
                                <div className="cartErrorMessage">
                                    {cartItemErrorMessage}
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
                                    checkSync();
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
