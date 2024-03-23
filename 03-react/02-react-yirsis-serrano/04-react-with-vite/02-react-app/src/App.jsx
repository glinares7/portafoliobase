// import { useState } from 'react'

//* fragment -component
// import { useState, Fragment } from "react";

import { useState } from "react";

import logo from "./logo.svg";
import "./App.css";

//* v1

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <pre>{new Date().getHours()}</pre>
//       </header>
//     </div>
//   );
// }

//* estilos de la aplicacion
const App = () => {
  //* destructuring of array -estado (cambio)
  const [contador, setContador] = useState(50);

  const disminuir = () => {
    setContador(contador - 1);
    // console.log(estado);
  };
  const aumentar = () => {
    setContador(contador + 1);
    // console.log(estado);
  };
  //* fragment vacio  (<> </>)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="250" className="App-logo" alt="logo" />
        <div>
          <button onClick={disminuir}> - </button>
          <h1>{contador}</h1>
          <button onClick={aumentar}> + </button>
        </div>
      </header>
    </div>
  );
};

export default App;
