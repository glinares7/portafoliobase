import React from "react";
import { Redirect, Route } from "react-router-dom";
// import LoginScreen from "../pages/LoginScreen";
// import RegisterScreen from "../pages/RegisterScreen";

const PublicRouter = ({ log, component: Component, ...resto }) => {
  return (
    <Route
      {...resto}
      component={(props) =>
        log ? <Redirect to="/app" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRouter;
