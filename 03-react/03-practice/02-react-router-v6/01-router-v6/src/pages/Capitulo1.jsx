import React from "react";
import {
  Link,
  // Route,
  // Switch,
  // Route,
  // Switch,
  useParams,
  // useRouteMatch,
  // useRouteMatch,
} from "react-router-dom";
import RecursivePath from "../components/RecursivePath";

// import RecursivePath from "../components/RecursivePath";
// import RecursivePath from "../components/RecursivePath";

const Capitulo1 = () => {
  let { id } = useParams();

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo1</h1>
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
      <h1>Recursive path</h1>
      <RecursivePath />
    </div>
  );
};

export default Capitulo1;
