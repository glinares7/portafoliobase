import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Sidebarc5 from "../components/Sidebarc5";
import { UseContext } from "../contexts/AuthContext";

const Capitulo5 = () => {
  const { sliderc } = useContext(UseContext);
  let { path, url } = useRouteMatch();

  const routes = [
    {
      path: `${url}/ `,
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>,
    },
    {
      path: `${url}/bubblegum`,
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>,
    },
    {
      path: `${url}/shoelaces`,
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>,
    },
  ];

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>Capitulo5</h1>
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

      <h1>Sidebar</h1>
      <div className="capitulo5__sidebar">
        <div className=" item__sidebar item__sidebar1">
          <ul>
            <li className="item__sidebar1">
              <Link to={`${url}/ `}>Home</Link>
            </li>
            <li className="item__sidebar2">
              <Link to={`${url}/bubblegum`}>Bubblegum</Link>
            </li>
            <li>
              <Link to={`${url}/shoelaces`}>Shoelaces</Link>
            </li>
          </ul>
          <h2>map</h2>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
          <hr />

          <Switch>
            <Route path={`${path}/:typeStr`}>
              <Sidebarc5 />
            </Route>
          </Switch>
        </div>
        <div className="item__sidebar item__sidebar2">
          <h1>map</h1>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
          <hr />
          <h2>effect & context</h2>
          <h2>{sliderc}</h2>
        </div>
      </div>
    </div>
  );
};

// <h1>{sliderc}</h1>
export default Capitulo5;
