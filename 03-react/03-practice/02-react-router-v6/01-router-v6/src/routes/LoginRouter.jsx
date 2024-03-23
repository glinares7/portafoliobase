import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import LoginPage from "../pages/LoginPage";
import ProtectedPage from "../pages/ProtectedPage";
import PublicPage from "../pages/PublicPage";
import PrivateRoute from "./PrivateRoute";

const LoginRouter = () => {
  return (
    <>
      <Login />
      <Routes>
        <Route path="/public" element={<PublicPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PublicPage />} />

        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <ProtectedPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default LoginRouter;
