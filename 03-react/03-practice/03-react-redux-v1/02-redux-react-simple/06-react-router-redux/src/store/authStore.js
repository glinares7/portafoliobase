import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { contador, usuario, old, pathredux } from "../reducers/authReducers";
// import { routerReducer } from "react-router-redux";

export const logger = (store) => (next) => (action) => {
  // agrupamos lo que vamos a mostrar en
  // consola usando el tipo de la acción

  console.log("Middleware Logger");
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

export const rootCounter = combineReducers({
  contador,
  usuario,
  old,
  pathredux,
});

export const storeMidd = createStore(
  rootCounter,
  composeWithDevTools(applyMiddleware(logger))
);
