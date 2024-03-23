import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { signin } = useContext(UseContext);

  let { from } = location.state || { from: { pathname: "/" } };

  console.log(from);
  let login = () => {
    signin(() => {
      navigate(from, { replace: true });
    });
  };
  return (
    <div>
      <h2>*navigate(to,replace : true)</h2>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default LoginPage;
