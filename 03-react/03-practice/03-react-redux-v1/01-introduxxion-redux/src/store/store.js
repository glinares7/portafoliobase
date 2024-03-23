import { createStore } from "redux";
import { counter } from "../reducers/counter";
import { rootReducer } from "../root/rootReducer";

export const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
