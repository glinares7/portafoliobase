import React from "react";
import App from "../App";

import { Routes, Route } from "react-router-dom";
import Somes from "../page/Somes";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="somes" element={<Somes />} />
    </Routes>
  );
};

export default AppRouter;
