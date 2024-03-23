import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import { UseContext } from "../contexts/AuthContext";
// import PrivateRoute from "../routes/PrivateRoute";
// import LoginPage from "./LoginPage";
// import ProtectedPage from "./ProtectedPage";
// import PublicPage from "./PublicPage";

const Login = () => {
  const { log, setLog } = useContext(UseContext);

  const handleLogin = () => {
    setLog(true);
  };

  console.log(log);
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Login</h1>
      <Link
        onClick={handleLogin}
        to="/inicio"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Inicio
      </Link>

      <hr />
      <h1>Redirect Auth</h1>

      <h1>Router login</h1>

      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
