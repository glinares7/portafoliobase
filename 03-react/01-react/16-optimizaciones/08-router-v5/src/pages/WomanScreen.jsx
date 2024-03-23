import React from "react";
import Card from "../components/Card";
import { Characters } from "../models/Characters";

const WomanScreen = () => {
  //* traemos los datos del modelo

  const woman = Characters.filter((character) => character.type === "m");

  // console.log(woman);
  return (
    <div className="container mt-3">
      <h1>Woman Screen</h1>
      <hr />

      <div className="row">
        {woman.map((woman) => (
          <Card key={woman.id} {...woman} />
        ))}
      </div>
    </div>
  );
};

export default WomanScreen;
