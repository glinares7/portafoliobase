import React from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const RecursivePath = () => {
  const PEEPS = [
    { id: 0, name: "Michelle", friends: [1, 2, 3] },
    { id: 1, name: "Sean", friends: [0, 3] },
    { id: 2, name: "Kim", friends: [0, 1, 3] },
    { id: 3, name: "David", friends: [1, 2] },
  ];

  function find(id) {
    return PEEPS.find((p) => p.id === id);
  }

  let { url } = useRouteMatch();
  let { id } = useParams();
  let person = find(parseInt(id));
  return (
    <div>
      <h3>{person.name}’s Friends</h3>
      <ul>
        {person.friends.map((id) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{find(id).name}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route path={`${url}/:id`}>
          <RecursivePath />
        </Route>
      </Switch>
    </div>
  );
};

export default RecursivePath;
