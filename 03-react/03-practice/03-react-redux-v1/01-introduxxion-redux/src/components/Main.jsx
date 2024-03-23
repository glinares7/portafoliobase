import React from "react";

// import { useDispatch } from "react-redux";

// import { counter } from "../reducers/counter";
// import { store } from "../store/store";

import { increasValue, decreasValue, resetasValue } from "../actions/action.js";

import { useSelector, useDispatch } from "react-redux";
const Main = () => {
  const myState = useSelector((state) => state.ourState.count);

  const dispatch = useDispatch();

  console.log("*****my state^^^", myState);
  // const initialState = { count: 0 };

  // const [state, dispatch] = useReducer(counter, initialState);

  // const increment = () => {
  //   return {
  //     type: "INCREMENT",
  //   };
  // };

  // const decrement = () => {
  //   return {
  //     type: "DECREMENT",
  //   };
  // };
  // const reset = () => {
  //   return {
  //     type: "RESET",
  //   };
  // };

  // <h2 style={{ textAlign: "center" }}>{state.count}</h2>
  // <div>
  //   <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
  //   <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
  //   <button
  //     onClick={() => dispatch({ type: "RESET", payload: initialState })}
  //   >
  //     Reset
  //   </button>

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{myState}</h2>
      <div>
        <button onClick={() => dispatch(increasValue())}>+</button>
        <button onClick={() => dispatch(decreasValue())}>-</button>
        <button onClick={() => dispatch(resetasValue())}>Reset</button>
      </div>
    </div>
  );
};

export default Main;
