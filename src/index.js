import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreItemProvider from "./context/ItemsContext/ItemsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <StoreItemProvider>
      <App />
    </StoreItemProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
