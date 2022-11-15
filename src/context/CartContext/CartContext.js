import { createContext, useState } from "react";
import squareApi from "../../lib/squareApi";
// import { imagesData } from "../data/imagesData";
import reducers from "./reducers";
import useReducerWithThunk from "../reducerMiddleware";

export const CartContext = createContext();

const types = {
  SET_CART: "SET_CART",
  SET_ORDER: "SET_ORDER",
  ITEM_QUANTITY_CHANGE: "ITEM_QUANTITY_CHANGE",
  REMOVE_ITEM: "REMOVE_ITEM",
  EMPTY_CART: "EMPTY_CART",
  UPDATE_CART: "UPDATE_CART",
  PROCESS_ORDER: "PROCESS_ORDER",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const createAsyncThunk = (func) => {
  return async ({ dispatch, state }) => {
    dispatch({
      type: types.PENDING,
    });
    try {
      await func(dispatch, state);
      dispatch({ type: types.SUCCESS });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.FAILED });
    }
  };
};

const actions = {
  changeQuantity: (id, increment) => ({
    type: types.ITEM_QUANTITY_CHANGE,
    payload: { id, increment },
  }),
  removeItem: (id) => ({ type: types.REMOVE_ITEM, payload: { id: id } }),
  emptyCart: () => ({
    type: types.EMPTY_CART,
  }),
  updateItemThunk: (id, quantity) =>
    createAsyncThunk(async (dispatch, state) => {
      const result = await squareApi.cart.addToCart(
        [{ catalogObjectId: id, quantity: `${quantity}` }],
        state.order.orderId
      );

      if (result.data?.order) {
        dispatch({ type: types.SET_CART, payload: result.data.cart });
        dispatch({ type: types.SET_ORDER, payload: result.data.order });
      } else {
        dispatch({ type: types.SET_CART, payload: result.data });
      }
    }),

  updateItemQuantity: (cart) =>
    createAsyncThunk(async (dispatch, state) => {
      const listItems = cart.map(({ uid, quantity }) => ({
        uid,
        quantity: `${quantity}`,
      }));
      console.log("listItems", listItems);
      const result = await squareApi.cart.updateQuantity(
        listItems,
        state.order.orderId
      );
      dispatch({ type: types.SET_CART, payload: result.data });
    }),
  fetchItems: () =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.fetchCart();
      if (!result) return;
      dispatch({ type: types.SET_CART, payload: result.data.cart });
      dispatch({ type: types.SET_ORDER, payload: result.data.order });
    }),
  addShippingFulfillment: (customerDetails) =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.addShipping(customerDetails);
      if (!result) return;
      dispatch({ type: types.SET_CART, payload: result.data });
    }),
  processCardOrder: (token, addresses) =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.processPayment(token, addresses);
      if (!result) return;
      // dispatch({ type: types.SET_CART, payload: result.data });
    }),
  createPaymentLink: (cart) =>
    createAsyncThunk(async (dispatch, state) => {
      const listItems = cart.map(({ uid, quantity }) => ({
        uid,
        quantity: `${quantity}`,
      }));
      const { data } = await squareApi.cart.updateQuantity(
        listItems,
        state.orderId
      );

      console.log("data returned", data);

      const isStocked = data.items.some(
        ({ inventory, quantity }) => +quantity <= +inventory
      );

      if (isStocked) {
        console.log("proceed to checkout");
        // const result =
        //   await squareApi.cart.createPaymentLink(/*customerDetails*/);
        // console.log("result", result);
        window.open(state.order.payLink, "_blank");
      } else {
        dispatch({ type: types.SET_CART, payload: data });
      }

      // if (!result) return;
      // dispatch({ type: types.SET_CART, payload: result.data });
    }),
  cancelOrder: () =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.cancelCart();
      if (!result) return;
      // dispatch({ type: types.SET_CART, payload: result.data });
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
  order: {},
  netAmounts: {},
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
    case types.SET_ORDER:
      return reducers.setOrder(state, action.payload);
    case types.ITEM_QUANTITY_CHANGE:
      return { ...state, cart: reducers.quantityChange(state, action) };
    case types.REMOVE_ITEM:
      return { ...state, cart: reducers.removeItem(state, action) };
    case types.EMPTY_CART:
      return { ...state, cart: reducers.emptyCart(state, action) };
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
  // const [cartData, setCartData] = useState(initialState);
  const [state, dispatch] = useReducerWithThunk(cartReducer, initialState);
  // state to toggle visibility of Cart
  const [displayCart, setDisplayCart] = useState(false);

  // function to switch visibility of Cart component,
  // this is accessed on Cart close button,
  // VerticalMenu and RegularNavbar (children of the navbar)
  const handleDisplayCart = () => {
    setDisplayCart(!displayCart);
  };

  // const checkSubTotal = () => {
  //   return state.cart.reduce((acc, cur) => {
  //     const item = storeItems.find((item) => item.id === cur.id);
  //     return item.price * cur.quantity + acc;
  //   }, 0);
  // };
  const value = {
    ...state,
    actions,
    dispatch,
    handleDisplayCart,
    displayCart,
    // checkSubTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
