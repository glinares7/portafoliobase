import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const AuthButton = () => {
  let navigate = useNavigate();
  let { user, signout } = useContext(UseContext);

  return user ? (
    <>
      <h2>*Navigate(1)*</h2>
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            signout(() => navigate("/"));
          }}
        >
          Sign out
        </button>
      </p>
    </>
  ) : (
    <p>You are not logged in.</p>
  );
};

export default AuthButton;
