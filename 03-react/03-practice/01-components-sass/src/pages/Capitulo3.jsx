import React from "react";
import { Link } from "react-router-dom";

const Capitulo3 = () => {
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo3</h1>
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
    </div>
  );
};

export default Capitulo3;
