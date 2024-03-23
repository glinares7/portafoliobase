// import App from "../App";

import {
  createBrowserRouter,
  RouterProvider,

  // Link,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import Faq from "../pages/Faq";
import Idioma from "../pages/Idioma";

// import App from "./App.jsx";
// import Home from "./pages/Home";

const RouterYt = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />

        <Route path="/idioma" element={<Idioma />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default RouterYt;
