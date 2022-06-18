import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";

// import {counterReducer} from './counterSlice';

// const actionsCustom = [  { type: 'counter/incremented' },  { type: 'counter/incremented' },  { type: 'counter/incremented' }];
// const initialState = { value: 0 };
// const finalResult = actionsCustom.reduce(counterReducer, initialState);
// console.log(`finalResult `, finalResult);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




