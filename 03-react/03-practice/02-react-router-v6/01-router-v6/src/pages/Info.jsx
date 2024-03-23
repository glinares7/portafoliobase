import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Topic from "../components/Topic";

export const Info = () => {
  let { id } = useParams();

  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>TODO LO QUE NECESITAS LO ENCUENTRAS AQUÍ</h1>
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
      <h1>Use Params</h1>
      <h2> ID: {id}</h2>
      <hr />
      <h1>Nesting</h1>
      <h1>UseMatch</h1>
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`components`}>Components</Link>
          </li>
          <li>
            <Link to={`props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <h3>Please select a topic.</h3>
        <Routes>
          <Route path={`:topicId`} element={<Topic />} />
        </Routes>
      </div>
    </div>
  );
};

export default Info;
