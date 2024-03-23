import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AnimationApp from "../components/AnimationApp";

const Capitulo7 = () => {
  // <h1>Animated transition example</h1>
  // <Link
  //   to="/inicio"
  //   style={{
  //     background: "blue",
  //     color: "white",
  //     padding: "10px 25px",
  //     borderRadius: "15px",
  //   }}
  // >
  //   Regresar
  // </Link>
  // <hr />
  // <h1>AnimationApp</h1>

  let { url } = useRouteMatch();
  return (
    <div>
      <div style={{ position: "relative" }}>
        <Switch>
          <Route exact path="/capitulo7">
            <Redirect to={`${url}/hsl/10/90/50`} />
          </Route>
          <Route path="/capitulo7">
            <AnimationApp />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Capitulo7;
