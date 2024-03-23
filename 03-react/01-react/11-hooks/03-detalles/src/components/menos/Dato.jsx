// !imr
//* SIMILITUDES
// import React from "react";
import { memo } from "react";

// const Dato = React.memo(({ value }) => {
const Dato = memo(({ value }) => {
  console.log("otra vez me carge");
  //   console.log(React);
  return <p>{value}</p>;
});

//* SIMILITUDES
// export default React.memo(Dato);
export default memo(Dato);
