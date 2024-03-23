import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { store } from "./index";
function App() {
  const dispatch = useDispatch();
  const myCounter = useSelector((state) => state.outCounter.count);

  //* estado actual
  console.log("*******mi estado es ******", myCounter);

  const unsubscribe = store.subscribe(() => {
    // vemos el nuevo store
    console.log("suscribe watch", store.getState());
    // nos desuscribimos
    unsubscribe();
  });
  return (
    <div
      style={{
        paddingLeft: "20px",
        display: "flex",
        width: "100%",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%" }}>
        <h1>Simple redux count</h1>
        <h1>contador + - : {myCounter}</h1>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button
          onClick={() => dispatch({ type: "RESET", payload: { count: 0 } })}
        >
          RESET
        </button>
        <br />
        <br />
        <Link to="somes">totales</Link>
      </div>
    </div>
  );
}

export default App;
