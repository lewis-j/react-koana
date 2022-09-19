<h1>KOANA E-COMMERCE SITE v2</h2>

session notes:
8/20

// #1
// CartContext's updateCart function:
/_
/_
When the modal is submitted with zero quantity, CartContext's updateCart function
will remove the item from the cart if it previously existed, otherwise it will
not be added.

<!-- const updateCart = (id, itemQuantity) => {
        setCartData((prev) => {
            const otherItems = prev.filter((item) => item.id !== id);
            return itemQuantity > 0
                ? [...otherItems, { id: id, quantity: itemQuantity }]
                : otherItems;
        });
    }; -->

// #2
// FocusModalForm's submit button text:

//will return a conditional string for the submit button of
//the focusModalForm submit button stating whether items have been selected or not

<!-- const handleZeroCountMessage = () =>
        !itemQuantity
            ? "none selected / remove from cart".toUpperCase()
            : "update cart".toUpperCase(); -->

// #3
will alter classname of submit button
to reflect if itemQuantity is > 0
NOTE: submission is still made with Zero items
and will be removed if previously populated (see #1)

<!-- <div
    className={`${
        !itemQuantity ? "submitButton Zero" : "submitButton"
    }`}
    onClick={() => {
        value.updateCart(id, itemQuantity);
        handleModalFocus("closeButton");
    }}
>
    {handleZeroCountMessage()}
</div> -->

// #4
Added state and handler function in the CartContext
to toggle visibility of Cart component.
This is accessed in 3 places, on the Cart button(s) 'close', and on the
RegularNavBar and VerticalMenu from the cart icon.

//CartContext

<!-- // state to toggle visibility of Cart

    const [displayCart, setDisplayCart] = useState(false); -->

<!-- // function to switch visibility of Cart component,
    // this is accessed on VerticalMenu and RegularMenu (children of the navbar)

    const handleDisplayCart = () => {
        setDisplayCart(!displayCart);
    } -->

<!-- const value = {

        // added below
        handleDisplayCart,
        displayCart
    }; -->

// RegularNavBar and VerticalMenu

<!-- const iconsData = [
        [
            faCartArrowDown,
            () => value.handleDisplayCart(),
        ], -->

// Cart
/_
value.displayCart state from CartContext and
&& logical operator added to ensure Cart
is currently visible
_/

<!-- <div
    className="cartCloseWindow"
    onClick={() => value.displayCart &&    handleDisplayCart()}
>
    {"close".toUpperCase()}
</div> -->

// #5
Cart comoponent now stays fixed in place and positioned in the top
right corner (next to the cart icon). Animations have been added
to dissolve in when activated.

The method to hide the cart when the user clicks off the component
(elsewhere on the screen) has been achieved by adding a sibling
element, sitting aside the cart contents. Using the logical and
operator if the displayCart state from CartContext is currently
true, an onClick event will detect a click anywhere on the screen
(due to the styling in the carrOffClickWrapper css class) which
will invoke CartContext's handdleDisplayCart function and toggle
the visibility of displayCart.

<!-- {value.displayCart && (
    <div
        className="cartOffClickWrapper"
        onClick={() => value.handleDisplayCart()}
    >
    </div> -->

Here is the corresponding styling for the component with
abosolute positioning which spans the entire length/width
of the viewport:

<!-- .cartOffClickWrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 150vh;
    width: 100vw;
    z-index: 2;
} -->

// #6
Added a close cart button on top of the Cart component for easier
access. Has the same functionality as the 'close' button at the bottom
of the cart component but made with a custom 'x' shape.

//JSX

<!-- <div
    className="cartHeaderCloseButton"
    onClick={() =>
        value.displayCart && value.handleDisplayCart()
    }
>
    <div className="cartHeaderCloseButtonLeftLine"></div>
    <div className="cartHeaderCloseButtonRightLine"></div>
</div> -->

//CSS

<!-- .cartHeaderCloseButtonLeftLine,
.cartHeaderCloseButtonRightLine {
    width: 1.25rem;
    height: 1.5px;
    background-color: rgb(254, 251, 0);
}

.cartHeaderCloseButtonLeftLine {
    transform: translate(.35rem, .95rem) rotate(45deg);
}

.cartHeaderCloseButtonRightLine {
    transform: translate(.35rem, .85rem) rotate(-45deg);
} -->

//#7

<!-- Adding item inventory count badge on top of the cart icon -->

---

session notes: 9/7
OrderSummaryForm - cart now closes and navigates to shop page when the value of the cart is zero
NavMenuNew - Adjusted width to accomodate the entire width of the screen
OrderSummaryForm - now has button to go back to Payment Method
9/8-9/10
added styling for checkout - shipping address form
fixed regular nav icon/hamburger nav icon conflict on media breakpoints


