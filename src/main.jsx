import React from "react";
import { ReactDOM } from "react";
import App from "./app/App";
import { RouterProvider } from "react-dom/client";
import router from "./router";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
