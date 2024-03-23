import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AuthLoginExample from "../components/AuthLoginExample";
import LoginAuthExample from "../components/LoginAuthExample";
import ProtectedExample from "../components/ProtectedExample";
import PublicExample from "../components/PublicExample";
// import { UseContext } from "../contexts/AuthContext";
import PrivateRouteExample from "../routes/PrivateRouteExample";

const LoginExample = () => {
  // const { setUser } = useContext(UseContext);
  let { url } = useRouteMatch();

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>LoginExample</h1>

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

      <AuthLoginExample />
      <ul>
        <li>
          <Link to={`${url}/publicexample`}>Public Example</Link>
        </li>
        <li>
          <Link to={`${url}/protectedexample`}>Protected Example</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${url}/publicexample`}>
          <PublicExample />
        </Route>
        <Route path={`${url}/loginauthexample`}>
          <LoginAuthExample />
        </Route>

        <PrivateRouteExample path={`${url}/protectedexample`}>
          <ProtectedExample />
        </PrivateRouteExample>
      </Switch>
    </div>
  );
};

export default LoginExample;
