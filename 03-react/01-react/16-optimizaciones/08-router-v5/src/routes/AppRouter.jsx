import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";
// import CharacterScreen from "../pages/CharacterScreen";
// import ManScreen from "../pages/ManScreen";
// import SearchScreen from "../pages/SearchScreen";
// import WomanScreen from "../pages/WomanScreen";

// const Navbar = lazy(() => import("../components/Navbar"));
const CharacterScreen = lazy(() => import("../pages/CharacterScreen"));
const ManScreen = lazy(() => import("../pages/ManScreen"));
const SearchScreen = lazy(() => import("../pages/SearchScreen"));
const WomanScreen = lazy(() => import("../pages/WomanScreen"));

const AppRouter = () => {
  //* luego se va agregar
  return (
    <>
      <Navbar />
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <Switch>
          <Route exact path="/mans" component={ManScreen} />
          <Route exact path="/womans" component={WomanScreen} />
          <Route exact path="/search" component={SearchScreen} />

          <Route exact path="/character/:id" component={CharacterScreen} />
          <Redirect to="/mans" />
        </Switch>
      </Suspense>
    </>
  );
};

export default AppRouter;
