import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Info from "../pages/Info";
import Landing from "../pages/Landing";

import Capitulo1 from "../pages/Capitulo1";
import Capitulo2 from "../pages/Capitulo2";
import Capitulo3 from "../pages/Capitulo3";
// import Login from "../pages/Login";

import Somos from "../pages/Somos";
import Productos from "../pages/Productos";
import Contactos from "../pages/Contactos";
import Capitulo4 from "../pages/Capitulo4";
// import C5 from "../components/C5";
import Capitulo5 from "../pages/Capitulo5";
import Capitulo6 from "../pages/Capitulo6";
import Capitulo7 from "../pages/Capitulo7";
import LoginExample from "../pages/LoginExample";
import Capitulo8 from "../pages/Capitulo8";
import Capitulo9 from "../pages/Capitulo9";
import ModalGallery from "../components/ModalGallery";
import VisitGallery from "../pages/VisitGallery";
import TomatoCrimson from "../pages/TomatoCrimson";
import Capitulo10 from "../pages/Capitulo10";
import Capitulo11 from "../pages/Capitulo11";
import Capitulo12 from "../pages/Capitulo12";

// import Login from "../pages/Login";
// import LoginPage from "../pages/LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import ProtectedPage from "../pages/ProtectedPage";
// import PublicPage from "../pages/PublicPage";

const SwitchRouter = () => {
  let location = useLocation();

  let background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/inicio" element={<Landing />} />
        <Route path="/info/:id/*" element={<Info />} />

        <Route path="/capitulo1/:id/*" element={<Capitulo1 />} />
        <Route path="/capitulo1" element={<Navigate to="/0" />} />

        <Route path="/capitulo2/:id/*" element={<Capitulo2 />} />

        <Route path="/capitulo3" element={<Capitulo3 />} />

        <Route path="/capitulo4/:id/*" element={<Capitulo4 />} />
        <Route path="/capitulo4" element={<Navigate to="/0" />} />

        <Route path="/capitulo5/*" element={<Capitulo5 />} />

        <Route path="/capitulo6/*" element={<Capitulo6 />} />
        <Route path="/capitulo7/*" element={<Capitulo7 />} />

        <Route path="/capitulo8" element={<Capitulo8 />} />

        <Route path="/visitgallery" element={<VisitGallery />} />

        <Route path="/img/:id" element={<TomatoCrimson />} />

        <Route path="/capitulo9/*" element={<Capitulo9 />} />

        <Route path="/capitulo10/*" element={<Capitulo10 />} />
        <Route path="/capitulo11/*" element={<Capitulo11 />} />
        <Route path="/capitulo12/*" element={<Capitulo12 />} />

        <Route path="/somos" element={<Somos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/loginexample/*" element={<LoginExample />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/img/:id" element={<ModalGallery />} />
        </Routes>
      )}
    </>
  );
};

export default SwitchRouter;
