import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import C4 from "../components/C4";
// import C5 from "../components/C5";

const Capitulo4 = () => {
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo4</h1>
      <Link
        to="/inicio"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Regresar
      </Link>

      <hr />
      <h1>Nesting & recursive example</h1>

      <ul>
        <li>
          <Link to={`obs1`}>obs1</Link>
        </li>
        <li>
          <Link to={`obs2`}>obs2</Link>
        </li>
        <li>
          <Link to={`obs3`}>obs3</Link>
        </li>
      </ul>
      <hr />

      <Routes>
        <Route path={`:any/*`} element={<C4 />} />
      </Routes>
    </div>
  );
};
//*  agrego componente C5 dentro del componente C4 (recursividad y nesting)
// <C5 />

export default Capitulo4;
