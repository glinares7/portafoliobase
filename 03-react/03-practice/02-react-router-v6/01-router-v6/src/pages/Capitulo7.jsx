import React from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { CSSTransition } from "react-transition-group";

const Capitulo7 = () => {
  // <h1>Animated transition example</h1>
  // <Link
  //   to="/inicio"
  //   style={{
  //     background: "blue",
  //     color: "white",
  //     padding: "10px 25px",
  //     borderRadius: "15px",
  //   }}
  // >
  //   Regresar
  // </Link>
  // <hr />
  // <h1>AnimationApp</h1>

  let location = useLocation();

  const styles = {};

  styles.fill = {
    position: "absolute",
    minHeight: "calc(100vh - 165px)",
    inset: 0,
  };

  styles.content = {
    ...styles.fill,
    top: "40px",
    textAlign: "center",
  };

  styles.nav = {
    padding: 0,
    margin: 0,
    position: "absolute",
    top: 0,
    height: "40px",
    width: "100%",
    display: "flex",
  };

  styles.navItem = {
    textAlign: "center",
    flex: 1,
    listStyleType: "none",
    padding: "10px",
  };

  styles.hsl = {
    ...styles.fill,
    color: "white",
    paddingTop: "20px",
    fontSize: "30px",
  };

  styles.rgb = {
    ...styles.fill,
    color: "white",
    paddingTop: "20px",
    fontSize: "30px",
  };

  const NavLink = (props) => {
    return (
      <li style={styles.navItem}>
        <Link {...props} style={{ color: "inherit" }}></Link>
      </li>
    );
  };

  const HSL = () => {
    let { h, s, l } = useParams();

    return (
      <div
        style={{
          ...styles.fill,
          ...styles.hsl,

          background: `hsl(${h}, ${s}%, ${l}%)`,
        }}
      >
        hsl({h}, {s}%, {l}%)
      </div>
    );
  };

  const RGB = () => {
    let { r, g, b } = useParams();

    return (
      <div
        style={{
          ...styles.fill,
          ...styles.rgb,

          background: `rgb(${r}, ${g}, ${b})`,
        }}
      >
        rgb({r}, {g}, {b})
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.fill}>
        <ul style={styles.nav}>
          <NavLink to={`hsl/10/90/50`}>Red</NavLink>
          <NavLink to={`hsl/120/100/40`}>Green</NavLink>
          <NavLink to={`rgb/33/150/243`}>Blue</NavLink>
          <NavLink to={`rgb/240/98/146`}>Pink</NavLink>
        </ul>

        <div style={styles.content}>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={1000}
          >
            <Routes location={location}>
              <Route end path="" element={<Navigate to={`hsl/10/90/50`} />} />
              <Route path={`hsl/:h/:s/:l`} element={<HSL />} />
              <Route path={`rgb/:r/:g/:b`} element={<RGB />} />
            </Routes>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

// <TransitionGroup>
// <CSSTransition
//   key={location.pathname}
//   classNames="fade"
//   timeout={1000}
// >
// </CSSTransition>
// </TransitionGroup>

export default Capitulo7;
