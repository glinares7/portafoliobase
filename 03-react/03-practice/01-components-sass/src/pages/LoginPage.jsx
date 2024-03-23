import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let { signin } = useContext(UseContext);

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    signin(() => {
      history.replace(from);
    });
  };
  return (
    <div>
      <h2>*history.replace*</h2>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default LoginPage;
