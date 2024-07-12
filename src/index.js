import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as Sentry from "@sentry/browser";
import { polyfillLoader } from "polyfill-io-feature-detection";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Sentry.init({
  dsn:
    "https://d19f7fd8b99d44838b3d01a62f658896@o293182.ingest.sentry.io/5197346",
});

polyfillLoader({
  features: "Promise",
  onCompleted: main,
});
function main() {
  return ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
