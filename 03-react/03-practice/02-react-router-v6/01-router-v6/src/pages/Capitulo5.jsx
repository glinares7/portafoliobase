import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Sidebarc5 from "../components/Sidebarc5";

const Capitulo5 = () => {
  const routes = [
    {
      path: "",
      end: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>,
    },
    {
      path: "bubblegum",
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>,
    },
    {
      path: "shoelaces",
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
              <Link to="">Home</Link>
            </li>
            <li className="item__sidebar2">
              <Link to="bubblegum">Bubblegum</Link>
            </li>
            <li>
              <Link to="shoelaces">Shoelaces</Link>
            </li>
          </ul>
          <h2>map</h2>
          <hr />
          <Routes>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                end={route.end}
                element={<route.main />}
              />
            ))}
          </Routes>

          <hr />

          <Routes>
            <Route path=":typeStr" element={<Sidebarc5 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// <h1>{sliderc}</h1>
export default Capitulo5;

// <Routes>
//             <Route path={`${path}/:typeStr`}>
//               <Sidebarc5 />
//             </Route>
//           </Routes>
//         </div>
//         <div className="item__sidebar item__sidebar2">
//           <h1>map</h1>
//           <Routes>
//             {routes.map((route, index) => (
//               // Render more <Route>s with the same paths as
//               // above, but different components this time.
//               <Route
//                 key={index}
//                 path={route.path}
//                 end={route.end}
//                 children={<route.main />}
//               />
//             ))}
//           </Routes>
