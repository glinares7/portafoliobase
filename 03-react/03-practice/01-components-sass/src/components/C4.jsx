import React from "react";
import { useParams } from "react-router-dom";
import C5 from "./C5";

const C4 = () => {
  let { any } = useParams();
  return (
    <>
      <h2>{any}</h2>

      <C5 />
    </>
  );
};

export default C4;
