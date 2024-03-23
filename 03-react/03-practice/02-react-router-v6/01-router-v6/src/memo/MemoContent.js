// import { memo } from 'react'
import React from "react";
const MemoContent = ({ useMemoString }) => {
  console.log("React.memo  en uso ");
  const agregar = useMemoString();
  return <h2>usando use Callback comparativa envio : {agregar}</h2>;
};

export default React.memo(MemoContent);
