import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const LoginAuthExample = () => {
  const { user, signin } = useContext(UseContext);

  let location = useLocation();
  let navigate = useNavigate();

  console.log(location);

  const handleUser = () => {
    // setUser(true);

    let from = location.state || { from: location };

    console.log(`from .... ${from}`);
    // let { from } = location.state;
    signin(() => {
      navigate(from, { replace: true });
    });
  };

  console.log(`existe ... ${user}`);
  return (
    <div>
      {!user && (
        <>
          <h2>You must log in to view the page at {location.pathname}</h2>
          <Link
            style={{
              background: "crimson",
              color: "white",
              padding: "10px 25px",
              borderRadius: "15px",
            }}
            onClick={handleUser}
            to=""
            state={{ from: location }}
          >
            log in example
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginAuthExample;
