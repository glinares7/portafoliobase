// import { memo } from "react";
// import { memo } from 'react'
import React from "react";
const MemoComponent = ({ callback }) => {
  console.log("ejecutar8");

  const textoDelComponenteHijo = callback();
  return <div>{textoDelComponenteHijo}</div>;
};

export default React.memo(MemoComponent);
