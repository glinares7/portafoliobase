import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const AuthLoginExample = () => {
  const { user, signout } = useContext(UseContext);
  let navigate = useNavigate();
  const handleChange = () => {
    //* setUser(null)
    signout(() => {
      navigate("");
    });
  };
  return (
    <div>
      {user ? (
        <div>
          Welcome {"   "}
          <button onClick={handleChange}>Sign Out</button>
        </div>
      ) : (
        <h3>You are not logged in.</h3>
      )}
    </div>
  );
};

export default AuthLoginExample;
