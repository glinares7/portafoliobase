import React, { useContext } from "react";
// import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  let { user } = useContext(UseContext);
  // let { location } = useLocation();

  console.log(children);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
