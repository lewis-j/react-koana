import axios from "../axios.js";

const options = {
  withCredentials: true,
  credentials: "include",
};
//Items API
const items = {
  fetchItems: async () => {
    try {
      const res = await axios.get("/catalog");
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
//Cart(order) API
const cart = {
  fetchCart: async () => {
    try {
      const response = await axios.get("/order", options);
      console.log("response from fetch", response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (lineItem, orderId) => {
    try {
      const response = await axios.put(
        "/order",
        { lineItem, orderId },
        options
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  updateQuantities: async (lineItems, orderId) => {
    try {
      const response = await axios.put(
        "/order/quantities",
        { lineItems, orderId },
        options
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //ignore this endpoint in express app
  createPaymentLink: async (customerDetails) => {
    try {
      const response = await axios.post(
        "/order/paymentLink",
        { customerDetails },
        options
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  clearItem: async (lineItems, deletions, orderId) => {
    try {
      const response = await axios.put(
        "/order/clearItems",
        { lineItems, deletions, orderId },
        options
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //ignore endpoint in express app
  cancelCart: async () => {
    try {
      await axios.put("/order/cancel", {}, options);
    } catch (error) {
      console.error(error);
    }
  },
};

const squareApi = { cart, items };
export default squareApi;
