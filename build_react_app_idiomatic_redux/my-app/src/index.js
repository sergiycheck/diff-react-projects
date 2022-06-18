import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./redux/store";
import Root from "./components/Root";

//continue
//https://egghead.io/lessons/javascript-redux-updating-data-on-the-server
//https://github.com/gaearon/todos/compare/26-normalizing-json-responses-with-normalizr...27-updating-data-on-the-server

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

reportWebVitals();
