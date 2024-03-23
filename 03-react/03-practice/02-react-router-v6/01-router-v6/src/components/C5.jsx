import React from "react";

import { Link, Route, Routes, useParams } from "react-router-dom";

const C5 = () => {
  const Pers = [
    { id: 0, name: "carlos", friends: [1, 2, 3] },
    { id: 1, name: "jose", friends: [0, 3] },
    { id: 2, name: "alex", friends: [0, 1, 3] },
    { id: 3, name: "maria", friends: [1, 2] },
  ];

  const find = (id) => {
    return Pers.find((p) => p.id === id);
  };

  const { id } = useParams();
  let person = find(parseInt(id));

  return (
    <>
      <h1>{person.name} is friend</h1>

      <ul>
        {person.friends.map((id) => (
          <li key={id}>
            <Link to={`${id}`}>{find(id).name}</Link>
          </li>
        ))}
      </ul>

      <Routes>
        <Route path={`:id/*`} element={<C5 />} />
      </Routes>
    </>
  );
};

export default C5;
