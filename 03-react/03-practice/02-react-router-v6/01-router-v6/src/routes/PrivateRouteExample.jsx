import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const PrivateRouteExample = ({ children }) => {
  const { user } = useContext(UseContext);

  // const handleChange = () => {
  //   setUser(true);
  // };

  // let location = useLocation();
  // console.log(location);

  console.log(`existe ... ${user}`);
  return user ? (
    children
  ) : (
    <Routes>
      <Route
        path=""
        element={<Navigate to="/loginexample/loginauthexample" />}
      />
    </Routes>
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
