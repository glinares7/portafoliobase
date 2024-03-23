import React from "react";
import { useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { store } from "../index";

const Somes = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  //* initial state
  const initialState = { count: 0 };
  //* reducer
  const AuthReducers = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      case "reset":
        return action.payload;
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(AuthReducers, initialState);

  console.log("+++current state+++ ", store.getState());

  console.log(this);
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h1> Use Reducer</h1>

      <h1> Count : {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button
        onClick={() => dispatch({ type: "reset", payload: initialState })}
      >
        RESET
      </button>

      <br />
      <br />
      <button onClick={handleBack}>Regresar</button>
    </div>
  );
};

export default Somes;
