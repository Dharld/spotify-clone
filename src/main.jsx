import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ToasterProvider } from "./context/toaster.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToasterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ToasterProvider>
  </React.StrictMode>
);
