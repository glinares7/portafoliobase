import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const Capitulo11 = () => {
  const routes = [
    {
      path: `sandwiches/*`,
      component: Sandwiches,
    },
    {
      path: `tacos/*`,
      component: Tacos,
      routes: [
        {
          path: `bus`,
          component: Bus,
        },
        {
          path: `cart`,
          component: Cart,
        },
      ],
    },
  ];

  function Sandwiches() {
    return <h2>Sandwiches</h2>;
  }

  function Tacos({ routes }) {
    return (
      <div>
        <h2>Tacos</h2>
        <ul>
          <li>
            <Link to={`bus`}>Bus</Link>
          </li>
          <li>
            <Link to={`cart`}>Cart</Link>
          </li>
        </ul>

        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }

  function Bus() {
    return <h3>Bus</h3>;
  }

  function Cart() {
    return <h3>Cart</h3>;
  }

  function RouteWithSubRoutes(route) {
    // render={(props) => (
    //   // pass the sub-routes down to keep nesting
    //   <route.component {...props} routes={route.routes} />
    // )}
    return (
      <Routes>
        <Route
          path={route.path}
          element={
            // pass the sub-routes down to keep nesting
            <route.component routes={route.routes} />
          }
        />
      </Routes>
    );
  }

  return (
    <div style={{ padding: "0px 20px" }}>
      <h1>Router Config</h1>

      <hr />

      <div>
        <ul>
          <li>
            <Link to={`tacos`}>Tacos</Link>
          </li>
          <li>
            <Link to={`sandwiches`}>Sandwiches</Link>
          </li>
        </ul>

        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  );
};

export default Capitulo11;
