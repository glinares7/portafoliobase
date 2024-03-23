import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";

import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

const root = ReactDOM.createRoot(document.getElementById("root"));

//* initial state

const initialState = {
  count: 10,
};
//* reducer
const contador = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};
const usuario = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    default:
      return state;
  }
};

//* rootReducer
const rootCounter = combineReducers({ contador, usuario });

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
const logger = (store) => (next) => (action) => {
  // agrupamos lo que vamos a mostrar en
  // consola usando el tipo de la acción
  console.group("Action", action.type);
  // mostramos el estado actual del store

  console.log("**current state**", store.getState());
  console.time("duration");

  // pasamos la acción al store
  next(action);

  // terminamos de contar
  console.timeEnd("duration");

  console.log("**new state**", store.getState());
  // terminamos el grupo
  console.groupEnd();
};

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

export const store = createStore(
  rootCounter,
  composeWithDevTools(applyMiddleware(logger))
);
// <React.StrictMode>
// </React.StrictMode>

root.render(
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
