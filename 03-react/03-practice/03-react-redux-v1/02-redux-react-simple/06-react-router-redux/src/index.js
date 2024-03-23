import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
// import { applyMiddleware, combineReducers, createStore } from "redux";

import { Provider } from "react-redux";
// import AppRouter from "./routers/AppRouter";

// import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import { storeMidd } from "./store/authStore";

// import { browserHistory } from "react-router";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// import { syncHistoryWithStore } from "react-router-redux";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
//* initial state

//* rootReducer

// * midelware
// const logger = (store) => {
//   return (next) => {
//     return (action) => {
//       const result = next(action);
//       console.group(`caught in the middleware ${JSON.stringify(result)}`);
//     };
//   };
// };

// console.group(`the middleware ${JSON.stringify(result)}
// `);
// const result = next(action).type;
//* logger

//* catchError
// const catchError = (store) => (next) => (action) => {
//   try {
//     next(action);
//     console.log("exits***", action);
//   } catch (error) {
//     console.log("todo", error);
//   }
// };

// *compose-middleware-redux-extension
// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

//* store

// const history = syncHistoryWithStore(browserHistory, storeMidd);

root.render(
  <Provider store={storeMidd}>
    <Router>
      <Link to="/">inicio</Link>
      <Link to="/home">home</Link>
      <Redirect to="/" />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" children={<App searchText="foo" />} />
      </Switch>
    </Router>
  </Provider>
);

// <Router>
// </Router>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// </React.StrictMode>
// <React.StrictMode>

// * original test-pruebas

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// *github
// https://github.com/yahirkeym/react-router-y-redux
