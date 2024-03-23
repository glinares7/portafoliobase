import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const Capitulo10 = () => {
  const Cosmo1 = ({ rutas }) => {
    // const Viston = [
    //   { path: `${url}/bus`, color: () => <h1>Bus</h1> },
    //   { path: `${url}/cart`, color: () => <h1>Cart</h1> },
    // ];

    //* cosmo1

    // <Routes>
    // {rutas.map((ruta, i) => (
    //   <Route
    //     key={i}
    //     path={ruta.path}
    //     render={(props) => (
    //       // pass the sub-routes down to keep nesting
    //       <ruta.component {...props} rutas={ruta.rutas} />
    //     )}
    //   />
    // ))}
    // </Routes>
    return (
      <div>
        <h1>Tacos</h1>
        <ul>
          <li>
            <Link to={`bus`}>Bus</Link>
          </li>
          <li>
            <Link to={`cart`}>Cart</Link>
          </li>
        </ul>

        <Routes>
          {rutas.map((ruta, i) => (
            <Route
              key={i}
              path={ruta.path}
              element={<ruta.component rutas={ruta.rutas} />}
            />
          ))}
        </Routes>
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
      path: `tacos/*`,
      component: Cosmo1,
      rutas: [
        { path: `bus`, component: Bus },
        { path: `cart`, component: Cart },
      ],
    },
    {
      path: `sandwiches/*`,
      component: Cosmo2,
    },
  ];
  return (
    <div style={{ padding: "0px 20px" }}>
      <h1>Route Config Example </h1>
      <hr />

      <ul>
        <li>
          <Link to={`tacos`}>Tacos</Link>
        </li>
        <li>
          <Link to={`sandwiches`}>Sandwiches</Link>
        </li>
      </ul>

      <Routes>
        {rutas.map((ruta, i) => (
          <Route
            key={i}
            path={ruta.path}
            element={<ruta.component rutas={ruta.rutas} />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default Capitulo10;
