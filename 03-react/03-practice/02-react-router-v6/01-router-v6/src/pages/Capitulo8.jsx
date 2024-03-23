import React from "react";
import {
  Link,
  // Route,
  // Switch,
  // useLocation,
  // useRouteMatch,
} from "react-router-dom";

// import ModalGallery from "../components/ModalGallery";
// import TomatoCrimson from "./TomatoCrimson";

const Capitulo8 = () => {
  // let location = useLocation();

  // let background = location.state && location.state.background;

  // let { url } = useRouteMatch();

  const clickColor = [
    { id: 2, name: "Tomato" },
    { id: 4, name: "Crimson" },
  ];

  // let location = useLocation();

  // let background = location.state && location.state.background;
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo8 </h1>
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
      <h1>Modal Gallery</h1>
      <Link to="/visitgallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        {clickColor.map((p, index) => (
          <li key={index}>
            <Link to={`/img/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capitulo8;
