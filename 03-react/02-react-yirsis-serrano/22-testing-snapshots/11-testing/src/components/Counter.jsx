import React from "react";
import { useCounter } from "../hooks/useCounter";
import ButtonCounter from "./ButtonCounter";

const Counter = () => {
  //* Refactorizando las funciones con testing en una sola agregando variables

  const { counter, handleModifyCounter, handleReset } = useCounter();

  // const handleDis = () => {
  //   setCounter(counter - 1);
  // };

  // <h2 data-testid="counter">Counter: {counter}</h2>
  return (
    <>
      <h2 role="counter">Counter: {counter}</h2>

      <ButtonCounter name="aumentar" action={handleModifyCounter} />

      <button aria-label="reset" onClick={handleReset}>
        Reset
      </button>

      <ButtonCounter name="disminuir" action={handleModifyCounter} value={-1} />
    </>
  );
};

export default Counter;
