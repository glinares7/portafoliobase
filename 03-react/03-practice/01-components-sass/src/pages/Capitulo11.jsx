import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const Capitulo11 = () => {
  let { url } = useRouteMatch();

  const routes = [
    {
      path: `${url}/sandwiches`,
      component: Sandwiches,
    },
    {
      path: `${url}/tacos`,
      component: Tacos,
      routes: [
        {
          path: `${url}/tacos/bus`,
          component: Bus,
        },
        {
          path: `${url}/tacos/cart`,
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
            <Link to={`${url}/tacos/bus`}>Bus</Link>
          </li>
          <li>
            <Link to={`${url}/tacos/cart`}>Cart</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
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
    return (
      <Route
        path={route.path}
        render={(props) => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

  return (
    <div style={{ padding: "0px 20px" }}>
      <h1>Router Config</h1>

      <hr />

      <div>
        <ul>
          <li>
            <Link to={`${url}/tacos`}>Tacos</Link>
          </li>
          <li>
            <Link to={`${url}/sandwiches`}>Sandwiches</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default Capitulo11;
