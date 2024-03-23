import React, { useContext } from "react";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const PrivateRouteExample = ({ children, ...resto }) => {
  const { user } = useContext(UseContext);

  let { url } = useRouteMatch();

  // const handleChange = () => {
  //   setUser(true);
  // };

  console.log(`muestrame el usuario: ${user}`);
  return (
    <Route
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${url}/loginauthexample`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// <>
// {user ? (
//   children
// ) : (
//   <Route
//     render={({ location }) => (
//       <Redirect
//         to={{
//           pathname: `${url}/loginauthexample`,
//           state: { from: location },
//         }}
//       />
//     )}
//   ></Route>
// )}
// </>

export default PrivateRouteExample;
