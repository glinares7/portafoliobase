import React from "react";

const Contador = ({ state, dispatch, initialState }) => {
  return (
    <>
      <h1>Use Reducer</h1>
      <div>
        <h1> Count : {state.count}</h1>
        <button
          onClick={() => dispatch({ type: "reset", payload: initialState })}
        >
          RESET
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </div>
    </>
  );
};

export default Contador;
