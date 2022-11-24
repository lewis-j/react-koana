import { createContext, useState } from "react";
import squareApi from "../../lib/squareApi";
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
  clearItems: (lineItems) =>
    createAsyncThunk(async (dispatch) => {
      console.log("lineitems", lineItems);
      const squareData = await squareApi.cart.clearItem(lineItems);
      console.log("squaerData from reponse", squareData);
      dispatch({ type: types.SET_CART, payload: squareData });
    }),
  emptyCart: () => ({
    type: types.EMPTY_CART,
  }),
  updateItemThunk: (id, quantity) =>
    createAsyncThunk(async (dispatch, state) => {
      const squareData = await squareApi.cart.addToCart(
        { catalogObjectId: id, quantity: `${quantity}` },
        state.order.orderId
      );
      if (squareData?.order) {
        dispatch({ type: types.SET_CART, payload: squareData.cart });
        dispatch({ type: types.SET_ORDER, payload: squareData.order });
      } else {
        dispatch({ type: types.SET_CART, payload: squareData });
      }
    }),

  updateItemQuantities: (lineItems, deletions) =>
    createAsyncThunk(async (dispatch, state) => {
      if (deletions.length > 0) {
        const result = await squareApi.cart.clearItem(
          lineItems,
          deletions,
          state.order.orderId
        );
        dispatch({ type: types.SET_CART, payload: result });
        return;
      }
      const result = await squareApi.cart.updateQuantities(
        lineItems,
        state.order.orderId
      );
      dispatch({ type: types.SET_CART, payload: result });
    }),
  fetchItems: () =>
    createAsyncThunk(async (dispatch) => {
      const result = await squareApi.cart.fetchCart();
      if (!result) return;
      dispatch({ type: types.SET_CART, payload: result.cart });
      dispatch({ type: types.SET_ORDER, payload: result.order });
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
  createPaymentLink: (lineItems, deletions) =>
    createAsyncThunk(async (dispatch, state) => {
      console.log("running payment link thunk", state);
      let squareData;
      if (deletions.length > 0) {
        squareData = await squareApi.cart.clearItem(
          lineItems,
          deletions,
          state.order.orderId
        );
        dispatch({ type: types.SET_CART, payload: squareData });
      } else {
        squareData = await squareApi.cart.updateQuantities(
          lineItems,
          state.order.orderId
        );
      }

      dispatch({ type: types.SET_CART, payload: squareData });
      const isNotStocked = squareData.items.some(({ inventory, quantity }) => {
        console.log(
          "inventory",
          inventory,
          "quantity",
          quantity,
          +quantity >= +inventory
        );
        return +quantity > +inventory;
      });
      console.log("isNotStocked", isNotStocked);
      if (!isNotStocked) {
        console.log("paymentLink", state.order.payLink);
        window.open(state.order.payLink, "_blank");
      }
      dispatch({ type: types.SET_CART, payload: squareData });
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
  deletions: [],
  order: {},
  netAmounts: {},
  status: _status.IDLE,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case types.SET_CART:
      return reducers.setCart(state, action.payload);
    case types.SET_ORDER:
      return reducers.setOrder(state, action.payload);
    case types.ITEM_QUANTITY_CHANGE:
      return { ...state, cart: reducers.quantityChange(state, action) };
    case types.REMOVE_ITEM:
      const { cart, removedItem } = reducers.removeItem(state, action);

      return {
        ...state,
        cart,
        deletions: [...state.deletions, removedItem],
      };
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
