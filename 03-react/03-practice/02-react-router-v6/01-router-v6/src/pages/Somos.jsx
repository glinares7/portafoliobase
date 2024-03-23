import React from "react";
import { Link } from "react-router-dom";

const Somos = () => {
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Somos</h1>
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

export default Somos;
