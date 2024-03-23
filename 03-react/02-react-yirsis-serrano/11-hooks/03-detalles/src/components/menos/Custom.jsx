import { useCounter } from "../hooks/useCounter";

const Custom = () => {
  const [counter, increment, decrement] = useCounter(23);

  //*   SE ENVIO EL HOOK A REUTILIZAR EN USECOUNTER.JS
  //*   dentro del componente

  console.log(counter);
  return (
    <>
      <h1>CustomHook :{counter} </h1>
      <hr />
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </>
  );
};

export default Custom;
