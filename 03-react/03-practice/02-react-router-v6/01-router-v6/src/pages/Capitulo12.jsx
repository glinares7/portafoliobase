import React from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Capitulo12 = () => {
  const app = { title: "app", component: Home };
  const app2 = {
    title: "app",
    component: () => <h1>About</h1>,
  };

  function Home() {
    return <h1>Home</h1>;
  }

  function OldSchoolMenuLink({ label, to, activeOnlyWhenExact, children }) {
    let location = useLocation({
      path: to,
      end: activeOnlyWhenExact,
    });

    let maches = location.pathname === to;

    // let match = useMatch({
    //   path: to,
    //   exact: activeOnlyWhenExact,
    // });

    return (
      <div className={maches ? "active" : ""}>
        {maches && "> "}
        <Link to={to}>{children}</Link>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
    console.log(navigate);
  };

  const handleForward1 = () => {
    navigate("/productos");
  };

  return (
    <div style={{ padding: "0px 15px" }}>
      <h1>Capitulo12</h1>
      <h1>Custon Link</h1>

      <ul>
        <li style={{ listStyle: "none" }}>
          <OldSchoolMenuLink
            activeOnlyWhenExact={true}
            to={`/capitulo12`}
            label="Home"
          >
            Home
          </OldSchoolMenuLink>
        </li>
        <li style={{ listStyle: "none" }}>
          <OldSchoolMenuLink
            to={`/capitulo12/about`}
            label="About"
            children="About"
          />
        </li>
      </ul>
      <h1>Go back & Forward</h1>

      <button
        onClick={handleClick}
        style={{
          background: "crimson",
          color: "white",
          padding: "10px 25px",
          border: "none",
          borderRadius: "15px",
        }}
      >
        Anterior
      </button>

      <button
        onClick={handleForward1}
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          border: "none",
          borderRadius: "15px",
        }}
      >
        modificar
      </button>

      <hr />
      <Routes>
        <Route key="1" path={``} element={<app.component />} />
        <Route key="2" path={`about`} element={<app2.component />} />
      </Routes>
    </div>
  );
};

export default Capitulo12;
