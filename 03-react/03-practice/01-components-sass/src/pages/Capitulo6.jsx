import React, { useState } from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Transition from "../components/Transition";

const Capitulo6 = () => {
  const [typeColor, setTypeColor] = useState("hsl(10, 90%, 50%)");
  const { url } = useRouteMatch();

  let rutaColor = [
    {
      id: 0,
      color: "Red",
      path: "hsl/10/90/50",
      main: "hsl(10, 90%, 50%)",
    },
    {
      id: 1,
      color: "Green",
      path: "hsl/120/100/40",
      main: "hsl(120, 100%, 40%)",
    },
    { id: 2, color: "Blue", path: "rgb/33/150/243", main: "rgb(33, 150, 243)" },
    { id: 3, color: "Pink", path: "rgb/240/98/146", main: "rgb(240, 98, 146)" },
  ];

  const handleColorType = (e) => {
    setTypeColor(e.target.name);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: typeColor,
        transition: "background 1s ease-in-out",
      }}
    >
      <div
        style={{
          padding: " 0px 20px",
        }}
      >
        <h1 style={{ margin: "0", padding: "25px 0" }}>Capitulo6</h1>
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
      </div>

      <h1>Animated Transition</h1>
      <ul className="capitulo6__transition">
        {rutaColor.map((p) => (
          <li key={p.id} className="item__transitionc6">
            <Link
              name={p.main}
              onClick={handleColorType}
              to={`${url}/${p.path}`}
            >
              {p.color}
            </Link>
          </li>
        ))}
      </ul>

      <Switch>
        {rutaColor.map((p) => (
          <Route key={p.id} path={`${url}/${p.path}`}>
            <Transition typeColor={typeColor} />
          </Route>
        ))}
        <Route exact path={`${url}`}>
          <Redirect to={`${url}/hsl/10/90/50`} />
        </Route>
      </Switch>
    </div>
  );
};

//* ul

// {rutaColor.map((p) => (
//   <li className="item__transitionc6">
//     <Link
//       name={p.main}
//       onClick={handleColorType}
//       to={`${url}/${p.path}`}
//     >
//       {p.color}
//     </Link>
//   </li>
// ))}

// {rutaColor.map((p) => (
//   <Switch>
//     <Route path={`${url}/${p.path}`}>
//       <Transition typeColor={typeColor} />
//     </Route>
//     <Route exact path={`${url}`}>
//       <Redirect to={`${url}/hsl/10/90/50`} />
//     </Route>
//   </Switch>
// ))}
export default Capitulo6;
