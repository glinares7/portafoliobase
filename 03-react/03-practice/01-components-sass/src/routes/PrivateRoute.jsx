import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(UseContext);
  console.log(children);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
