import React from "react";
import { createRoot } from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";

import App from "./App";
import reducers from "./reducers";

let root = createRoot(document.querySelector("#root"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
