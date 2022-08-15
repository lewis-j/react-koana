import { createContext, useContext, useReducer } from "react";

const initialState = {
    cart: [],
};

/*
cart:
id
quantity
price
*/

const actions = {
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
};

// acc cur
const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_ITEM: {
            console.log("item added", action.test);
            return state;
        }
        default:
            return state;
    }
};

// created context component
export const CartContext = createContext();

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const action = {
        type: actions.ADD_ITEM,
        test: "anything",
    };
    const value = {
        cartList: state.cart,
        addItem: () => {
            dispatch(action);
        },
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
