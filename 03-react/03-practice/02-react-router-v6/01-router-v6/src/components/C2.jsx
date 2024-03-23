import React from "react";
import { useParams } from "react-router-dom";

const C2 = () => {
  let { persiana } = useParams();
  return (
    <div>
      <h2>Sub ruta : :{persiana}</h2>
    </div>
  );
};

export default C2;
