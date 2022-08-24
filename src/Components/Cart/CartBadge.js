import "./cartBadge.css";

const CartBadge = ({ quantity, action }) => {
    // const { getCartData, handleDisplayCart } = useContext(CartContext);
    // const cartItemQuantity = getCartData().reduce((acc, cur) => {
    //     return cur.quantity + acc;
    // }, 0);

    return (
        quantity > 0 && (
            <div className="cartBadgeContainer" onClick={() => action()}>
                {quantity}
            </div>
        )
    );
};

export default CartBadge;
