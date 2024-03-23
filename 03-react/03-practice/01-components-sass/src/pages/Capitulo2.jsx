import React from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import C2 from "../components/C2";

const Capitulo2 = () => {
  let { id } = useParams();

  let { path, url } = useRouteMatch();
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
          <Link to={`${url}/nesting1`}>page 1</Link>
        </li>
        <li>
          <Link to={`${url}/nesting2`}>page 2</Link>
        </li>
        <li>
          <Link to={`${url}/nesting3`}>page 3</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h1>todos van a morir</h1>
        </Route>
        <Route path={`${path}/:persiana`}>
          <C2 />
        </Route>
      </Switch>
    </div>
  );
};

export default Capitulo2;
