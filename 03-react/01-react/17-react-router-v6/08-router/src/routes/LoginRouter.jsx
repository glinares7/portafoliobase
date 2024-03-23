import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import AppRouter from "./AppRouter";
import LoginScreen from "../pages/LoginScreen";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const LoginRouter = () => {
  // <PrivateRouter path="/" auth={log} component={AppRouter} />
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter>
              <LoginScreen />
            </PublicRouter>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRouter>
              <AppRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
};

export default LoginRouter;
