import React from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

const Capitulo12 = () => {
  let { url } = useRouteMatch();

  const app = { title: "app", component: Home };
  const app2 = { title: "app", component: () => <h1>About</h1> };

  function Home() {
    return <h1>Home</h1>;
  }

  function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact,
    });

    return (
      <div className={match ? "active" : ""}>
        {match && "> "}
        <Link to={to}>{label}</Link>
      </div>
    );
  }

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
    console.log(history);
  };

  const handleForward1 = () => {
    history.push("/productos");
  };

  return (
    <div style={{ padding: "0px 15px" }}>
      <h1>Capitulo12</h1>
      <h1>Custon Link</h1>

      <ul>
        <li style={{ listStyle: "none" }}>
          <OldSchoolMenuLink
            activeOnlyWhenExact={true}
            to={`${url}/ `}
            label="Home"
          />
        </li>
        <li style={{ listStyle: "none" }}>
          <OldSchoolMenuLink to={`${url}/about`} label="About" />
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
      <Switch>
        <Route key="1" path={`${url}/ `} children={<app.component />} />
        <Route key="1" path={`${url}/about`} children={<app2.component />} />
      </Switch>
    </div>
  );
};

export default Capitulo12;
