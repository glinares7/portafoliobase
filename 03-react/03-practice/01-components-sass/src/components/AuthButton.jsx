import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const AuthButton = () => {
  let history = useHistory();
  let { user, signout } = useContext(UseContext);

  return user ? (
    <>
      <h2>*History.push*</h2>
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            signout(() => history.push("/"));
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
