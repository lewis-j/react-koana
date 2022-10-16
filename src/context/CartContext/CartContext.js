import { createContext, useContext, useReducer, useState } from "react";
import squareApi from "../../lib/squareApi";
// import { imagesData } from "../data/imagesData";
import { StoreItemContext } from "../StoreItemsContext";
import reducers from "./reducers";
import useReducerWithThunk from "../reducerMiddleware";

export const CartContext = createContext();

const types = {
  SET_CART: "SET_CART",
  ITEM_QUANTITY_CHANGE: "ITEM_QUANTITY_CHANGE",
  REMOVE_ITEM: "REMOVE_ITEM",
  EMPTY_CART: "EMPTY_CART",
  UPDATE_CART: "UPDATE_CART",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const createAsyncThunk = (func) => {
  return async (dispatch) => {
    dispatch({
      type: types.PENDING,
    });
    try {
      await func(dispatch);
      dispatch({ type: types.SUCCESS });
    } catch (error) {
      dispatch({ type: types.FAILED });
    }
  };
};

const actions = {
  changeQuantity: (id, increment, inventory) => ({
    type: types.ITEM_QUANTITY_CHANGE,
    payload: { id, increment, inventory },
  }),
  removeItem: (id) => ({ type: types.REMOVE_ITEM, payload: { id: id } }),
  updateItem: (id, quantity) => ({
    type: types.UPDATE_CART,
    payload: { id, quantity },
  }),
  updateItemThunk: (id, quantity) =>
    createAsyncThunk(async (dispatch) => {
      console.log("update thunk");
      const result = await squareApi.cart.addToCart([
        { catalogObjectId: id, quantity: `${quantity}` },
      ]);
      console.log(result);
      dispatch({ type: types.SET_CART, payload: result.data });
    }),
  fetchItems: () =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.fetchCart();
      console.log("success", result);
      dispatch({ type: types.SET_CART, payload: result.data });
    }),
};

const _status = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

const initialState = {
  cart: [],
  status: _status.IDLE,
};

// const types = {
//   ITEM_QUANTITY_CHANGE: "ITEM_QUANTITY_CHANGE",
//   REMOVE_ITEM: "REMOVE_ITEM",
//   EMPTY_CART: "EMPTY_CART",
//   UPDATE_CART: "UPDATE_CART",
// };
// action = {
//   type: "ITEM_QUANTITY_CHANGE", payload: { id, quanity }
// }

const cartReducer = (state, action) => {
  switch (action.type) {
    case types.SET_CART:
      return reducers.setCart(state, action.payload);
    case types.ITEM_QUANTITY_CHANGE:
      return { ...state, cart: reducers.quantityChange(state, action) };
    case types.REMOVE_ITEM:
      return { ...state, cart: reducers.removeItem(state, action) };
    case types.EMPTY_CART:
      return { ...state, cart: reducers.emptyCart(state, action) };
    case types.UPDATE_CART:
      return { ...state, cart: reducers.updateCart(state, action) };
    case types.SUCCESS:
      return { ...state, status: _status.SUCCESS };
    case types.PENDING:
      return { ...state, status: _status.LOADING };
    case types.FAILED:
      return { ...state, status: _status.FAILED };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const { storeItems } = useContext(StoreItemContext);

  // const [cartData, setCartData] = useState(initialState);
  const [state, dispatch] = useReducerWithThunk(cartReducer, initialState);
  // state to toggle visibility of Cart
  const [displayCart, setDisplayCart] = useState(false);

  // function to switch visibility of Cart component,
  // this is accessed on Cart close button,
  // VerticalMenu and RegularNavbar (children of the navbar)
  const handleDisplayCart = () => {
    console.log("handleDisplayCart function");
    setDisplayCart(!displayCart);
  };

  const checkSubTotal = () => {
    return state.cart.reduce((acc, cur) => {
      const item = storeItems.find((item) => item.id === cur.id);
      return item.price * cur.quantity + acc;
    }, 0);
  };
  const value = {
    cart: state.cart,
    status: state.status,
    actions,
    dispatch,
    handleDisplayCart,
    displayCart,
    checkSubTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
