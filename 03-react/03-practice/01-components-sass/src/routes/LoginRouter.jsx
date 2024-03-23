import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import LoginPage from "../pages/LoginPage";
import ProtectedPage from "../pages/ProtectedPage";
import PublicPage from "../pages/PublicPage";
import PrivateRoute from "./PrivateRoute";

const LoginRouter = () => {
  return (
    <>
      <Login />
      <Switch>
        <Route path="/public">
          <PublicPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/protected">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default LoginRouter;
