import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Redirect,

  // Switch,
  // Route,
  // Switch,
  // Switch,
  // Route,
  // Redirect,
} from "react-router-dom";

// import Info from "../pages/Info";
// import Landing from "../pages/Landing";

// import Capitulo1 from "../pages/Capitulo1";
// import Capitulo2 from "../pages/Capitulo2";
// import Capitulo3 from "../pages/Capitulo3";
// import Login from "../pages/Login";

import Header from "../components/Header";
import Footer from "../components/Footer";

// import Somos from "../pages/Somos";
// import Productos from "../pages/Productos";
// import Contactos from "../pages/Contactos";

import { UseContext } from "../contexts/AuthContext";
import SwitchRouter from "./SwitchRouter";
// import Login from "../pages/Login";

import LoginRouter from "./LoginRouter";

// import Capitulo1 from "../pages/Capitulo1";
// import PublicPage from "../pages/PublicPage";
// import LoginPage from "../pages/LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import ProtectedPage from "../pages/ProtectedPage";
// import Login from "../pages/Login";

const AppRouter = () => {
  const { log } = useContext(UseContext);
  return (
    <Router>
      {log ? (
        <div className="app__body">
          <Header />
          <SwitchRouter />
          <Footer />
        </div>
      ) : (
        <div style={{ padding: " 0px 20px" }}>
          <LoginRouter />
          <Redirect to="/" />
        </div>
      )}
    </Router>
  );
};

export default AppRouter;
