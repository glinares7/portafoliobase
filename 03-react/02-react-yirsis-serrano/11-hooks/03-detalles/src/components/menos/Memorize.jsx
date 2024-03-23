// rafce
import { useOp } from "../hooks/useOp";
import Btn from "./Btn";
import Dato from "./Dato";

const Memorize = () => {
  const [counter, hide, pesadoMemo, add] = useOp(5);
  return (
    <>
      <h1>
        Memorize : <Dato value={counter} />
      </h1>
      <hr />

      <pre>{pesadoMemo}</pre>
      <Btn add={add} />
      <button onClick={hide}>ver/quitar</button>
    </>
  );
};

export default Memorize;
