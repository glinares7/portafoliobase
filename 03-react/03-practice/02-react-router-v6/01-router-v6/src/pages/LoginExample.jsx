import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AuthLoginExample from "../components/AuthLoginExample";
import LoginAuthExample from "../components/LoginAuthExample";
import ProtectedExample from "../components/ProtectedExample";
import PublicExample from "../components/PublicExample";
// import { UseContext } from "../contexts/AuthContext";
import PrivateRouteExample from "../routes/PrivateRouteExample";

const LoginExample = () => {
  // const { setUser } = useContext(UseContext);

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>LoginExample</h1>

      <Link
        to="/inicio"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Regresar
      </Link>
      <hr />

      <AuthLoginExample />
      <ul>
        <li>
          <Link to="publicexample">Public Example</Link>
        </li>
        <li>
          <Link to="protectedexample">Protected Example</Link>
        </li>
      </ul>
      <Routes>
        <Route path="publicexample" element={<PublicExample />} />

        <Route path="loginauthexample" element={<LoginAuthExample />} />

        <Route
          path="protectedexample/*"
          element={
            <PrivateRouteExample>
              <ProtectedExample />
            </PrivateRouteExample>
          }
        />
      </Routes>
    </div>
  );
};

export default LoginExample;
