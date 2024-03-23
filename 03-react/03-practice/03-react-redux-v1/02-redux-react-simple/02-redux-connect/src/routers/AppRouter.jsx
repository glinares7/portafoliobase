import React from "react";
import App from "../App";

import { Routes, Route } from "react-router-dom";
import Somes from "../page/Somes";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App searchText="foo" />} />
      <Route path="somes" element={<Somes searchCount="fooCounter" />} />
    </Routes>
  );
};

export default AppRouter;
