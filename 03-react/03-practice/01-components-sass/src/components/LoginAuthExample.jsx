import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const LoginAuthExample = () => {
  const { user, signin } = useContext(UseContext);

  let location = useLocation();
  let history = useHistory();

  console.log(location);

  const handleUser = () => {
    //* setUser(true)

    // let { from } = location.state || { from: { pathname: "/loginexample" } };
    let { from } = location.state;
    signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      {!user && (
        <>
          <h2>You must log in to view the page at {location.pathname}</h2>
          <button
            onClick={handleUser}
            style={{
              cursor: "pointer",
            }}
          >
            log in example
          </button>
        </>
      )}
    </div>
  );
};

export default LoginAuthExample;
