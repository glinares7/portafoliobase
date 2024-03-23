import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="nav__header">
        <li className="item__nav">
          <Link to="/inicio">Inicio</Link>
        </li>
        <li className="item__nav">
          <Link to="/somos">Quienes somos</Link>
        </li>
        <li className="item__nav">
          <Link to="/productos">Productos</Link>
        </li>
        <li className="item__nav">
          <Link to="/contactos">Contactos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
