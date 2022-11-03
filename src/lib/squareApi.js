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
      console.log("fetch items response", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  uploadItemImg: async (file) => {
    const formData = new FormData();
    formData.append("myImage", file);
    // formData.append("filename", "calalogItem");

    console.log("FORMDATA", formData);

    try {
      const res = await axios.post("/catalog/img/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(
        "response from multipart form data image upload::::::::::",
        res
      );
    } catch (error) {
      console.log(error);
    }
  },
};
//Cart(order) API
const cart = {
  fetchCart: async () => {
    try {
      const res = await axios.get("/order", options);
      console.log("fetch cart response", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  addToCart: async (lineItems) => {
    try {
      const res = await axios.put("/order", { lineItems }, options);
      console.log("update cart response", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  processPayment: async (cardToken) => {
    try {
      console.log("cardToken", cardToken);
      //TODO: make axios process payement call. return results to inform user if transaction was successful
    } catch (error) {}
  },
  cancelCart: async () => {
    try {
      const res = await axios.put("/order/cancel", {}, options);
    } catch (error) {}
  },
};

const squareApi = { cart, items };
export default squareApi;
