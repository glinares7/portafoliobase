import { useEffect, useState } from "react";

export const State = () => {
  const [state, setState] = useState(0);

  //* CUANTO QUEREMOS QUE SE MODIFIQUE EN EL CLIENTE Y NO EL EL SERVIDOR
  useEffect(() => {
    console.log(state);
  }, []);

  const handleClick = () => {
    setState(state + 1);
  };

  // console.log(state);
  // setState(10);
  // console.log(state);

  // setInterval(() => {
  //   console.log(state);
  //   setState(state + 1);
  // }, 3000);

  return (
    <div className="container text-center">
      <h1>Use State</h1>
      <hr />
      Cuenta: {state}
      <button onClick={handleClick}> + 1</button>
    </div>
  );
};

export default State;
