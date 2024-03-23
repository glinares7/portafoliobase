import React from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Topic from "../components/Topic";

export const Info = () => {
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>TODO LO QUE NECESITAS LO ENCUENTRAS AQUÍ</h1>
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
      <h2> ID: {id}</h2>
      <hr />
      <h1>Nesting</h1>
      <h1>UseRouteMatch</h1>
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/:topicId`}>
            <Topic />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Info;
