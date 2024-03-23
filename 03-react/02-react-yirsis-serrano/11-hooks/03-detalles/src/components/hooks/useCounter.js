import React, { useState } from "react";

export const useCounter = (initialValue, range = 5) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => {
    setCounter(counter + range);
  };

  const decrement = () => {
    setCounter(counter - range);
  };

  //*   RETORNA ARREGLO U OBJETO
  return [counter, increment, decrement];
};
