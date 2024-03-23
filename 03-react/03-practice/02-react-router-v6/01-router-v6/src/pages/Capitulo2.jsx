import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import C2 from "../components/C2";

const Capitulo2 = () => {
  let { id } = useParams();

  const Reto = () => {
    return <h2>Use Params & nesting join</h2>;
  };

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo2</h1>
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
      <h1>Use Params</h1>
      <h2>ID : {id}</h2>
      <hr />
      <h1>Nesting</h1>
      <ul>
        <li>
          <Link to={`nesting1`}>page 1</Link>
        </li>
        <li>
          <Link to={`nesting2`}>page 2</Link>
        </li>
        <li>
          <Link to={`nesting3`}>page 3</Link>
        </li>
      </ul>

      <Routes>
        <Route end path="" element={<Reto />} />

        <Route path={`:persiana`} element={<C2 />} />
      </Routes>
    </div>
  );
};

export default Capitulo2;
