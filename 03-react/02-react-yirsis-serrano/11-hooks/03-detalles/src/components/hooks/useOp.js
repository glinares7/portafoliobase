import React, { useCallback, useMemo, useState } from "react";
export const useOp = (initialValue) => {
  const [counter, setCounter] = useState(initialValue);
  const [view, setView] = useState(true);

  const pesado = (iter) => {
    for (let i = 0; i < iter; i++) {
      console.log("procesando");
    }

    return "fin del proceso";
  };

  //* [counter] -> array de dependencias

  //* si queremos usar useEffect
  // const pesadoMemo = useMemo(() => pesado(), [counter]);
  const pesadoMemo = useMemo(() => pesado(counter), [counter]);

  const add = useCallback(() => {
    //* EL ARROW FUNCTION EVITA QUE SE EJECUTE UNA SOLA VEZ
    setCounter((actual) => actual + 1);
  }, [setCounter]);

  const handleCLick = () => {
    setCounter(counter + 1);
  };

  const hide = useCallback(() => {
    setView(view);
  }, [setView]);

  return [counter, hide, pesadoMemo, add];
};
