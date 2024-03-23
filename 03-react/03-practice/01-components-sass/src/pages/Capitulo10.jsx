import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const Capitulo10 = () => {
  const { url } = useRouteMatch();

  const Cosmo1 = ({ rutas }) => {
    const { url } = useRouteMatch();

    // const Viston = [
    //   { path: `${url}/bus`, color: () => <h1>Bus</h1> },
    //   { path: `${url}/cart`, color: () => <h1>Cart</h1> },
    // ];
    return (
      <div>
        <h1>Tacos</h1>
        <ul>
          <li>
            <Link to={`${url}/bus`}>Bus</Link>
          </li>
          <li>
            <Link to={`${url}/cart`}>Cart</Link>
          </li>
        </ul>
        <Switch>
          {rutas.map((ruta, i) => (
            <Route
              key={i}
              path={ruta.path}
              render={(props) => (
                // pass the sub-routes down to keep nesting
                <ruta.component {...props} rutas={ruta.rutas} />
              )}
            />
          ))}
        </Switch>
      </div>
    );
  };

  const Cosmo2 = () => {
    return <h1>Sandwiches</h1>;
  };
  function Bus() {
    return <h2>Bus</h2>;
  }

  function Cart() {
    return <h2>Cart</h2>;
  }

  const rutas = [
    {
      path: `${url}/tacos`,
      component: Cosmo1,
      rutas: [
        { path: `${url}/tacos/bus`, component: Bus },
        { path: `${url}/tacos/cart`, component: Cart },
      ],
    },
    {
      path: `${url}/sandwiches`,
      component: Cosmo2,
    },
  ];
  return (
    <div style={{ padding: "0px 20px" }}>
      <h1>Route Config Example </h1>
      <hr />

      <ul>
        <li>
          <Link to={`${url}/tacos`}>Tacos</Link>
        </li>
        <li>
          <Link to={`${url}/sandwiches`}>Sandwiches</Link>
        </li>
      </ul>

      <Switch>
        {rutas.map((ruta, i) => (
          <Route
            key={i}
            path={ruta.path}
            children={<ruta.component rutas={ruta.rutas} />}
          />
        ))}
      </Switch>
    </div>
  );
};

export default Capitulo10;
